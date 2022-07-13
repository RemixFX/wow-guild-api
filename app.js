const express = require('express');
require('dotenv').config();
const { Client, Intents } = require('discord.js');

const { PORT = 3000 } = process.env;
const pg = require('pg');

const app = express();
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

bot.once('ready', () => {
  console.log('Ready!');
});

bot.on('messageCreate', (message) => {
  console.log(message);
});

bot.login(process.env.TOKEN);

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) {
    throw err;
  } else {
    res.status(200).json(res.rows);
    console.log(JSON.stringify(res.rows));
  }
  client.end();
});

app.listen(PORT);
