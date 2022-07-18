const router = require('express').Router();
const { getMessages } = require('../controllers/discord-api');

router.get('/discord', getMessages);

module.exports = router;
