const router = require('express').Router();
const { getMessages } = require('../controllers/discord-api');
const { getEvents, postEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { createUser, login } = require('../controllers/user');
const NotFoundError = require('../errors/not-found-error');

router.get('/discord', getMessages);
router.get('/events', getEvents);
router.post('/events', postEvent);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);
router.post('/signin', login);
router.post('/signup', createUser);
router.use('*', (req, res, next) => {
  next(new NotFoundError('запрашиваемый ресурс не найден'));
});

module.exports = router;
