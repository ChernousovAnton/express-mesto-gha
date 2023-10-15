const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard, doesCardExist, doesCardIdValid,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', doesCardIdValid);
router.delete('/:cardId', doesCardExist);
router.delete('/:cardId', deleteCard);
router.patch('/:cardId/likes', doesCardIdValid);
router.patch('/:cardId/likes', doesCardExist);
router.patch('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', doesCardIdValid);
router.delete('/:cardId/likes', doesCardExist);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
