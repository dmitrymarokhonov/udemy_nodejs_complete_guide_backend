const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose")

const feedRoutes = require('./routes/feed');

const app = express();

const MONGODB_URI =
  "mongodb+srv://dmitry:OvOTvIZHoxySg5PN@cluster0-qvwe4.mongodb.net/messages";

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

// CORS Cross Origin Resource Sharing
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})


app.use('/feed', feedRoutes);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(8080);
  })
  .catch(err => console.log(err));