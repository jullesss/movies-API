import { Repository } from "typeorm";
import {
  TListMoviesResponse,
  TMovie,
  TMoviesPagination,
} from "../interfaces/movies.interfaces";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { listMoviesSchemaResponse } from "../schemas/movies.schema";
import { Request } from "express";

const listMoviesService = async (req: Request): Promise<TMoviesPagination> => {
  const moviesRepository: Repository<Movie> =
    AppDataSource.getRepository(Movie);

  let page: number = Number(req.query.page);
  let perPage: number = Number(req.query.perPage) || 5;
  let sort: any = req.query.sort;
  let order: any =
    req.query.order === "desc" ? req.query.order.toUpperCase() : "ASC";

  let movies: Movie[] | undefined;

  if (perPage < 0 || perPage > 5) {
    perPage = 5;
  }

  if (page < 1 || page < 0) {
    page = 1;
  }

  if (sort !== "price" && sort !== "duration") {
    (sort = "id"), (order = "ASC");
  }

  console.log(order);
  /*   if (!page || !perPage) {
    movies = await moviesRepository.find();
  } else { */
  movies = await moviesRepository.find({
    skip: (page - 1) * perPage,
    take: perPage,
    order: {
      [sort]: order,
    },
  });

  const returnMovies: TListMoviesResponse =
    listMoviesSchemaResponse.parse(movies);

  let prevPage: number | null = page - 1;
  let nextPage: number | null = page + 1;
  const count = returnMovies.length;

  if (nextPage > count / perPage) {
    nextPage = null;
  }
  if (prevPage < 1) {
    prevPage = null;
  }

  return {
    prevPage: `http://localhost:3000/movies?page=${prevPage}&perPage=${perPage}`,
    nextPage: `http://localhost:3000/movies?page=${nextPage}&perPage=${perPage}`,
    count,
    data: returnMovies,
  };
};

export default listMoviesService;
