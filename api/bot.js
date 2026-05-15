const TelegramBot = require('node-telegram-bot-api');
const dayjs = require('dayjs');
const { createClient } = require('@supabase/supabase-js');

const token = process.env.TELEGRAM_BOT_TOKEN;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const CRON_SECRET = process.env.CRON_SECRET || 'ReNEET2026Secret';

let bot = null;
let supabase = null;

try {
    if (token) bot = new TelegramBot(token, { polling: false });
    if (supabaseUrl && supabaseKey) supabase = createClient(supabaseUrl, supabaseKey);
} catch (e) {
    console.error("Initialization Error:", e.message);
}

const SUPER_ADMIN = 'max9xm';
const RENEET_DATE = dayjs('2026-06-21T14:00:00+05:30');

// ─── Database Helpers (Reusing existing 'users' table) ──────────────

async function registerUser(chatId) {
    if (!supabase) return;
    try {
        // We reuse the 'users' table from the neet-2026-bot! No new tables needed.
        await supabase.from('users').upsert({ chat_id: chatId }, { onConflict: 'chat_id' });
    } catch (e) { console.error("DB Register Error:", e.message); }
}

async function getAllUsers() {
    if (!supabase) return [];
    try {
        let { data } = await supabase.from('users').select('chat_id');
        if (!data) return [];
        return data.map(d => d.chat_id);
    } catch (e) { return []; }
}

async function removeUser(chatId) {
    if (!supabase) return;
    try {
        await supabase.from('users').delete().eq('chat_id', chatId);
    } catch (e) {}
}

// ─── UI Helpers ─────────────────────────────────────────────────────

function getTimeRemaining() {
    const diff = RENEET_DATE.diff(dayjs());
    if (diff <= 0) return null;
    const totalSeconds = Math.floor(diff / 1000);
    return {
        days:    Math.floor(totalSeconds / (3600 * 24)),
        hours:   Math.floor((totalSeconds % (3600 * 24)) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
    };
}

function buildCountdown(t) {
    if (!t) return "🎓 *RE-NEET 2026 is here!* Time to show them what a second chance looks like. 🩺";
    return (
        `✨ *RE-NEET 2026 COUNTDOWN* ✨\n` +
        `━━━━━━━━━━━━━━━━━━━\n\n` +
        `📅  *${String(t.days).padStart(3)}* Days\n` +
        `🕐  *${String(t.hours).padStart(3)}* Hours\n` +
        `⏱  *${String(t.minutes).padStart(3)}* Minutes\n` +
        `⚡  *${String(t.seconds).padStart(3)}* Seconds\n\n` +
        `━━━━━━━━━━━━━━━━━━━\n` +
        `📆 Exam: *21 June 2026 (Sunday)*\n` +
        `━━━━━━━━━━━━━━━━━━━`
    );
}

const refreshKeyboard = {
    inline_keyboard: [[{ text: '🔄 Refresh', callback_data: 'refresh_countdown' }]]
};

const mainKeyboard = {
    keyboard: [
        [{ text: '⏳ Countdown' }, { text: 'ℹ️ About' }]
    ],
    resize_keyboard: true,
    persistent: true
};

// ─── Handlers ───────────────────────────────────────────────────────

if (bot) {
    bot.onText(/\/start/, async (msg) => {
        const chatId = msg.chat.id;
        const name = msg.from?.first_name || 'Aspirant';
        await registerUser(chatId);

        const t = getTimeRemaining();
        const days = t ? t.days : 0;

        bot.sendMessage(chatId,
            `🩺 *Welcome ${name}!*\n\n` +
            `RE-NEET 2026 mein sirf *${days} din* bache hain.\n\n` +
            `Roz subah 5 baje tujhe reminder milega ki kitne din bache hain.\n\n` +
            `⏳ Countdown dekhne ke liye neeche button dabaa.`,
            { parse_mode: 'Markdown', reply_markup: mainKeyboard }
        );
    });

    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text || '';

        if (text === '⏳ Countdown' || text.startsWith('/countdown')) {
            await registerUser(chatId);
            bot.sendMessage(chatId, buildCountdown(getTimeRemaining()), {
                parse_mode: 'Markdown',
                reply_markup: refreshKeyboard
            });
        }
        else if (text === 'ℹ️ About' || text.startsWith('/about')) {
            bot.sendMessage(chatId,
                `👨‍💻 *About / Creator*\n` +
                `━━━━━━━━━━━━━━━━━━━\n\n` +
                `🤖 *Bot:* RE-NEET 2026 Countdown\n` +
                `📆 *Exam:* 21 June 2026 (Sunday)\n\n` +
                `👑 *Creator:* Shushank Aryan\n` +
                `📱 *Telegram:* @max9xm\n\n` +
                `━━━━━━━━━━━━━━━━━━━\n` +
                `_Made with ♡ for RE-NEET Aspirants._`,
                {
                    parse_mode: 'Markdown',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '💬 Contact Owner', url: 'https://t.me/max9xm' }],
                            [{ text: '☕ Buy Me A Coffee', url: 'https://www.buymeacoffee.com/shushank' }]
                        ]
                    }
                }
            );
        }
    });

    bot.on('callback_query', async (query) => {
        if (query.data === 'refresh_countdown') {
            await registerUser(query.message.chat.id);
            try {
                await bot.editMessageText(buildCountdown(getTimeRemaining()), {
                    chat_id: query.message.chat.id,
                    message_id: query.message.message_id,
                    parse_mode: 'Markdown',
                    reply_markup: refreshKeyboard
                });
                await bot.answerCallbackQuery(query.id, { text: '⏳ Updated!' });
            } catch (err) {
                await bot.answerCallbackQuery(query.id, { text: '⏳ Wait a sec...' });
            }
        }
    });
}

