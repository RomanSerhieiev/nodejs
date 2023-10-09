import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { carService } from "../services/car.service";

class CarMiddleware {
  async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      const car = await carService.findById(id);
      if (!car) {
        throw new ApiError("Car not found", 404);
      }

      res.locals = car;

      next();
    } catch (e) {
      next(e);
    }
  }

  async findByIdAndUpdate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      const car = await carService.findByIdAndUpdate(id, req.body);
      if (!car) {
        throw new ApiError("Car not found", 404);
      }

      res.locals = car;

      next();
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
      const { id } = req.params;

      const car = await carService.findByIdAndDelete(id);
      if (!car) {
        throw new ApiError("Car not found", 404);
      }

      res.locals = car;

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const carMiddleware = new CarMiddleware();
