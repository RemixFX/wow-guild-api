const db = require('../db');

const postServerMessage = (content, owner) => {
  const date = new Date();
  db.query(
    'INSERT INTO server_message (content, owner, date) VALUES ($1, $2, $3)',
    [content, owner, date],
  )
    .then(() => console.log(`сообщение "${content}" успешно добавлено`))
    .catch((err) => console.log(err));
};

const getMessages = (req, res) => {
  db.query(
    'SELECT *, to_char(date, \'dd.mm.yyyy hh24:mi:ss\') AS date FROM server_message')
    .then((messages) => res.status(200).json(messages.rows))
    .catch((err) => next(err))
};

module.exports = { postServerMessage, getMessages };
