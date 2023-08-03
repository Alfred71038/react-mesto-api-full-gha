const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const User = require('../models/user');

const ConflictError = require('../utils/ConflictError');

const BadRequest = require('../utils/BadRequest');

const NotFound = require('../utils/NotFound');

const { NODE_ENV, JWT_SECRET } = process.env;

const { ERROR_CODE } = require('../utils/errors');
const UnauthоrizedError = require('../utils/UnauthоrizedError');

const getUserInfo = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotFound('Пользователь не найден'));
        return;
      }
      res.send(user);
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(ERROR_CODE.SUCCESS_CREATE).send(users))
    .catch((err) => next(err));
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFound('Пользователь не найден'));
        return;
      }
      res.status(ERROR_CODE.SUCCESS_CREATE).send(user);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (!user) {
        next(new NotFound());
        return;
      }
      res.status(ERROR_CODE.SUCCESS_CREATE).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => (res.send(user)))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new BadRequest('Переданы некорректные данные при обновлении профиля'));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    }))
    .then((user) => res.status(ERROR_CODE.SUCCESS_CREATE).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError());
      } else if (err.name === 'ValidationError') {
        next(new BadRequest());
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email })
    .select('+password')
    .orFail(() => new UnauthоrizedError())
    .then((user) => {
      bcrypt.compare(String(password), user.password)
        .then((validId) => {
          if (validId) {
            const token = jwt.sign({
              _id: user._id,
            }, NODE_ENV === 'production' ? JWT_SECRET : 'secret', { expiresIn: '7d' });
            res.status(200).send({ jwt: token });
          } else {
            next(new UnauthоrizedError());
          }
        });
    })
    .catch(next);
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  getUserInfo,
  updateUser,
  updateAvatar,
  login,
};
