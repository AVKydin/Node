import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";

class CommonMiddleware {
  public isIdValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      if (!isObjectIdOrHexString(userId)) {
        throw new ApiError("Id not valid", 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isMongoIdValid() {}
}

export const commonMiddleware = new CommonMiddleware();
