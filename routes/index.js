const router = require('express').Router();
const { getMessages } = require('../controllers/discordApi');
const { getEvents, postEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { createUser, login, getMyProfile, logout } = require('../controllers/user');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const { postBracket, getBrackets, deleteBracket, updateNote, updateNameBracket } = require('../controllers/brackets');
const { getGuildMessages, postGuildMessage, getLatestGuildMessages, deleteGuildMessage } = require('../controllers/guildNews');

router.get('/api/brackets', getBrackets)
router.post('/api/signin', login);
router.get('/api/discord', getMessages);
router.get('/api/news', getGuildMessages);
router.get('/api/latestnews', getLatestGuildMessages);
router.get('/api/events', getEvents);
router.post('/api/signout', logout);

router.get('/api/me', auth, getMyProfile);
router.post('/api/signup', auth, createUser);
router.post('/api/events', auth, postEvent);
router.put('/api/events/:id', auth, updateEvent);
router.delete('/api/events/:id', auth, deleteEvent);
router.post('/api/brackets', auth, postBracket)
router.delete('/api/bracket/:id', auth, deleteBracket);
router.put('/api/update', auth, updateNameBracket)
router.put('/api/update-note', auth, updateNote);
router.post('/api/news', auth, postGuildMessage);
router.delete('/api/news/:id', auth, deleteGuildMessage);


router.use('*', (req, res, next) => {
  next(new NotFoundError('запрашиваемый ресурс не найден'));
});

module.exports = router;
