const router = require('express').Router();
const {
  getUsers, getUser, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.patch('/me', updateUser);
router.get('/:userId', getUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
