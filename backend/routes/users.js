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
router.get('/users/me', getUserInfo);
router.get('/:userId', celebrate.celebrateGetUser, getUser);
router.patch('/me', celebrate.celebrateUpdateUser, updateUser);
router.patch('/me/avatar', celebrate.celebrateUpdateAvatar, updateAvatar);

module.exports = router;
