import { Request, Response } from "express";
import {
  TListMoviesResponse,
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
  const movieData: TMovieRequest = res.locals.data;

  const newMovie = await createMovieService(movieData);

  return res.status(201).json(newMovie);
};

const listMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const page: number = Number(req.query.page);
  const perPage: number = Number(req.query.perPage);
  const sort: any = req.query.sort;
  const order: any = req.query.order;

  const movies: TMoviesPagination = await listMoviesService(
    page,
    perPage,
    sort,
    order
  );

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

  return res.status(204);
};

export {
  createMovieController,
  listMoviesController,
  updateMovieController,
  deleteMovieController,
};
