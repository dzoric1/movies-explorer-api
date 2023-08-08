import dotenv from 'dotenv';

dotenv.config();

const { PORT = 3000 } = process.env;
const { DB_URI = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { NODE_ENV = 'development' } = process.env;
const { JWT_SECRET_KEY } = process.env;

const SECRET_KEY = NODE_ENV === 'development' ? 'secret-key' : JWT_SECRET_KEY;

export {
  PORT,
  DB_URI,
  SECRET_KEY,
  NODE_ENV,
};
