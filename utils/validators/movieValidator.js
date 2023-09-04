import { celebrate, Joi } from 'celebrate';
import { REGEX_URL } from '../variables.js';

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri().pattern(REGEX_URL),
    trailerLink: Joi.string().required().uri().pattern(REGEX_URL),
    thumbnail: Joi.string().required().uri().pattern(REGEX_URL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

export {
  validateMovie,
  validateDeleteMovie,
};
