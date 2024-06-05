import { Request, Response, NextFunction } from "express";

/** Should be stored in a safe place */ 
const API_KEY = "110ec58a-a0f2-4ac4-8393-c866d813b8d1";

const checkApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.header("x-api-key");

  if (!apiKey) {
    return res.status(401).json({ message: "Missing mandatory api key" });
  }

  if (apiKey !== API_KEY) {
    return res.status(403).json({ message: "Invalid api key" });
  }

  next();
};

export default checkApiKey;
