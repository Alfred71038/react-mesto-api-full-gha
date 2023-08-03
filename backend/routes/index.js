const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { auth } = require('../middlewares/auth');
const NotFound = require('../utils/NotFound');

router.use(usersRouter);
router.use(cardsRouter);

router.use(auth);

router.use('/*', (req, res, next) => {
  next(new NotFound('Неизвестный запрос'));
});

module.exports = router;