// ─── Daily 5 AM Reminder (Cron Logic) ──────────────────────────────

async function fireDailyReminder() {
    const users = await getAllUsers();
    const t = getTimeRemaining();
    if (!t) return;

    const messages = [
        `☀️ *Good Morning!*\n\nRE-NEET 2026 mein sirf *${t.days} din* bache hain.\n\n_Uth ja. Padh le. Second chance waste mat kar._ 🩺`,
        `🌅 *Subah ho gayi!*\n\nBas *${t.days} din* aur.\n\n_Aaj ka din count karna hai ya waste? Tera choice._ 📚`,
        `⏰ *5 AM Reminder*\n\n*${t.days} days* left for RE-NEET 2026.\n\n_Jo log 5 baje uthke padhte hain, wahi AIIMS jaate hain._ 🔥`,
        `🌄 *Rise & Grind!*\n\n*${t.days} din* bache hain RE-NEET tak.\n\n_Kal se nahi, ABHI se. Kitaab khol._ 💪`,
        `☕ *Chai pee aur NCERT utha.*\n\nRE-NEET mein *${t.days} din* bache.\n\n_Second chance milti hai sabko, use karte hain sirf winners._ 🏆`,
    ];

    const msg = messages[Math.floor(Math.random() * messages.length)];

    for (const userId of users) {
        try {
            await bot.sendMessage(userId, msg, { parse_mode: 'Markdown' });
            await new Promise(r => setTimeout(r, 60)); // Rate limit
        } catch (e) {
            removeUser(userId);
        }
    }
}

// ─── Vercel Serverless Export ───────────────────────────────────────

module.exports = async (req, res) => {
    // 1. Cron Trigger Endpoint (5 AM daily reminder)
    if (req.query.cron === 'true') {
        if (req.headers.authorization !== `Bearer ${CRON_SECRET}`) {
            return res.status(401).send('Unauthorized');
        }
        await fireDailyReminder();
        return res.status(200).send('Daily reminder fired.');
    }

    // 2. Status Endpoint
    if (req.method === 'GET') {
        const t = getTimeRemaining();
        return res.status(200).json({
            status: "Online",
            bot: "RE-NEET 2026 24/7 Bot",
            days_remaining: t ? t.days : 0
        });
    }

    // 3. Telegram Webhook Endpoint
    if (req.method === 'POST') {
        const update = req.body;
        if (!update || !update.update_id) return res.status(400).send('Bad Request');

        try {
            bot.processUpdate(update);
            await new Promise(r => setTimeout(r, 2000)); // Delay for async jobs
            return res.status(200).send('OK');
        } catch (err) {
            return res.status(500).send('Error');
        }
    }

    return res.status(405).send('Method Not Allowed');
};
