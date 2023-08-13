import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../utils/config.js';
import User from '../models/user.js';
import BadRequestError from '../utils/errors/BadRequestError.js';
import NotFoundError from '../utils/errors/NotFoundError.js';
import ConflictError from '../utils/errors/ConflictError.js';

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then(({ name, email }) => res.status(201).send({ name, email }))
    .catch((error) => {
      if (error.code === 11000) return next(new ConflictError('Данный email занят'));
      if (error.name === 'ValidationError') return next(new BadRequestError('Переданные данные не валидны'));
      next(error);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SECRET_KEY,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 24 * 3600000,
        sameSite: true,
        httpOnly: true,
      });
      res.send({ message: 'Вход выполнен успешно' });
    })
    .catch((error) => {
      next(error);
    });
};

const signout = (req, res) => {
  res.clearCookie('jwt', {
    maxAge: 24 * 3600000,
    sameSite: true,
    httpOnly: true,
  });
  res.send({ message: 'Выход выполнен успешно' });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') return next(new BadRequestError('Переданные данные не валидны'));
      next(error);
    });
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )
    .then((updatedUser) => res.send(updatedUser))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Переданные данные не валидны'));
      } else {
        next(error);
      }
    });
};

export {
  createUser,
  login,
  signout,
  getCurrentUser,
  updateUser,
};
