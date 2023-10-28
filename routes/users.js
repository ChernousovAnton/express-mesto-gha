const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, updateUser, updateAvatar, getMeUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMeUser);
router.patch('/me', updateUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
