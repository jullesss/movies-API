import { z } from "zod";
import {
  listMoviesSchemaResponse,
  movieSchema,
  movieSchemaRequest,
} from "../schemas/movies.schema";
import { DeepPartial } from "typeorm";

type TMovie = z.infer<typeof movieSchema>;

type TMovieRequest = z.infer<typeof movieSchemaRequest>;

type TListMoviesResponse = z.infer<typeof listMoviesSchemaResponse>;

type TUpdateMovieRequest = DeepPartial<TMovieRequest>;

type TMoviesPagination = {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: TListMoviesResponse;
};

export {
  TMovie,
  TMovieRequest,
  TListMoviesResponse,
  TMoviesPagination,
  TUpdateMovieRequest,
};
