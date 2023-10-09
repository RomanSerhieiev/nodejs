import { NextFunction, Request, Response } from "express";

import { ICar } from "../interfaces/car.interface";
import { carService } from "../services/car.service";
import { TRes } from "../types/res.type";

class CarController {
  async findAll(req: Request, res: Response, next: NextFunction): TRes<ICar[]> {
    try {
      const cars = await carService.findAll();

      return res.json(cars);
    } catch (e) {
      next(e);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): TRes<ICar> {
    try {
      const car = res.locals;

      return res.json(car);
    } catch (e) {
      next(e);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): TRes<any> {
    try {
      const car = await carService.create(req.body);

      return res.json(car);
    } catch (e) {
      next(e);
    }
  }

  async findByIdAndUpdate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): TRes<ICar> {
    try {
      const car = res.locals;

      return res.json(car);
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
      const car = res.locals;

      res.json(car);
    } catch (e) {
      next(e);
    }
  }
}

export const carController = new CarController();
