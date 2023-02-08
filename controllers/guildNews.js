const db = require('../db');

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

module.exports = {postGuildMessage, getGuildMessages}
