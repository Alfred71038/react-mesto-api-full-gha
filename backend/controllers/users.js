const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

const ConflictError = require('../utils/ConflictError');

const BadRequest = require('../utils/BadRequest');

const NotFound = require('../utils/NotFound');

const { ERROR_CODE } = require('../utils/errors');

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => {
          // eslint-disable-next-line no-param-reassign
          user.password = undefined;
          res.status(ERROR_CODE.SUCCESS_CREATE).send(user);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return next(
              new BadRequest(
                'Переданы некорректные данные при создании пользователя',
              ),
            );
          } if (err.code === 11000) {
            return next(
              new ConflictError('Пользователь с таким email уже существует'),
            );
          }
          return next(err);
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      return res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ _id: user._id });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id).select('+email')
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return next(new NotFound('Пользователь не найден'));
      }
      return res.send(user);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
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

const userSignOut = (req, res, next) => {
  try {
    res.clearCookie('jwt', { httpOnly: true }).send({ exit: 'sign out' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  login,
  getUser,
  getUsers,
  getUserInfo,
  updateUser,
  updateAvatar,
  userSignOut,
};
