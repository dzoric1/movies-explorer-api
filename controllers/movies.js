import Movie from '../models/movie.js';
import ForbiddenError from '../utils/errors/ForbiddenError.js';
import NotFoundError from '../utils/errors/NotFoundError.js';
import BadRequestError from '../utils/errors/BadRequestError.js';

const saveMovieToFavorites = (req, res, next) => {
  const data = req.body;
  const owner = req.user._id;

  Movie.create({ ...data, owner })
    .then((movie) => res.send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(error.message));
      } else {
        next(error);
      }
    });
};

const getFavoritesMovies = (req, res, next) => {
  const userId = req.user._id;

  Movie.find({ owner: userId }).populate('owner')
    .then((movies) => res.send(movies))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(error.message));
      } else {
        next(error);
      }
    });
};

const deleteMovieFromFavorites = (req, res, next) => {
  const { _id: movieId } = req.params;

  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFoundError('Фильм не найден');
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Удалять можно только свои фильмы!');
      }

      Movie.findByIdAndRemove(movieId)
        .then(() => {
          res.send({ message: 'Фильм удален' });
        })
        .catch((error) => next(error));
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Переданные данные не валидны'));
      } else {
        next(error);
      }
    });
};

export {
  saveMovieToFavorites,
  getFavoritesMovies,
  deleteMovieFromFavorites,
};
