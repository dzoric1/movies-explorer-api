import express from 'express';
// import usersRouter from './users.js';
// import moviesRouter from './movies.js';
import NotFoundError from '../utils/errors/UnauthorizedError.js';
import auth from '../middlewares/auth.js';
import {
  validateLogin,
  validateRegister,
} from '../utils/validators/userValidator.js';
import {
  createUser,
  login,
  signout,
} from '../controllers/users.js';

const router = express.Router();

router.post('/signup', validateRegister, createUser);

router.post('/signin', validateLogin, login);

router.post('/signout', auth, signout);

// router.use('/users', auth, usersRouter);

// router.use('/movies', auth, moviesRouter);

router.all('*', auth, (req, res, next) => {
  next(new NotFoundError('Запрашиваемый URL не найден'));
});

export default router;
