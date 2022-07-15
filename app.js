const express = require('express');
require('dotenv').config();
const { Client, Intents } = require('discord.js');
const pool = require('./db');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

bot.once('ready', () => {
  console.log('Ready!');
});

bot.on('messageCreate', (message) => {
  console.log(message);
});

bot.login(process.env.TOKEN);

// pool.connect();

app.use(routes);

/* pool.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) {
    throw err;
  } else {
    res.status(200).json(res.rows);
    console.log(JSON.stringify(res.rows));
  }
  pool.end();
}); */

app.listen(PORT);
