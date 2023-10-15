const mongoose = require('mongoose');
const User = require('../models/user');

const doesUserIdValid = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.userId)) {
    res.status(400).send({ message: 'Неверный ID' });
    return;
  }
  next();
};

const doesUserExist = (req, res, next) => {
  User.findById(req.params.userId)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  next();
};

const getUsers = (_, res) => {
  User.find()
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Неверный ID' });
      }
      return res.status(500).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = {
  doesUserExist,
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
  doesUserIdValid,
};
