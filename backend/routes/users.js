const router = require('express').Router();

const celebrate = require('../middlewares/celebrate');

const {
  getUser,
  getUsers,
  getUserInfo,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getUser);
router.get('/users/:userId', celebrate.celebrateGetUser, getUserInfo);
router.patch('/users/me', celebrate.celebrateUpdateUser, updateUser);
router.patch('/users/me/avatar', celebrate.celebrateUpdateAvatar, updateAvatar);

module.exports = router;
