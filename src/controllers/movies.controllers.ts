import { Request, Response } from "express";
import {
  TMovieRequest,
  TMoviesPagination,
  TUpdateMovieRequest,
} from "../interfaces/movies.interfaces";
import createMovieService from "../services/createMovie.services";
import listMoviesService from "../services/listMovies.services";
import updateMovieService from "../services/updateMovie.services";
import deleteMovieService from "../services/deleteMovie.services";

const createMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieData: TMovieRequest = req.body;

  const newMovie = await createMovieService(movieData);

  return res.status(201).json(newMovie);
};

const listMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movies: TMoviesPagination = await listMoviesService(req.query);

  return res.status(200).json(movies);
};

const updateMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieData: TUpdateMovieRequest = res.locals.data;
  const movieId: number = Number(req.params.id);
  const newMovie = await updateMovieService(movieData, movieId);

  return res.status(200).json(newMovie);
};

const deleteMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieId: number = Number(req.params.id);
  await deleteMovieService(movieId);

  return res.status(204).send();
};

export {
  createMovieController,
  listMoviesController,
  updateMovieController,
  deleteMovieController,
};
