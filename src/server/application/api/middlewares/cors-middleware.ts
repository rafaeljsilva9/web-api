import { NextFunction, Request, Response } from "express";
import { constants } from '../../utils/constants';

export class CorsMiddleware {
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", constants.ALLOW_DOMAINS);
    res.setHeader("Access-Control-Allow-Methods", constants.ALLOW_METHODS);
    res.setHeader("Access-Control-Allow-Headers", constants.ALLOW_HEADERS);
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", "true");
    // Pass to next layer of middleware
    next();
  }
}
