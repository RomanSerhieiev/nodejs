import { Router } from "express";

import { carController } from "../controllers/car.controller";
import { carMiddleware } from "../middlewares/car.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();

router.get("", carController.findAll);

router.get(
  "/:id",
  commonMiddleware.checkId,
  carMiddleware.findByIdOrTrow,
  carController.findById,
);

router.post("", carMiddleware.createValidate, carController.create);

router.put(
  "/:id",
  commonMiddleware.checkId,
  carMiddleware.updateValidate,
  carMiddleware.findByIdAndUpdateOrTrow,
  carController.findByIdAndUpdate,
);

router.delete(
  "/:id",
  commonMiddleware.checkId,
  carMiddleware.findByIdAndDeleteOrTrow,
  carController.findByIdAndDelete,
);

export const carRouter = router;
