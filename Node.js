import express from 'express';
import bodyParser from 'body-parser';
import { Telegraf } from 'telegraf';

const app = express();
app.use(bodyParser.json());

// Initialize the bot with token from BotFather
const bot = new Telegraf('<YOUR_BOT_TOKEN>');

// Handle /start command
bot.start((ctx) => {
  ctx.reply('Welcome to TapMe! Start tapping to earn coins.');
  // Logic to insert new user into Supabase DB goes here
});

bot.launch(); // Start the bot

// Set up Express server for backend
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
