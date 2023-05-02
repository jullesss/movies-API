import { Repository } from "typeorm";
import {
  TListMoviesResponse,
  TMovie,
  TMoviesPagination,
} from "../interfaces/movies.interfaces";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { listMoviesSchemaResponse } from "../schemas/movies.schema";

const listMoviesService = async (
  page: number,
  perPage: number,
  sort: any,
  order: any
): Promise<TMoviesPagination> => {
  const moviesRepository: Repository<Movie> =
    AppDataSource.getRepository(Movie);

  let movies: Movie[] | undefined;

  if (perPage < 0 || perPage > 5) {
    perPage = 5;
  }

  if (page < 0) {
    page = 1;
  }

  let sortBy = sort;
  let orderObj = {};

  if (sortBy === "price") {
    orderObj = {
      price: order,
    };
  } else if (sortBy === "duration") {
    orderObj = {
      duration: order,
    };
  }

  if (!page || !perPage) {
    movies = await moviesRepository.find();
  } else {
    movies = await moviesRepository.find({
      skip: (page - 1) * perPage,
      take: perPage,
      order: orderObj || "asc",
    });
  }

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
