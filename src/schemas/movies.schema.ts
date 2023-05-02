import { z } from "zod";

const movieSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  duration: z.number().int().positive(),
  price: z.number().int().positive(),
});

const movieSchemaRequest = movieSchema.omit({ id: true });

const updateSchemaRequest = movieSchema.partial();

const listMoviesSchemaResponse = z.array(movieSchema);

export {
  movieSchema,
  movieSchemaRequest,
  listMoviesSchemaResponse,
  updateSchemaRequest,
};