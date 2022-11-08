const db = require('../db');

const postEvent = (req, res) => {
  const { date, name, raidleader, time } = req.body;
  db.query(
    'INSERT INTO events (date, name, raidleader, time) VALUES ($1, $2, $3, $4) RETURNING id, date, name, raidleader, time',
    [date, name, raidleader, time],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json(results.rows[0]);
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

const updateEvent = (req, res) => {
  const reqId = parseInt(req.params.id);
  const { date, name, raidleader, time } = req.body;
  db.query(
    'UPDATE events SET date = $1, name = $2, raidleader = $3, time = $4 WHERE id = $5',
    [date, name, raidleader, time, reqId],
    (error, results) => {
      if (error) {
       throw error;
      }
      res.status(200).send({message: `Событие с id: ${reqId} изменено`});
      }
  )
}

const deleteEvent = (req, res) => {
  const reqId = parseInt(req.params.id);
  db.query(
    'DELETE FROM events WHERE id = $1',
    [reqId],
    (error, results) => {
      if (error) {
       throw error;
      }
      res.status(200).send({message: `Событие с id: ${reqId} удалено`});
      }
  )
}

module.exports = { postEvent, getEvents, updateEvent, deleteEvent };
