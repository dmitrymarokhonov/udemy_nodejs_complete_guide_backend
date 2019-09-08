import express from 'express';
import checkAPIs from 'express-validator';
import isAuth from '../middleware/is-auth';

import User from '../models/user';
import { signup, login, getUserStatus, updateUserStatus } from '../controllers/auth';

const { body } = checkAPIs;

const router = express.Router();

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter the valid email')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-mail address already exists.');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 }),
    body('name')
      .trim()
      .not()
      .isEmpty()
  ],
  signup
);

// router.get('/set', setCookie);
// router.get('/get', getCookie);
router.post('/login', login);

router.get('/status', isAuth, getUserStatus);

router.patch(
  '/status',
  isAuth,
  [
    body('status')
      .trim()
      .not()
      .isEmpty()
  ],
  updateUserStatus
);

export default router;
