const router = require('express').Router();

const celebrate = require('../middlewares/celebrate');

const {
  createCard,
  getCards,
  deleteCards,
  putCardLikes,
  deleteCardLikes,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', celebrate.celebrateCreateCard, createCard);
router.delete('/:cardId', celebrate.celebrateGetCardId, deleteCards);
router.put('/:cardId/likes', celebrate.celebrateGetCardId, putCardLikes);
router.delete('/:cardId/likes', celebrate.celebrateGetCardId, deleteCardLikes);

module.exports = router;
