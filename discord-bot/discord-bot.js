const { Client, Intents } = require('discord.js');
const { postMessages } = require('../controllers/discord-api');

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const botCheckReady = () => {
  bot.once('ready', () => {
    console.log('Discord-бот готов');
  });
};

const botCollectMessage = () => {
  bot.on('messageCreate', (message) => {
    postMessages(message.content, message.author.username);
  });
};

const botLogin = () => bot.login(process.env.TOKEN);

module.exports = {
  botCheckReady,
  botCollectMessage,
  botLogin,
};
