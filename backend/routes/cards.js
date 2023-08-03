const router = require('express').Router();

const celebrate = require('../middlewares/celebrate');

const {
  createCard,
  getCards,
  deleteCards,
  putCardLikes,
  deleteCardLikes,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', celebrate.celebrateCreateCard, createCard);
router.delete('/cards/:cardId', celebrate.celebrateGetCardId, deleteCards);
router.put('/cards/:cardId/likes', celebrate.celebrateGetCardId, putCardLikes);
router.delete('/cards/:cardId/likes', celebrate.celebrateGetCardId, deleteCardLikes);

module.exports = router;
