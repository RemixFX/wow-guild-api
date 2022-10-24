const router = require('express').Router();
const { getMessages } = require('../controllers/discord-api');
const { getEvents, postEvents, updateEvents } = require('../controllers/events');

router.get('/discord', getMessages);
router.get('/events', getEvents);
router.post('/events', postEvents);
router.put('/events/:id', updateEvents);

module.exports = router;
