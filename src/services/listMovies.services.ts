import { Repository } from "typeorm";
import { TMoviesPagination } from "../interfaces/movies.interfaces";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";

const listMoviesService = async (req: any): Promise<TMoviesPagination> => {
  const moviesRepository: Repository<Movie> =
    AppDataSource.getRepository(Movie);

  let page: number = Number(req.page);
  let perPage: number = Number(req.perPage);
  let sort: string = req.sort;
  let order: string = req.order === "desc" ? req.order.toUpperCase() : "ASC";

  if (perPage < 1 || perPage > 5 || isNaN(perPage)) {
    perPage = 5;
  }

  if (page < 1 || isNaN(page)) {
    page = 1;
  }

  if (sort !== "price" && sort !== "duration") {
    (sort = "id"), (order = "ASC");
  }

  const [movies, count] = await moviesRepository.findAndCount({
    skip: (page - 1) * perPage,
    take: perPage,
    order: {
      [sort]: order,
    },
  });

  const nextPage =
    count - (page - 1) * perPage <= perPage
      ? null
      : `http://localhost:3000/movies?page=${page + 1}&perPage=${perPage}`;
  const prevPage =
    page <= 1
      ? null
      : `http://localhost:3000/movies?page=${page - 1}&perPage=${perPage}`;

  return {
    prevPage,
    nextPage,
    count,
    data: movies,
  };
};

export default listMoviesService;
