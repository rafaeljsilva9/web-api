import express, { Request } from "express";
import path from "path";
import { generateUniqueIdentifier, orderBy } from "../utils";
import { movies } from "../database";

const routes = express.Router();

/** Response movies list*/
routes.get(
  "/",
  (req: Request<{}, {}, {}, { order: string }>, res, next) => {
    const { order } = req.query;

    if (order && order !== "asc" && order !== "desc") {
      return res
        .status(400)
        .json({ error: 'Invalid order value. Use "asc" or "desc".' });
    }

    next();
  },
  (req: Request<{}, {}, {}, { order: string }>, res) => {
    const { order } = req.query;

    if (order) {
      res.status(200).json(orderBy(movies, order));
    } else {
      res.status(200).json(movies);
    }
  }
);

/** Create a movie*/
routes.post("/", (req: Request<{}, {}, { name: string }>, res) => {
  const { name } = req.body;
  const newMovie = { id: generateUniqueIdentifier(), name };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

/** Update a movie*/
routes.put(
  "/:id",
  (req: Request<{ id: string }, {}, { name: string }, {}>, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (id) {
      const movie = movies.find((movie) => movie.id === id);

      if (movie) {
        movie.name = name;
        res.status(200).json(movie);
      } else {
        res
          .status(404)
          .json({ error: "The movie you want to update does not exist" });
      }
    } else {
      res.status(400).json({ error: "The query params `id` is mandatory" });
    }
  }
);

/** Delete a movie*/
routes.delete("/:id", (req: Request<{ id: string }>, res) => {
  const { id } = req.params;
  if (id) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex !== -1) {
      movies.splice(movieIndex, 1);
      res.status(200).send();
    } else {
      res
        .status(404)
        .json({ error: "The movie you want to delete does not exist" });
    }
  } else {
    res.status(400).json({ error: "The query params `id` is mandatory" });
  }
});

export default routes;
