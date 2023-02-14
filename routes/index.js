const router = require('express').Router();
const { getMessages } = require('../controllers/discordApi');
const { getEvents, postEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { createUser, login, getMyProfile, logout } = require('../controllers/user');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const { postBracket, getBrackets, updateNote } = require('../controllers/brackets');
const { getGuildMessages, postGuildMessage, getLatestGuildMessages } = require('../controllers/guildNews');

router.post('/brackets', postBracket)
router.get('/brackets', getBrackets)
router.put('/update', updateNote);
router.post('/signin', login);
router.post('/signup', createUser);
router.get('/discord', getMessages);
router.get('/news', getGuildMessages);
router.post('/news', postGuildMessage);
router.get('/latestnews', getLatestGuildMessages);
router.get('/events', getEvents);
router.post('/signout', logout);

router.get('/me', auth, getMyProfile);
router.post('/events', auth, postEvent);
router.put('/events/:id', auth, updateEvent);
router.delete('/events/:id', auth, deleteEvent);


router.use('*', (req, res, next) => {
  next(new NotFoundError('запрашиваемый ресурс не найден'));
});

module.exports = router;
