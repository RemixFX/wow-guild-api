const router = require('express').Router();
const { getMessages } = require('../controllers/discord-api');
const { getEvents, postEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { createUser, login } = require('../controllers/user');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');

router.get('/q', function (req, res) {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)

  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)
})
router.post('/signin', login);
router.post('/signup', createUser);
router.get('/discord', getMessages);
router.get('/events', getEvents);
//router.use(auth);
router.post('/events', auth, postEvent);
router.put('/events/:id', auth, updateEvent);
router.delete('/events/:id', auth, deleteEvent);

router.use('*', (req, res, next) => {
  next(new NotFoundError('запрашиваемый ресурс не найден'));
});

module.exports = router;
