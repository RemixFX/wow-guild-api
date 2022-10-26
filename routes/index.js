const router = require('express').Router();
const { getMessages } = require('../controllers/discord-api');
const { getEvents, postEvent, updateEvent, deleteEvent } = require('../controllers/events');

router.get('/discord', getMessages);
router.get('/events', getEvents);
router.post('/events', postEvent);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

module.exports = router;
