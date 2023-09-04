import express from 'express';
import {
  updateUser,
  getCurrentUser,
} from '../controllers/users.js';

import {
  validateUser,
} from '../utils/validators/userValidator.js';

const usersRouter = express.Router();

usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', validateUser, updateUser);

export default usersRouter;
