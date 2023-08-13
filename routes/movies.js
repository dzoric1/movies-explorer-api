import express from 'express';
import {
  saveMovieToFavorites,
  getFavoritesMovies,
  deleteMovieFromFavorites,
} from '../controllers/movies.js';
import {
  validateMovie,
  validateDeleteMovie,
} from '../utils/validators/movieValidator.js';

const moviesRouter = express.Router();

moviesRouter.get('/', getFavoritesMovies);
moviesRouter.post('/', validateMovie, saveMovieToFavorites);
moviesRouter.delete('/:_id', validateDeleteMovie, deleteMovieFromFavorites);

export default moviesRouter;
