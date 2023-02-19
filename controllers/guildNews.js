const db = require('../db');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
/* const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args)); */

const postGuildMessage = (req, res, next) => {
  const date = new Date();
  const { content, owner } = req.body;
  db.query(
    'INSERT INTO guild_message (content, owner, date) VALUES ($1, $2, $3) RETURNING id, content, owner, to_char(date, \'dd.mm.yyyy hh24:mi:ss\') AS date',
    [content, owner, date],
  )
    .then((message) => res.status(201).json(message.rows[0]))
    .catch((err) => {
      console.log(err)
      next(err)
    });
};

const getGuildMessages = (req, res) => {
  db.query(
    'SELECT *, to_char(date, \'dd.mm.yyyy hh24:mi:ss\') AS date FROM guild_message')
    .then((messages) => res.status(200).json(messages.rows))
    .catch((err) => next(err))
};

const getSirusBossFight = () => {
  return fetch('https://api.sirus.su/api/base/57/leader-board/bossfights/latest?&guild=5', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

const postBossFightGuildMessage = async (messagesToSend) => {
  const owner = 'SIRUS #рейды'
  const newMessages = await messagesToSend.sort()
  //console.log(messagesToSend, newMessages)
  for await (const message of newMessages) {
    const date = message.slice(0, 20)
    const content = message.slice(20)
    await db.query(
      'INSERT INTO guild_message (content, owner, date) VALUES ($1, $2, $3) RETURNING id',
      [content, owner, date])
      .then((result) => console.log(`Сообщение успешно добавлено с id: ${result.rows[0].id}`))
      .catch(err => console.log(err))
  }
}

const getLatestGuildMessages = async (req, res, next) => {
  try {
    let newMessages = []
    const messages = await db.query(
      'SELECT *, to_char(date, \'yyyy-mm-dd hh24:mi:ss\') AS date FROM guild_message'
    )
    const date = messages.rows[messages.rows.length - 1].date
    const bossFightData = await getSirusBossFight()
    bossFightData.data.forEach((fight) => {
      if (new Date(fight.timeEnd) > new Date(date)) {
        newMessages.push(
          `${fight.timeEnd} Гильдия победила ${fight.boss_name} ${fight.difficulty > 1 ? 'героической сложности' : ''} в рейде из ${fight.players} человек `
        )
      } else return
    })
    if (newMessages.length > 0) {
      await postBossFightGuildMessage(newMessages)
      console.log(`Запрос был сделан, было добавлено ${newMessages.length} событий`)
      newMessages = []
    } else console.log(`Запрос был сделан, не найдено событий для добавления`)
  }
  catch (err) {
    console.log(err)
  }
};

module.exports = { postGuildMessage, getGuildMessages, getLatestGuildMessages, getSirusBossFight }
