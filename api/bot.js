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
const START_DATE = dayjs('2026-05-16T00:00:00+05:30');

const MOTIVATIONAL_QUOTES = [
    "Uth ja. Padh le. Second chance waste mat kar. 🩺",
    "Aaj ka din count karna hai ya waste? Tera choice. 📚",
    "Jo log 5 baje uthke padhte hain, wahi AIIMS jaate hain. 🔥",
    "Kal se nahi, ABHI se. Kitaab khol. 💪",
    "Second chance milti hai sabko, use karte hain sirf winners. 🏆",
    "Maa-Baap ki umeedon par paani pherna band kar. Uth aur padh! 😡",
    "Tu tab tak nahi haarta jab tak tu koshish karna nahi chhodta. 💯",
    "Doctor banne ka sapna dekha hai na? Toh neend ka tyaag toh karna padega. 🛌❌",
    "Agar aaj aaraam karega, toh kal roega. Decide kar le. ⏳",
    "Re-NEET ek mauka hai, dhokha mat dena apne aap ko. 🎯",
    "Syllabus bada hai, lekin teri aukaat se bada nahi. 📖",
    "Time pass karna band kar, tera competition abhi padh raha hai. 👁️",
    "Bahaane banana chhod de, bahaane marks nahi laate. 🛑",
    "Success ki koi lift nahi hoti, sidhiyaan chadhni padti hain. 🧗‍♂️",
    "Jab tak todenge nahi, tab tak chhodenge nahi! 🔨",
    "Tera aaj ka struggle tera kal ka stethoscope hai. 🩺✨",
    "Log kya kahenge ye sochna chhod, tu kya banega ye soch. 🧠",
    "Aadhi raat ko jaagne wala har baccha aashiq nahi hota, kuch doctor banne ki taiyari kar rahe hote hain. 🌙",
    "Selection chahiye toh sacrifice toh karna padega. ⚡",
    "Apne aalsi pan ko aag laga de, aur aage badh. 🔥",
    "Aaj dard hoga, kal garv hoga. Uth ja! 🦁",
    "Girte hain sheh-sawar hi maidan-e-jung mein, wo tifl kya gire jo ghutno ke bal chale. 🏇",
    "Har roz ek choti jeet, badi kamyabi banati hai. 🏅",
    "Tera competition kisi aur se nahi, tere pichle kal se hai. 🪞",
    "Padhai mein lagan, aur dil mein aag. Yahi hai NEET clear karne ka raaz. 💥",
    "Thak gaya hai? Toh aaraam kar le, lekin quit mat kar. 🛑",
    "Peeche hatne ka option nahi hai, aage badhna majboori nahi, zaroorat hai. 🚀",
    "Waqt fisal raha hai, aur tu abhi bhi soch raha hai. Khol NCERT. ⏳",
    "Agar sapne sach karne hain, toh pehle sapne dekhna shuru kar... khuli aankhon se. 👁️",
    "Tu utna hi bada ban sakta hai, jitni badi teri mehnat hogi. 🏔️",
    "Kismat se zyada apni mehnat par bharosa rakh. 🍀❌ 땀✅",
    "Har ek MCQ tera future decide kar raha hai. Dhyaan se kar. 📝",
    "Jo aaj mushkil lag raha hai, kal wo aasan lagega, bas laga reh. 🧗",
    "Apne lakshya ko mat bhool, baaki sab bhool ja. 🎯",
    "Jitni gaaliyaan aaj sun raha hai, kal utni hi taaliyaan bajengi. 👏",
    "Duniya ko apna result dikhana hai, toh aaj khud ko kitaabon mein chupa le. 📚",
    "Koi tujh par vishwas kare ya na kare, tu khud par kar. 🤝",
    "Rone se kuch nahi hoga, padhne se sab kuch hoga. 😭❌ 📖✅",
    "Sirf padh mat, samajh aur yaad rakh. 🧠",
    "NCERT teri Geeta hai, isko ghol ke pee ja. 📗",
    "Agar selection nahi hua, toh yaad rakhna galti teri hi thi. Accept it and work hard now. 🫵",
    "Zindagi mein ek baar jaan laga ke dekh, result zaroor aayega. 💯",
    "Aalas tera sabse bada dushman hai, isse hara. ⚔️",
    "Jab duniya so rahi ho, tab teri padhai chalni chahiye. 🦉",
    "Focus wahan rakh jahan tu pohochna chahta hai, wahan nahi jahan tu hai. 🔭",
    "Tere sapne teri aukaat se bade hone chahiye, aur teri mehnat tere sapnon se badi. 🌌",
    "Haar man-na sabse aasaan kaam hai, lekin tu aasaan kaam karne ke liye nahi paida hua. 💪",
    "Kuch banne ka junoon hai toh neend kaise aa sakti hai? ☕",
    "Aaj ki mehnat, kal ka chain hai. 🕊️",
    "Tu khud ka nirmaan kar raha hai, thoda waqt toh lagega. 🏗️"
];

