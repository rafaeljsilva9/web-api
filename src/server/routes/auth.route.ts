import { compare as bcryptedCompare } from 'bcryptjs';
import express, { Request } from "express";
import jwt from 'jsonwebtoken';
import { SECRET_KEY, users } from "../database";

const routes = express.Router();

routes.post('/login', async (req: Request<{}, {}, { username: string, password: string }>, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);

  if (user && (user.username === username && (await bcryptedCompare(password, user.password)))) {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

export default routes;
