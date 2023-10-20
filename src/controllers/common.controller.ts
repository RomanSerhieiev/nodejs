import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";

import { commonService } from "../services/common.service";
import { TRes } from "../types/res.type";

class CommonController {
  findAll<T>(model: Model<T>) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): TRes<T[]> => {
      try {
        return res.json(await commonService.findAll<T>(model));
      } catch (e) {
        next(e);
      }
    };
  }

  async findById<T>(req: Request, res: Response, next: NextFunction): TRes<T> {
    try {
      return res.json(res.locals);
    } catch (e) {
      next(e);
    }
  }

  create<T>(model: Model<T>) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        res.status(201).json(await commonService.create<T>(model, req.body));
      } catch (e) {
        next(e);
      }
    };
  }

  async findByIdAndUpdate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      res.status(201).json(res.locals);
    } catch (e) {
      next(e);
    }
  }

  async findByIdAndDelete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      res.sendStatus(204).json(res.locals);
    } catch (e) {
      next(e);
    }
  }
}

export const commonController = new CommonController();
