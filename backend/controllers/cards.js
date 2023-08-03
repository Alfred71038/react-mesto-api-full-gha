const Card = require('../models/card');

const { ERROR_CODE } = require('../utils/errors');

const NotFound = require('../utils/NotFound');

const BadRequest = require('../utils/BadRequest');

const ForbiddenError = require('../utils/ForbiddenError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send({ cards });
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { cardId } = req.params;
  Card.create({ name, link, owner: cardId })
    .then((card) => {
      res.status(ERROR_CODE.SUCCESS_CREATE).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные при создании карточки'));
      }
      return next(err);
    });
};

const deleteCards = (req, res, next) => Card.findById(req.params.cardId)
  .then((card) => {
    if (!card) {
      next(new NotFound());
      return;
    }

    if (!card.owner.equals(req.user._id)) {
      next(new ForbiddenError());
      return;
    }
    card.deleteOne()
      .then(() => res.status(200).send({ message: 'Карточка успешно удалена' }))
      .catch(next);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequest());
    } else {
      next(err);
    }
  });

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
