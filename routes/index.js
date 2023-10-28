const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const authRouter = require('./auth');
const auth = require('../middlewares/auth');

router.use('/', authRouter);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.all('*', (_, res) => {
  res.status(404).send({ message: 'Not Found' });
});

module.exports = router;
