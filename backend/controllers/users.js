const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const User = require('../models/user');

const ConflictError = require('../utils/ConflictError');

const BadRequest = require('../utils/BadRequest');

const NotFound = require('../utils/NotFound');

const { NODE_ENV, JWT_SECRET } = process.env;

const { ERROR_CODE } = require('../utils/errors');
const UnauthоrizedError = require('../utils/UnauthоrizedError');

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
            next(
              new BadRequest(
                'Переданы некорректные данные при создании пользователя',
              ),
            );
          } else if (err.code === 11000) {
            next(
              new ConflictError('Пользователь с таким email уже существует'),
            );
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.params._id).select('+email')
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
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFound('Пользователь не найден'));
      }
      return res.send(user);
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
