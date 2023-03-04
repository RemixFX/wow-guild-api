const router = require('express').Router();
const { getMessages } = require('../controllers/discordApi');
const { getEvents, postEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { createUser, login, getMyProfile, logout } = require('../controllers/user');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const { postBracket, getBrackets, deleteBracket, updateNote, updateNameBracket } = require('../controllers/brackets');
const { getGuildMessages, postGuildMessage, getLatestGuildMessages, deleteGuildMessage } = require('../controllers/guildNews');

router.get('/brackets', getBrackets)
router.post('/signin', login);
router.get('/discord', getMessages);
router.get('/news', getGuildMessages);
router.get('/latestnews', getLatestGuildMessages);
router.get('/events', getEvents);
router.post('/signout', logout);
router.delete('/bracket/:id', deleteBracket);
router.put('/update', updateNameBracket)

router.get('/me', auth, getMyProfile);
router.post('/signup', auth, createUser);
router.post('/events', auth, postEvent);
router.put('/events/:id', auth, updateEvent);
router.delete('/events/:id', auth, deleteEvent);
router.post('/brackets', auth, postBracket)

router.put('/update', auth, updateNote);
router.post('/news', auth, postGuildMessage);
router.delete('/news/:id', auth, deleteGuildMessage);


router.use('*', (req, res, next) => {
  next(new NotFoundError('запрашиваемый ресурс не найден'));
});

module.exports = router;
