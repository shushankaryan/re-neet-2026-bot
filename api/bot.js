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
    "Uth ja. Padh le. Second chance waste mat kar. 🩺", "Aaj ka din count karna hai ya waste? Tera choice. 📚", "Jo log 5 baje uthke padhte hain, wahi AIIMS jaate hain. 🔥", "Kal se nahi, ABHI se. Kitaab khol. 💪", "Second chance milti hai sabko, use karte hain sirf winners. 🏆", "Maa-Baap ki umeedon par paani pherna band kar. Uth aur padh! 😡", "Tu tab tak nahi haarta jab tak tu koshish karna nahi chhodta. 💯", "Doctor banne ka sapna dekha hai na? Toh neend ka tyaag toh karna padega. 🛌❌", "Agar aaj aaraam karega, toh kal roega. Decide kar le. ⏳", "Re-NEET ek mauka hai, dhokha mat dena apne aap ko. 🎯", "Syllabus bada hai, lekin teri aukaat se bada nahi. 📖", "Time pass karna band kar, tera competition abhi padh raha hai. 👁️", "Bahaane banana chhod de, bahaane marks nahi laate. 🛑", "Success ki koi lift nahi hoti, sidhiyaan chadhni padti hain. 🧗‍♂️", "Jab tak todenge nahi, tab tak chhodenge nahi! 🔨", "Tera aaj ka struggle tera kal ka stethoscope hai. 🩺✨", "Log kya kahenge ye sochna chhod, tu kya banega ye soch. 🧠", "Aadhi raat ko jaagne wala har baccha aashiq nahi hota, kuch doctor banne ki taiyari kar rahe hote hain. 🌙", "Selection chahiye toh sacrifice toh karna padega. ⚡", "Apne aalsi pan ko aag laga de, aur aage badh. 🔥", "Aaj dard hoga, kal garv hoga. Uth ja! 🦁", "Girte hain sheh-sawar hi maidan-e-jung mein, wo tifl kya gire jo ghutno ke bal chale. 🏇", "Har roz ek choti jeet, badi kamyabi banati hai. 🏅", "Tera competition kisi aur se nahi, tere pichle kal se hai. 🪞", "Padhai mein lagan, aur dil mein aag. Yahi hai NEET clear karne ka raaz. 💥", "Thak gaya hai? Toh aaraam kar le, lekin quit mat kar. 🛑", "Peeche hatne ka option nahi hai, aage badhna majboori nahi, zaroorat hai. 🚀", "Waqt fisal raha hai, aur tu abhi bhi soch raha hai. Khol NCERT. ⏳", "Agar sapne sach karne hain, toh pehle sapne dekhna shuru kar... khuli aankhon se. 👁️", "Tu utna hi bada ban sakta hai, jitni badi teri mehnat hogi. 🏔️", "Kismat se zyada apni mehnat par bharosa rakh. 🍀❌ 땀✅", "Har ek MCQ tera future decide kar raha hai. Dhyaan se kar. 📝", "Jo aaj mushkil lag raha hai, kal wo aasan lagega, bas laga reh. 🧗", "Apne lakshya ko mat bhool, baaki sab bhool ja. 🎯", "Jitni gaaliyaan aaj sun raha hai, kal utni hi taaliyaan bajengi. 👏", "Duniya ko apna result dikhana hai, toh aaj khud ko kitaabon mein chupa le. 📚", "Koi tujh par vishwas kare ya na kare, tu khud par kar. 🤝", "Rone se kuch nahi hoga, padhne se sab kuch hoga. 😭❌ 📖✅", "Sirf padh mat, samajh aur yaad rakh. 🧠", "NCERT teri Geeta hai, isko ghol ke pee ja. 📗", "Agar selection nahi hua, toh yaad rakhna galti teri hi thi. Accept it and work hard now. 🫵", "Zindagi mein ek baar jaan laga ke dekh, result zaroor aayega. 💯", "Aalas tera sabse bada dushman hai, isse hara. ⚔️", "Jab duniya so rahi ho, tab teri padhai chalni chahiye. 🦉", "Focus wahan rakh jahan tu pohochna chahta hai, wahan nahi jahan tu hai. 🔭", "Tere sapne teri aukaat se bade hone chahiye, aur teri mehnat tere sapnon se badi. 🌌", "Haar man-na sabse aasaan kaam hai, lekin tu aasaan kaam karne ke liye nahi paida hua. 💪", "Kuch banne ka junoon hai toh neend kaise aa sakti hai? ☕", "Aaj ki mehnat, kal ka chain hai. 🕊️", "Tu khud ka nirmaan kar raha hai, thoda waqt toh lagega. 🏗️"
];

