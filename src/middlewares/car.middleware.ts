import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { carService } from "../services/car.service";
import { CarValidator } from "../validators/car.validator";

class CarMiddleware {
  async findByIdOrTrow(req: Request, res: Response, next: NextFunction) {
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

  async findByIdAndUpdateOrTrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const value = res.locals;

      const car = await carService.findByIdAndUpdate(id, value);
      if (!car) {
        throw new ApiError("Car not found", 404);
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

      const car = await carService.findByIdAndDelete(id);
      if (!car) {
        throw new ApiError("Car not found", 404);
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  async createValidate(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = CarValidator.create.validate(req.body);
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
      const { error, value } = CarValidator.update.validate(req.body);
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

export const carMiddleware = new CarMiddleware();
