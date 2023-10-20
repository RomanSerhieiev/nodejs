import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import mongoose, { Model } from "mongoose";

import { ApiError } from "../errors/api.error";
import { commonService } from "../services/common.service";

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

  findById<T>(model: Model<T>) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const { id } = req.params;

        const item = await commonService.findById<T>(model, id);
        if (!item) {
          throw new ApiError("Item not found", 404);
        }

        res.locals = item;
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  updateById<T>(model: Model<T>) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const { id } = req.params;

        const item = await commonService.findByIdAndUpdate<T>(
          model,
          id,
          req.body,
        );
        if (!item) {
          throw new ApiError("Item not found", 404);
        }

        res.locals = item;
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  deleteById<T>(model: Model<T>) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const { id } = req.params;

        const item = await commonService.findByIdAndDelete<T>(model, id);
        if (!item) {
          throw new ApiError("Item not found", 404);
        }

        res.locals = item;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
