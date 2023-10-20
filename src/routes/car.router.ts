import { Router } from "express";

import { commonController } from "../controllers/common.controller";
import { ICar } from "../interfaces/car.interface";
import { commonMiddleware } from "../middlewares/common.middleware";
import { Car } from "../models/Car.model";
import { CarValidator } from "../validators/car.validator";

const router = Router();

router.get("/", commonController.findAll<ICar>(Car));

router.get(
  "/:id",
  commonMiddleware.isIdValid("id"),
  commonMiddleware.findById<ICar>(Car),
  commonController.findById<ICar>,
);

router.post(
  "/",
  commonMiddleware.isBodyValid(CarValidator.create),
  commonController.create<ICar>(Car),
);

router.put(
  "/:id",
  commonMiddleware.isIdValid("id"),
  commonMiddleware.isBodyValid(CarValidator.update),
  commonMiddleware.updateById<ICar>(Car),
  commonController.findByIdAndUpdate,
);

router.delete(
  "/:id",
  commonMiddleware.isIdValid("id"),
  commonMiddleware.deleteById<ICar>(Car),
  commonController.findByIdAndDelete,
);

export const carRouter = router;
