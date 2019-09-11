const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const graphqlHttp = require('express-graphql');

const cookieParser = require('cookie-parser');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString()}-${file.originalname}`);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png'
    || file.mimetype === 'image/jpg'
    || file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const MONGODB_URI = 'mongodb+srv://dmitry:OvOTvIZHoxySg5PN@cluster0-qvwe4.mongodb.net/messages';

app.use(cors());
app.use(cookieParser('some_secret_1234'));
// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(multer({ storage: fileStorage, fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));

// CORS Cross Origin Resource Sharing
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/graphql', graphqlHttp({
  schema: graphqlSchema,
  rootValue: graphqlResolver
}));

// Will be executed whenever error is thrown or forwarded with next()
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const { message } = error;
  const { data } = error;
  res.status(status).json({ message, data });
});

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(8080);
    console.log('works!');
  })
  .catch((err) => console.log(err));
