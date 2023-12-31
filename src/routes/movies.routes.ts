import { Router } from "express";
import {
  createMovieController,
  deleteMovieController,
  listMoviesController,
  updateMovieController,
} from "../controllers/movies.controllers";
import {
  movieSchemaRequest,
  updateSchemaRequest,
} from "../schemas/movies.schema";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureNameDoesntExist from "../middlewares/ensureNameDoesntExist.middleware";
import ensureIdExists from "../middlewares/ensureIdExists.middleware";

const moviesRoutes: Router = Router();

moviesRoutes.post(
  "",
  ensureDataIsValidMiddleware(movieSchemaRequest),
  ensureNameDoesntExist,
  createMovieController
);

moviesRoutes.get("", listMoviesController);

moviesRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(updateSchemaRequest),
  ensureIdExists,
  ensureNameDoesntExist,
  updateMovieController
);

moviesRoutes.delete("/:id", ensureIdExists, deleteMovieController);

export default moviesRoutes;
