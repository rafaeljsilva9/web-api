import { json, urlencoded } from "body-parser";
import express from "express";
import path from "path";
import moviesRoutes from './movies.route';
import pagesRoutes from './pages.route';
import authRoutes from './auth.route';
import checkApiKey from "../middlewares/api-key";
import checkToken from "../middlewares/authenticate";

const app = express();

/** Middleware to parse JSON */
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../../client')));

/** Routes */
app.use('/api/movies', checkApiKey, checkToken, moviesRoutes);
app.use('/pages', pagesRoutes);
app.use('/api/auth', authRoutes);

export default app;
