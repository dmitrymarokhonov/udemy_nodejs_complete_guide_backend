/* eslint-disable no-underscore-dangle */
import checkAPIs from 'express-validator';
import bcrypt from 'bcryptjs';
import jsonWebToken from 'jsonwebtoken';
import User from '../models/user';

const { validationResult } = checkAPIs;

export const jwtTokenSecret = 'YHDs~44N:?!bLzH5';

export const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const { email } = req.body;
  const { name } = req.body;
  const { password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashedPassword,
      name
    });
    const mongoNewUser = await user.save();
    res.status(201).json({ message: 'User created!', userId: mongoNewUser._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next();
  }
};

export const login = async (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;
  try {
    const loadedUser = await User.findOne({ email });
    if (!loadedUser) {
      const error = new Error('A user wuth this email cannot be found.');
      error.statusCode = 401;
      throw error;
    }
    if (!(await bcrypt.compare(password, loadedUser.password))) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    const token = jsonWebToken.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString()
      },
      jwtTokenSecret,
      { expiresIn: '1h' }
    );

    console.log(token);
    res.status(200).json({ token, userId: loadedUser._id.toString() });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next();
  }
};

export const getUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId.userId);
    if (!user) {
      const error = new Error('Use not found.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ status: user.status });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next();
  }
};

export const updateUserStatus = async (req, res, next) => {
  const newStatus = req.body.status;
  try {
    const user = await User.findById(req.userId.userId);
    if (!user) {
      const error = new Error('Use not found.');
      error.statusCode = 404;
      throw error;
    }
    user.status = newStatus;
    await user.save();

    res.status(200).json({ message: 'User updated.' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next();
  }
};
