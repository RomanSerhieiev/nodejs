import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { userService } from "../services/user.service";
import { UserValidator } from "../validators/user.validator";

class UserMiddleware {
  async findByIdOrTrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await userService.findById(id);
      if (!user) {
        throw new ApiError("User not found", 404);
      }

      res.locals = user;

      next();
    } catch (e) {
      next(e);
    }
  }

  async findByIdAndUpdateOrTrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const value = res.locals;

      const user = await userService.findByIdAndUpdate(id, value);
      if (!user) {
        throw new ApiError("User not found", 404);
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  async findByIdAndDeleteOrTrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;

      const user = await userService.findByIdAndDelete(id);
      if (!user) {
        throw new ApiError("User not found", 404);
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  async createValidate(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = UserValidator.create.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }

      res.locals = value;

      next();
    } catch (e) {
      next(e);
    }
  }

  async updateValidate(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = UserValidator.update.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }

      res.locals = value;

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
