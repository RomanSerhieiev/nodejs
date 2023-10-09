import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { userService } from "../services/user.service";

class UserMiddleware {
  async findById(req: Request, res: Response, next: NextFunction) {
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

  async findByIdAndUpdate(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;

      const user = await userService.findByIdAndUpdate(id, req.body);
      if (!user) {
        throw new ApiError("User not found", 404);
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  async findByIdAndDelete(
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
}

export const userMiddleware = new UserMiddleware();
