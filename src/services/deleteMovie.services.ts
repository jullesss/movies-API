import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";

const deleteMovieService = async (movieId: number): Promise<void> => {
  const moviesRepository: Repository<Movie> =
    AppDataSource.getRepository(Movie);

  const toBeDeleted: Movie | null = await moviesRepository.findOneBy({
    id: movieId,
  });
};

export default deleteMovieService;
