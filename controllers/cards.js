const mongoose = require('mongoose');
const Card = require('../models/card');

const doesCardIdValid = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.cardId)) {
    res.status(400).send({ message: 'Неверный ID' });
    return;
  }
  next();
};

const doesCardExist = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  next();
};

const getCards = (_, res) => {
  Card.find()
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.status(202).send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
  doesCardExist,
  doesCardIdValid,
};
