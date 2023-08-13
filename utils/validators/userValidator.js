import { Joi, celebrate } from 'celebrate';
// import { REGEX_URL } from '../variables.js';

// const validateUserId = celebrate({
//   params: Joi.object().keys({
//     id: Joi.string().required().hex().length(24),
//   }),
// });

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateRegister = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

export {
  validateUser,
  validateLogin,
  validateRegister,
};
