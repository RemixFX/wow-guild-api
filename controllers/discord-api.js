const db = require('../db');

const postMessages = async (req, res) => {
  const { content, owner } = req.body;
  const date = new Date();
  const newMessage = await db.query('INSERT INTO message (content, owner, date) values ($1, $2, $3) RETURNING *', [content, owner, date]);

  // console.log(content, owner, date);
  res.json(newMessage.rows[0]);
};

module.exports = { postMessages };
