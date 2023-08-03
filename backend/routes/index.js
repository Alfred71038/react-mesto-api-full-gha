const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFound = require('../utils/NotFound');

router.use(usersRouter);
router.use(cardsRouter);

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('/*', (req, res, next) => {
  next(new NotFound('Неизвестный запрос'));
});

module.exports = router;