function getDailyQuote() {
    const diffDays = Math.max(0, dayjs().diff(START_DATE, 'day'));
    const quoteIndex = diffDays % MOTIVATIONAL_QUOTES.length;
    return MOTIVATIONAL_QUOTES[quoteIndex];
}

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
    if (!t) return "🎓 *RE-NEET 2026 is here!* Time to show them what a second chance looks like. 🩺\n\n_Made with ♡ by Shush_";
    return (
        `✨ *RE-NEET 2026 COUNTDOWN* ✨\n` +
        `━━━━━━━━━━━━━━━━━━━\n\n` +
        `📅  *${String(t.days).padStart(3)}* Days\n` +
        `🕐  *${String(t.hours).padStart(3)}* Hours\n` +
        `⏱  *${String(t.minutes).padStart(3)}* Minutes\n` +
        `⚡  *${String(t.seconds).padStart(3)}* Seconds\n\n` +
        `━━━━━━━━━━━━━━━━━━━\n` +
        `📆 Exam: *21 June 2026 (Sunday)*\n` +
        `━━━━━━━━━━━━━━━━━━━\n\n` +
        `_Made with ♡ by Shush_`
    );
}

const refreshKeyboard = {
    inline_keyboard: [[{ text: '🔄 Refresh', callback_data: 'refresh_countdown' }]]
};

const mainKeyboard = {
    inline_keyboard: [
        [{ text: '⏳ Show Countdown', callback_data: 'show_countdown' }],
        [{ text: 'ℹ️ About', callback_data: 'show_about' }]
    ]
};

const aboutKeyboard = {
    inline_keyboard: [
        [{ text: '💬 Contact Owner', url: 'https://t.me/max9xm' }],
        [{ text: '☕ Buy Me A Coffee', url: 'https://www.buymeacoffee.com/shushank' }]
    ]
};

function buildAbout() {
    return `👨‍💻 *About / Creator*\n` +
           `━━━━━━━━━━━━━━━━━━━\n\n` +
           `🤖 *Bot:* RE-NEET 2026 Countdown\n` +
           `📆 *Exam:* 21 June 2026 (Sunday)\n\n` +
           `👑 *Creator:* Shushank Aryan\n` +
           `📱 *Telegram:* @max9xm\n\n` +
           `━━━━━━━━━━━━━━━━━━━\n` +
           `_Made with ♡ by Shush_`;
}

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
            `_Made with ♡ by Shush_`,
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
            bot.sendMessage(chatId, buildAbout(), {
                parse_mode: 'Markdown',
                reply_markup: aboutKeyboard
            });
        }
    });

    bot.on('callback_query', async (query) => {
        if (query.data === 'show_countdown' || query.data === 'refresh_countdown') {
            await registerUser(query.message.chat.id);
            try {
                if (query.data === 'show_countdown') {
                    await bot.sendMessage(query.message.chat.id, buildCountdown(getTimeRemaining()), {
                        parse_mode: 'Markdown',
                        reply_markup: refreshKeyboard
                    });
                } else {
                    await bot.editMessageText(buildCountdown(getTimeRemaining()), {
                        chat_id: query.message.chat.id,
                        message_id: query.message.message_id,
                        parse_mode: 'Markdown',
                        reply_markup: refreshKeyboard
                    });
                }
                await bot.answerCallbackQuery(query.id, { text: '⏳ Updated!' });
            } catch (err) {
                await bot.answerCallbackQuery(query.id, { text: '⏳ Wait a sec...' });
            }
        }
        else if (query.data === 'show_about') {
            await bot.sendMessage(query.message.chat.id, buildAbout(), {
                parse_mode: 'Markdown',
                reply_markup: aboutKeyboard
            });
            await bot.answerCallbackQuery(query.id);
        }
    });
}

// ─── Daily 5 AM Reminder (Cron Logic) ──────────────────────────────

async function fireDailyReminder() {
    const users = await getAllUsers();
    const t = getTimeRemaining();
    if (!t) return;

    const quote = getDailyQuote();
    const msg = `🌅 *Good Morning Aspirant!*\n\nRE-NEET 2026 mein sirf *${t.days} din* bache hain.\n\n💡 _${quote}_\n\n_Made with ♡ by Shush_`;

    for (const userId of users) {
        try {
            await bot.sendMessage(userId, msg, { 
                parse_mode: 'Markdown',
                reply_markup: mainKeyboard
            });
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
