import jwt from 'jsonwebtoken';
import UnauthorizedError from '../utils/errors/UnauthorizedError.js';
import { SECRET_KEY } from '../utils/config.js';

const auth = (req, res, next) => {
  const token = req.headers.jwt;
  let payload;

  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};

export default auth;