const GREETINGS = [
    "Wake up, Warrior!", "Rise and Shine, Future Doctor!", "Good Morning Aspirant!", "A new day, a new target!", "Uth jao, AIIMS bula raha hai!", "Morning! Time to conquer Physics.", "Get up! Your stethoscope is waiting.", "Sun is up, and so should your score be!", "Ek aur subah, ek aur mauka!", "Wake up! The syllabus won't complete itself.", "Good Morning! Aaj phodna hai.", "Time to grind, Future Doc!", "Subah ho gayi, NCERT kholo!", "Rise up! Success demands sacrifice.", "Good Morning! Let's crack it today.", "Uth ja mere bhai, time kam hai!", "Morning! Make today count.", "New day, fresh mindset. Let's go!", "Get out of bed! Your dreams are calling.", "Good Morning! Focus on the goal.", "Time to shine, Aspirant!", "Wake up! The white coat needs you.", "Morning! Every second counts.", "Uth jao! Aaj ka target poora karna hai.", "Good Morning! Trust the process.", "Rise and hustle!", "Wake up! NTA is watching.", "Morning! Don't let today go to waste.", "Get up! It's revision time.", "Good Morning! Stay strong, stay focused.", "Wake up! Your parents are hoping for you.", "Morning! Biology is waiting.", "Rise! Chemistry is calling.", "Good Morning! Conquer your fears today.", "Uth ja, aalas chhod!", "Morning! Only hard work pays off.", "Wake up! Your future is in your hands.", "Good Morning! Keep pushing forward.", "Rise! The competition is already awake.", "Morning! Be better than yesterday.", "Wake up! It's a beautiful day to study.", "Good Morning! Chase your dreams.", "Rise up! Defeat your doubts.", "Morning! Stay hydrated and study.", "Wake up! You can do this.", "Good Morning! Stay positive.", "Rise! Believe in yourself.", "Morning! Small steps lead to big goals.", "Wake up! Give it your 100%.", "Good Morning! Success is near."
];

