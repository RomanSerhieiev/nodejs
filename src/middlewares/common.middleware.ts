import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import mongoose from "mongoose";

import { ApiError } from "../errors/api.error";

class CommonMiddleware {
  isIdValid(field: string) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const id = req.params[field];
        if (!mongoose.isObjectIdOrHexString(id)) {
          throw new ApiError("Not valid ID", 400);
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }

  isBodyValid(Validator: ObjectSchema) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const { error, value } = Validator.validate(req.body);
        if (error) {
          throw new ApiError(error.message, 400);
        }

        req.body = value;

        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
