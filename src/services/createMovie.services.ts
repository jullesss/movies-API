import { Repository } from "typeorm";
import { Movie } from "../entities";
import { TMovie, TMovieRequest } from "../interfaces/movies.interfaces";
import { AppDataSource } from "../data-source";
import { movieSchema } from "../schemas/movies.schema";

const createMovieService = async (
  movieData: TMovieRequest
): Promise<TMovie> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie = movieRepository.create(movieData);

  await movieRepository.save(movie);

  const returnMovie: TMovie = movieSchema.parse(movie);

  return returnMovie;
};

export default createMovieService;
