const Card = require('../models/card');

const { ERROR_CODE } = require('../utils/errors');

const NotFound = require('../utils/NotFound');

const BadRequest = require('../utils/BadRequest');

const ForbiddenError = require('../utils/ForbiddenError');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((user) => {
      res.status(ERROR_CODE.SUCCESS_CREATE).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные при создании карточки'));
      }
      return next(err);
    });
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send({ cards });
    })
    .catch(next);
};

const deleteCards = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не найдена');
      } else if (card.owner.toString() !== req.user._id) {
        return Promise.reject(new ForbiddenError('Вы не можете удалить чужую карточку'));
      }
      return card.deleteOne().then(() => res.status(200).send({ message: 'Карточка удалена' }));
    })
    .catch(next);
};

const putCardLikes = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return next(new NotFound('Карточка не найдена'));
      }
      return res.send(card);
    })
    .catch(next);
};

const deleteCardLikes = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return next(new NotFound('Карточка не найдена'));
      }
      return res.send(card);
    })
    .catch(next);
};

module.exports = {
  createCard,
  getCards,
  putCardLikes,
  deleteCardLikes,
  deleteCards,
};
