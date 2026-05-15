<p align="center">
  <h1 align="center">🩺 RE-NEET 2026 Countdown Bot 🔄</h1>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Language-JavaScript-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Hosting-Vercel-000000?logo=vercel&logoColor=white" alt="Vercel">
  <img src="https://img.shields.io/badge/Bot-Telegram-26A5E4?logo=telegram&logoColor=white" alt="Telegram">
  <img src="https://img.shields.io/badge/Database-None-gray" alt="No DB">
  <img src="https://img.shields.io/badge/Maintained%3F-Yes-brightgreen.svg" alt="Maintained">
</p>

<p align="center">
  <a href="https://www.buymeacoffee.com/shushank" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 50px !important;width: 181px !important;" ></a>
</p>

---

## 📖 What is this?
A simple, stateless Telegram countdown bot for **RE-NEET 2026** (Exam: **21 June 2026, Sunday**). No database needed. Pure serverless magic.

---

## 💎 Features
- **⏳ Instant Countdown**: Live days/hours/minutes/seconds with `🔄 Refresh` button
- **💬 850+ Sarcastic Quotes**: Reality checks on demand
- **👋 500+ Start Messages**: Every `/start` feels fresh
- **📢 Inline Mode**: Share countdown in any Telegram chat
- **👥 Group/Channel Support**: Works everywhere
- **☁️ 100% Serverless**: No server to maintain, no DB to worry about

---

## 🛠 Commands

| Command | What it does |
|---|---|
| `/start` | Welcome message + custom keyboard |
| `/countdown` | Show live countdown to RE-NEET 2026 |
| `/motivate` | Random sarcastic/motivational quote |
| `/help` | See all commands |
| `@RENEET2026CountdownBot` | Inline mode — share in any chat |

---

## 🏗 Tech Stack
- **Runtime**: Node.js
- **Compute**: Vercel Serverless Functions
- **API**: Telegram Bot API (via `node-telegram-bot-api`)
- **Time**: dayjs
- **Database**: ❌ None (stateless)

---

## 🚀 Deployment

### 1. Create Bot via @BotFather
- `/newbot` → Name: `RE-NEET 2026 Countdown` → Username: `RENEET2026CountdownBot`
- Copy the token

### 2. Deploy to Vercel
- Push this repo to GitHub
- Import in Vercel → Add env var `TELEGRAM_BOT_TOKEN`
- Deploy

### 3. Set Webhook
```
https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://reneet-2026-bot.vercel.app/api/bot
```
Or run: `node set_webhook.js`

---

## 🆘 If Bot Stops Working
1. **Vercel**: Go to [vercel.com](https://vercel.com/) → Redeploy
2. **Webhook Reset**: Open the setWebhook URL above in browser

---

**Founder**: [Shushank Aryan](https://t.me/max9xm)
**Architect**: Antigravity (AI)
**Made with ♡ for RE-NEET 2026 Aspirants.**