const FILMY_QUOTES = [
    "Dropper naam sunkar failure samjha kya? Failure nahi... Fire hai main! Is baar college leke hi manega! ~Pushpa: The Rise (Allu Arjun)",
    "Distractions, Web-series, Social Media... I don't like it. I avoid! But NCERT... NCERT likes me! I can't avoid. ~K.G.F: Chapter 2 (Yash)",
    "Sunayi de raha hai... Behra nahi hoon main! Jo log bol rahe the tera nahi hoga, is saal sabko result se sunayi dega! ~Animal (Ranbir Kapoor)",
    "Syllabus ko chhodne se pehle... Uske past 10 years ke weightage se baat kar! ~Jawan (Shah Rukh Khan)",
    "Kursi ki peti baandh lijiye... Kyunki ab mock tests mein mausam bigadne wala hai! ~Pathaan (Shah Rukh Khan)",
    "Taiyari shuru majboori mein kiye the... Par ab Bio mein sach mein mazaa aa raha hai! ~Mirzapur (Pankaj Tripathi)",
    "Wo medical seat meri hai! Aur koi us college mein ja nahi sakta! ~Kabir Singh (Shahid Kapoor)",
    "Kuch hi din bache hain tumhare paas. Ye tumhari zindagi ke sabse khaas din hain. Jao aur aesi padhai karo ki ye din tumse koi na chheen sake! ~Chak De! India (Shah Rukh Khan)",
    "Ab ameer ka beta doctor nahi banega... Ab AIIMS mein wahi jayega, jo raat-raat bhar jaag ke sach mein haqdaar banega! ~Super 30 (Hrithik Roshan)",
    "Marks ke peeche mat bhago, concepts aur NCERT ka peecha karo... Selection jhak maar ke tumhare peeche aayega! ~3 Idiots (Aamir Khan)",
    "Physics ka, Chemistry ka, Biology ka... sabka badla lega re tera ye dropper! ~Gangs of Wasseypur (Nawazuddin Siddiqui)",
    "Ek baar jo maine padhne ki commitment kar li... Uske baad toh main kisi dosto ki party ki bhi nahi sunta! ~Wanted (Salman Khan)",
    "Mujhe fail karna dosto ke liye mushkil hi nahi... Namumkin hai, kyunki main competition se bahar nahi, competition banane walo me se hoon. ~Don (Shah Rukh Khan)",
    "Kabhi kabhi selection ke liye thodi neend harni padti hai... Aur neend haar kar seat jeetne wale ko hi asli DOCTOR kehte hain! ~Baazigar (Shah Rukh Khan)",
    "Kehte hain kisi Government College ko sachhe dil se chaho... toh poori kainaat tumhe us seat se milane ki saazish mein lag jaati hai. ~Om Shanti Om (Shah Rukh Khan)",
    "Aaj mere competitors ke paas Insta hai, Snapchat hai... Tere paas kya hai? Bhai, mere paas NCERT hai! ~Deewar (Amitabh Bachchan)",
    "Arre O Aspirant! Jo Physics ke numericals se darr gaya... samjho wo selection ki race se marr gaya. ~Sholay (Amjad Khan)",
    "Syllabus aur pressure se darr nahi lagta sahab... Exam mein OMR galat bharne aur negative marking se lagta hai! ~Dabangg (Sonakshi Sinha)",
    "Re-NEET ka tension lene ka nahi, NTA walo ko tension dene ka! Circuit, nikaal apna study material! ~Munna Bhai M.B.B.S (Sanjay Dutt)",
    "Medical college pohochne ke liye, is aalas aur comfort zone se nikalna bahot zaroori hai babu moshai. ~Yeh Jawaani Hai Deewani (Ranbir Kapoor)",
    "How's the Preparation? HIGH SIR! How's the Josh? HIGH SIR! ~Uri: The Surgical Strike (Vicky Kaushal)",
    "Agar tum mock test mein apne marks badhte dekh rahe ho... Toh zinda ho tum! ~Zindagi Na Milegi Dobara (Farhan Akhtar)",
    "Aata majhi satakli! Ab phone tabhi khulega jab aaj ke 200 MCQ solve ho jayenge! ~Singham (Ajay Devgn)",
    "Apna time aayega? Nahi bhai, Apna time apun khud MCQs solve karke laayega! ~Gully Boy (Ranveer Singh)",
    "Ye tumhari aakhri attempt ho sakti hai... Toh padhunga bhi aese hi, jaise ye meri aakhri attempt ho! ~Bhaag Milkha Bhaag (Farhan Akhtar)",
    "Main jab apne focus zone mein aata hoon na... Toh distraction toh kya, doston ka call tak nahi aata! ~Jawan (Shah Rukh Khan)",
    "Competition ek bada jungle hai... Aur is jungle mein survive karna hai toh padhai mein tumhe 'Dinosaur' banna padega! ~Salaar (Prabhas)",
    "Aspirant... Ek aag hai tere andar! Is aag ko Instagram pe nahi, apne mock tests par nikaal! ~Brahmastra (Amitabh Bachchan)",
    "Ek sahi tukka exam nahi nikalwa sakta... Concept clear hona chahiye aur mehnat roz honi chahiye! ~M.S. Dhoni (Sushant Singh Rajput)",
    "O Distraction, agle saal aana... Aaj mujhe Chemistry ki poori unit niptani hai! ~Stree (Rajkummar Rao)",
    "Load (Concept). Aim (Mock Test). Shoot (OMR)! Iske alawa koi chautha step nahi hai NEET nikaalne ka! ~RRR (Ram Charan)",
    "Ami je Topperrrr! Physics, tu samne aaja, aaj tere saare numericals solve karke hi uthunga! ~Bhool Bhulaiyaa 2 (Kartik Aaryan)",
    "Jab tak mere haath mein NCERT hai, NTA waalo... Mujhe fail karne wala paida nahi hua! ~Baahubali 2 (Prabhas)",
    "Papa, aapne kaha tha na ki apne sapno ke liye jaan laga dena... Ab aap result dekhna bas, baaki sab mujh par chhod do! ~Animal (Ranbir Kapoor)",
    "If you think you are bad in Physics... I am your Dad in Biology! Pura paper phod ke aaunga. ~K.G.F (Yash)",
    "Ammi jaan kehti thi... Koi bhi Mock Test chhota nahi hota, aur NEET se bada koi dharam nahi hota! ~Raees (Shah Rukh Khan)",
    "Don't underestimate the power of a focused Dropper! Hum seat mangte nahi, chheen ke laate hain. ~Chennai Express (Shah Rukh Khan)",
    "Kabhi kisi ko ye mat bolne dena ki 'Tera nahi hoga'. Apni aukaat apun apni All India Rank se khud banayega! ~Mary Kom (Priyanka Chopra)",
    "Padhte toh sab hain... Par seat wahi nikaalta hai jise apne hard-work par bharosa hota hai. ~Tiger Zinda Hai (Salman Khan)",
    "Log kya kehte hain usse farq nahi padta. Final OMR sheet kabhi jhooth nahi bolti! ~Drishyam (Ajay Devgn)",
    "Maine aane wale kal ke apne 'Stethoscope' se aashiqi ki hai... Social media waali aiyyashi nahi! ~Bajirao Mastani (Ranveer Singh)",
    "Agar koi concept na chamke aur lage sab khatam... Toh apne revision notes bolte hain, 'Main Hoon Na!' ~Main Hoon Na (Shah Rukh Khan)",
    "Naam yaad rakhna... Agle saal is area mein sabse pehla board mere hi clinic ka hoga! ~Agneepath (Hrithik Roshan)",
    "Jab tak State Quota mein Government College na mil jaye... Sharafat se apni desk par padhte raho! ~Zanjeer (Amitabh Bachchan)",
    "Pichle mock test ka score chhota lag raha hai? Record toh tutne ke liye hi bante hain! ~Bhaag Milkha Bhaag (Farhan Akhtar)",
    "Haar maan lena ek NEET Aspirant ki dictionary mein nahi hai, Sir! Ya toh seat milti hai, ya sabak milta hai. ~War (Hrithik Roshan)",
    "Uth kar dekho apne aalas se bahar... Har taraf mehnat karne walo ki fauj khadi hai. Agar nahi padhoge, toh peechhe chhut jaoge! ~Ghayal (Sunny Deol)",
    "Asli maza toh Physics aur Biology ke combined syllabus mein hai! ~Border (Sunny Deol)",
    "Humko toh eise lagta hai ki NTA waale kisi aur gola se aake paper set karte hain... Par iss gola par hum rukne waale thodi na hain! ~PK (Aamir Khan)",
    "Zindagi ho ya NEET ka exam... Jeetne ka mazaa tabhi aata hai, jab sab tumhare haarne ka intezaar kar rahe ho! ~Once Upon a Time in Mumbaai (Ajay Devgn)"
];

