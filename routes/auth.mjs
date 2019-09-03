import express from "express";
import checkAPIs from "express-validator";

const { body } = checkAPIs;

import User from "../models/user";
import { signup, login } from "../controllers/auth";

const router = express.Router();

router.put("/signup", [
  body("email")
    .isEmail()
    .withMessage("Please enter the valid email")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then(userDoc => {
        if (userDoc) {
          return Promise.reject("E-mail address already exists.");
        }
      });
    })
    .normalizeEmail(),
  body("password")
    .trim()
    .isLength({ min: 5 }),
  body("name")
    .trim()
    .not()
    .isEmpty()
], signup);

router.post("/login", login)

export default router;
