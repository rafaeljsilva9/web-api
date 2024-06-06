import { json, urlencoded } from "body-parser";
import express from "express";
import path from "path";
import moviesRoutes from "./movies.route";
import pagesRoutes from "./pages.route";
import checkApiKey from "../middlewares/api-key";
import cors from "cors";

const app = express();

const corsOptions = {
  methods: ["GET", "POST", "PUT", "DELETE"],
  origin: 'http://127.0.0.1:5500',
};

app.use(cors(corsOptions));

/** Middleware to parse JSON */
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../../client")));

/** Routes */
app.use("/api/movies", checkApiKey, moviesRoutes);
app.use("/pages/movies", pagesRoutes);

export default app;
