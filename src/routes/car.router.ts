import { Router } from "express";

import { carController } from "../controllers/car.controller";
import { carMiddleware } from "../middlewares/car.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { CarValidator } from "../validators/car.validator";

const router = Router();

router.get("/", carController.findAll);

router.get(
  "/:id",
  commonMiddleware.isIdValid("id"),
  carMiddleware.findById,
  carController.findById,
);

router.post(
  "/",
  commonMiddleware.isBodyValid(CarValidator.create),
  carController.create,
);

router.put(
  "/:id",
  commonMiddleware.isIdValid("id"),
  commonMiddleware.isBodyValid(CarValidator.update),
  carMiddleware.findByIdAndUpdate,
  carController.findByIdAndUpdate,
);

router.delete(
  "/:id",
  commonMiddleware.isIdValid("id"),
  carMiddleware.findByIdAndDelete,
  carController.findByIdAndDelete,
);

export const carRouter = router;
