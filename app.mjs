import path, { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import mongoose from "mongoose";
import multer from "multer";

import feedRoutes from "./routes/feed";
import authRoutes from "./routes/auth"

const app = express();
export const __dirname = dirname(fileURLToPath(import.meta.url));
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const MONGODB_URI =
  "mongodb+srv://dmitry:OvOTvIZHoxySg5PN@cluster0-qvwe4.mongodb.net/messages";

app.use(cors())
// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single("image"))
app.use("/images", express.static(path.join(__dirname, "images")));

// CORS Cross Origin Resource Sharing
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

// Will be executed whenever error is thrown or forwarded with next()
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("works!");
    app.listen(8080);
  })
  .catch(err => console.log(err));
