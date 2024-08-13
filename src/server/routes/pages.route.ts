import express from "express";
import path from "path";

const routes = express.Router();

routes.get("/index", (req, res) => {
  const filePath = path.join(__dirname, "../../client/pages", "index.html");
  res.status(200).sendFile(filePath);
});

routes.get("/movies", (req, res) => {
  const filePath = path.join(__dirname, "../../client/pages", "movies.html");
  res.status(200).sendFile(filePath);
});

routes.all("*", (req, res) => {
  const filePath = path.join(__dirname, "../../resources", "not-found.html");
  res.status(404).sendFile(filePath);
});

export default routes;
