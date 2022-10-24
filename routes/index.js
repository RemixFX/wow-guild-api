const router = require('express').Router();
const { getMessages } = require('../controllers/discord-api');
const { getEvents, postEvents } = require('../controllers/events');

router.get('/discord', getMessages);
router.get('/events', getEvents);
router.post('/events', postEvents);

module.exports = router;
