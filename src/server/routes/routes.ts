import { json, urlencoded } from "body-parser";
import express from "express";
import path from "path";
import moviesRoutes from "./movies.route";
import pagesRoutes from "./pages.route";
import authRoutes from "./auth.route";
import checkApiKey from "../middlewares/api-key";
import checkToken from "../middlewares/authenticate";
import { AthenticationType } from "../utils";

const app = express();
const authenticationType: AthenticationType = AthenticationType.Token;

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../../client")));

/** Routes */
app.use(
  "/api/movies",
  (req, res, next) => {
    if (
      authenticationType === (AthenticationType.ApiKey as AthenticationType)
    ) {
      return checkApiKey(req, res, next);
    } else if (
      authenticationType === (AthenticationType.Token as AthenticationType)
    ) {
      return checkToken(req, res, next);
    }
    return next();
  },
  moviesRoutes
);
app.use("/pages", pagesRoutes);
app.use("/api/auth", authRoutes);

export default app;
