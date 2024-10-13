import { compare as bcryptedCompare } from "bcryptjs";
import express, { Request } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY, users } from "../database";
import { hashPassword } from '../utils';

const routes = express.Router();

routes.post(
  "/signup",
  async (req: Request<{}, {}, { username: string; password: string }>, res) => {
    const { username, password } = req.body;

    if (username && username.length > 5 && password && password.length > 5) {
      const user = users.find((user) => user.username === username);

      if (user) {
        res.status(409).json({ message: "username alredy in use" });
      } else {
        users.push({ username, password: hashPassword(password)});
        res.status(200).send();
      }
    } else {
      res
        .status(400)
        .json({
          message:
            "username and password must no be null and must have at least 5 characters ",
        });
    }
  }
);

routes.post(
  "/login",
  async (req: Request<{}, {}, { username: string; password: string }>, res) => {
    const { username, password } = req.body;

    const user = users.find((user) => user.username === username);

    if (
      user &&
      user.username === username &&
      (await bcryptedCompare(password, user.password))
    ) {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
      return res.json({ token });
    }

    return res.status(401).json({ message: "Invalid credentials" });
  }
);

export default routes;
