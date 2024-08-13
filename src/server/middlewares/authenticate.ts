import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../database";

/** Should be stored in a safe place */
const API_KEY = "110ec58a-a0f2-4ac4-8393-c866d813b8d1";

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    (req as any).user = user;
    next();
  });
};

export default checkToken;
