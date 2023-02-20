const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const errorHandler = require('./middlewares/error-handler');
const { botCheckReady, botCollectMessage, botLogin } = require('./discord-bot/discord-bot');
const { getLatestGuildMessages } = require('./controllers/guildNews')
const routes = require('./routes/index');

const { PORT = 3001 } = process.env;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({credentials: true, origin: true}));


botCheckReady();
botCollectMessage();
botLogin();
setInterval(() => getLatestGuildMessages(), 1000  * 60 * 15)

app.use(routes);


app.use(errorHandler);

app.listen(PORT, () => console.log('Сервер запущен'));
