const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { botCheckReady, botCollectMessage, botLogin } = require('./discord-bot/discord-bot');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors());
app.use(express.json());

botCheckReady();
botCollectMessage();
botLogin();

app.use(routes);
app.listen(PORT, () => console.log('Сервер запущен'));
