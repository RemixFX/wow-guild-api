const router = require('express').Router();
const { getMessages, postMessages } = require('../controllers/discord-api');

// router.get('/discord', getMessages);
router.post('/discord', postMessages);

module.exports = router;
