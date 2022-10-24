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
    // if (message.chanell === dw34dds)
    let filterMessage = message.content.replace('@everyone', '');
    const emoji = filterMessage.match(/<:\w+:\d+>/g); // массив
    if (emoji !== null) {
      for (let i = 0; i < emoji.length; i += 1) {
        filterMessage = filterMessage.replace(emoji[i], '');
      }
    }
    postMessages(filterMessage, message.author.username);
  });
};

const botLogin = () => bot.login(process.env.TOKEN);

module.exports = {
  botCheckReady,
  botCollectMessage,
  botLogin,
};