function getDailyContent() {
    const diffDays = Math.max(0, dayjs().diff(START_DATE, 'day'));
    const index = diffDays % MOTIVATIONAL_QUOTES.length;
    return {
        greet: GREETINGS[index],
        quote: MOTIVATIONAL_QUOTES[index],
        filmy: FILMY_QUOTES[index]
    };
}

// ─── Database Helpers (Reusing existing 'users' table) ──────────────

async function registerUser(chatId) {
    if (!supabase) return;
    try {
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
    if (!t) return `✨ *Nazar aur Sabar* ✨\n\n_Made with ♡ by Shush_`;
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
        if (!t) {
            return bot.sendMessage(chatId, `✨ *Nazar aur Sabar* ✨\n\n_Made with ♡ by Shush_`, { parse_mode: 'Markdown' });
        }

        bot.sendMessage(chatId,
            `🩺 *Welcome ${name}!*\n\n` +
            `*${t.days} days LEFT.* ✨\n\n` +
            `Roz subah 5 baje tujhe reminder milega.\n\n` +
            `_Made with ♡ by Shush_`,
            { parse_mode: 'Markdown', reply_markup: mainKeyboard }
        );
    });

    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text || '';
        if (text.startsWith('/start')) return;

        const t = getTimeRemaining();
        if (!t) {
            return bot.sendMessage(chatId, `✨ *Nazar aur Sabar* ✨\n\n_Made with ♡ by Shush_`, { parse_mode: 'Markdown' });
        }

        if (text === '⏳ Countdown' || text.startsWith('/countdown')) {
            await registerUser(chatId);
            bot.sendMessage(chatId, buildCountdown(t), {
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
        const t = getTimeRemaining();
        if (!t) {
            await bot.answerCallbackQuery(query.id);
            return bot.sendMessage(query.message.chat.id, `✨ *Nazar aur Sabar* ✨\n\n_Made with ♡ by Shush_`, { parse_mode: 'Markdown' });
        }

        if (query.data === 'show_countdown' || query.data === 'refresh_countdown') {
            await registerUser(query.message.chat.id);
            try {
                if (query.data === 'show_countdown') {
                    await bot.sendMessage(query.message.chat.id, buildCountdown(t), {
                        parse_mode: 'Markdown',
                        reply_markup: refreshKeyboard
                    });
                } else {
                    await bot.editMessageText(buildCountdown(t), {
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

    let msg = "";
    if (t.days === 0) {
        msg = `*Tum Ghayal ho isiliye Ghatak ho.* Phod ke aana Re-NEET 2026. 🫡🤍\n\n_Made with ♡ by Shush_`;
    } else {
        const content = getDailyContent();
        msg = `🌅 *${content.greet}*\n\n` +
              `*${t.days} days LEFT.* ✨\n\n` +
              `*_Quote:_*\n_${content.quote}_\n\n` +
              `*_Filmy Motivation:_*\n_${content.filmy}_\n\n` +
              `_Made with ♡ by Shush_`;
    }

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
    if (req.query.cron === 'true') {
        if (req.headers.authorization !== `Bearer ${CRON_SECRET}`) {
            return res.status(401).send('Unauthorized');
        }
        await fireDailyReminder();
        return res.status(200).send('Daily reminder fired.');
    }

    if (req.method === 'GET') {
        const t = getTimeRemaining();
        return res.status(200).json({
            status: "Online",
            bot: "RE-NEET 2026 24/7 Bot",
            days_remaining: t ? t.days : 0
        });
    }

    if (req.method === 'POST') {
        const update = req.body;
        if (!update || !update.update_id) return res.status(400).send('Bad Request');

        try {
            if (bot) bot.processUpdate(update);
            await new Promise(r => setTimeout(r, 2000));
            return res.status(200).send('OK');
        } catch (err) {
            return res.status(500).send('Error');
        }
    }

    return res.status(405).send('Method Not Allowed');
};
