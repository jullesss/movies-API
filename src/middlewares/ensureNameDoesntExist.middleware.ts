import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const ensureNameDoesntExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  if (req.body.name) {
    const findMovieName: Movie | null = await movieRepository.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (findMovieName) {
      throw new AppError("Movie already exists.", 409);
    }
  }

  return next();

  /* if (req.method === "PATCH" || "DELETE") {
    const findMovie: Movie | null = await movieRepository.findOne({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!findMovie) {
      throw new AppError("Movie not found", 404);
    }
  }

  const findMovieName: Movie | null = await movieRepository.findOne({
    where: {
      name: req.body.name,
    },
  });

  if (findMovieName) {
    throw new AppError("Movie already exists.", 409);
  }

  return next(); */
};

export default ensureNameDoesntExist;
