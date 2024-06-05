import { json, urlencoded } from "body-parser";
import express from "express";
import path from "path";
import moviesRoutes from './movies.route';
import pagesRoutes from './pages.route';

const app = express();

/** Middleware to parse JSON */
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../../client')));

/** Routes */

app.use('/api/movies', moviesRoutes);
app.use('/pages/movies', pagesRoutes);

export default app;
