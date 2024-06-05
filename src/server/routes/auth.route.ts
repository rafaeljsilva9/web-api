import express, { Request } from "express";
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from "../database";

const routes = express.Router();

routes.post('/login', (req: Request<{}, {}, { username: string, password: string }>, res) => {
  const { username, password } = req.body;

  if (username === 'user' && password === 'password') {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      return res.json({ token });
  }

  return res.status(401).json({ message: 'Credenciais inválidas' });
});

export default routes;
