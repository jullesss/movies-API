import { Repository } from "typeorm";
import { TMovie, TUpdateMovieRequest } from "../interfaces/movies.interfaces";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { movieSchema } from "../schemas/movies.schema";

const updateMovieService = async (
  movieData: TUpdateMovieRequest,
  movieId: number
): Promise<TMovie> => {
  const moviesRepository: Repository<Movie> =
    AppDataSource.getRepository(Movie);

  const oldMovieData: Movie | null = await moviesRepository.findOneBy({
    id: movieId,
  });

  const newMovieData: Movie = moviesRepository.create({
    ...oldMovieData,
    ...movieData,
  });

  await moviesRepository.save(newMovieData);

  const returnMovie: TMovie = movieSchema.parse(newMovieData);

  return returnMovie;
};

export default updateMovieService;
