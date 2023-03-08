const db = require('../db');

const postEvent = (req, res, next) => {
  const { date, name, raidleader, time } = req.body;
  db.query(
    'INSERT INTO events (date, name, raidleader, time) VALUES ($1, $2, $3, $4) RETURNING id, date, name, raidleader, time',
    [date, name, raidleader, time])
  .then((events) => res.status(201).json(events.rows[0]))
  .catch((err) => next({message: 'Ошибка сервера. Не удалось создать событие'}))
}

const getEvents = (req, res, next) => {
  db.query(
    'SELECT * FROM events')
    .then((events) => res.status(200).json(events.rows))
    .catch((err) => next({message: 'Ошибка сервера. Не удалось загрузить события'}))
};

const updateEvent = (req, res, next) => {
  const id = parseInt(req.params.id);
  const { date, name, raidleader, time } = req.body;
  db.query(
    'UPDATE events SET date = $1, name = $2, raidleader = $3, time = $4 WHERE id = $5 RETURNING id, date, name, raidleader, time',
    [date, name, raidleader, time, id])
    .then((events) => res.status(200).json(events.rows[0]))
    .catch((err) => next({message: 'Ошибка сервера. Не удалось изменить событие'}))
}

const deleteEvent = (req, res, next) => {
  const reqId = parseInt(req.params.id);
  db.query(
    'DELETE FROM events WHERE id = $1',
    [reqId])
    .then(() => res.status(200).send({ id: reqId }))
    .catch((err) => next({message: 'Ошибка сервера. Не удалось удалить событие'}))
}

module.exports = { postEvent, getEvents, updateEvent, deleteEvent };
