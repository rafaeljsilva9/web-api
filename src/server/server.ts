import express, { NextFunction, Request, Response } from "express";
import { json, urlencoded } from "body-parser";
import { CorsMiddleware } from "./application/api/middlewares/cors-middleware";
import routes from './application/api/routes/routes';

const APP_PORT = 3000;
const app = express();

app.listen(APP_PORT, async () => {
  console.log(`Express App Listening on Port ${APP_PORT}`);
});
app.use(json());
app.use(urlencoded({ extended: true }));
app.use((req: Request, res: Response, next: NextFunction) => new CorsMiddleware().use(req, res, next));
app.get("/", (req, res) => res.send("Express on Vercel"));
app.use(routes);


app.all("*", (req, res) => {
  res.status(404).json({ error: "Resource not found" });
});

export default app;