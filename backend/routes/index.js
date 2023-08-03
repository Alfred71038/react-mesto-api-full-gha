const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFound = require('../utils/NotFound');

router.use(usersRouter);
router.use(cardsRouter);

router.use('/*', (req, res, next) => {
  next(new NotFound('Неизвестный запрос'));
});

module.exports = router;
