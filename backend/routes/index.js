const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const celebrate = require('../middlewares/celebrate');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { createUser, login } = require('../controllers/users');
const NotFound = require('../utils/NotFound');

router.post('/signup', celebrate.celebrateCreateUser, createUser);
router.post('/signin', celebrate.celebrateLogin, login);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('/', (req, res, next) => {
  next(new NotFound('Неизвестный запрос'));
});

module.exports = router;
