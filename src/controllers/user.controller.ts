import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { userService } from "../services/user.service";
import { TRes } from "../types/res.type";

class UserController {
  async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): TRes<IUser[]> {
    try {
      const users = await userService.findAll();

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): TRes<IUser> {
    try {
      const user = res.locals;

      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.create(req.body);

      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async findByIdAndUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json("User updated successfully");
    } catch (e) {
      next(e);
    }
  }

  async findByIdAndDelete(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json("User deleted successfully");
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
