import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import UnauthorizedError from '../utils/errors/UnauthorizedError.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, 'Минимальная длина поля "name" - 2'],
    maxLength: [30, 'Максимальная длина поля "name" - 30'],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный Email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

const checkData = (data) => {
  if (!data) throw new UnauthorizedError('Неправильные почта или пароль');
};

userSchema.statics.findUserByCredentials = function ChekAuth(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      checkData(user);

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          checkData(matched);

          return user;
        });
    });
};

const User = mongoose.model('user', userSchema);

export default User;
