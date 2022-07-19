const db = require('../db');

const postMessages = (content, owner) => {
  const date = new Date();
  db.query(
    'INSERT INTO message (content, owner, date) VALUES ($1, $2, $3)',
    [content, owner, date],
  )
    .then(() => console.log(`сообщение "${content}" успешно добавлено`))
    .catch((err) => console.log(err));
};

const getMessages = (req, res) => {
  db.query(
    'SELECT *, to_char(date, \'dd.mm.yyyy hh24:mi:ss\') AS date FROM message',
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    },
  );
};

module.exports = { postMessages, getMessages };
