const db = require('../db');

const postEvents = (req, res) => {
  const { date, name, raidleader, time } = req.body;
  db.query(
    'INSERT INTO events (date, name, raidleader, time) VALUES ($1, $2, $3, $4)',
    [date, name, raidleader, time],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send('Cобытие успешно добавлено');
    }
  )
};

const getEvents = (req, res) => {
  db.query(
    'SELECT * FROM events',
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    },
  );
};

module.exports = { postEvents, getEvents };
