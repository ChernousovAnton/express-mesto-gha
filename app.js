require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const { PORT = 3000, BASE_PATH = 'localhost' } = process.env;

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
}).then(() => console.log("Connect to MongoDB"));

app.use((req, res, next) => {
  req.user = {
    _id: '652a933a8ea2159606b25fd0',
  };
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} ${BASE_PATH}!`);
});
