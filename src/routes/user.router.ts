import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();

router.get("", userController.findAll);

router.get(
  "/:id",
  commonMiddleware.checkId,
  userMiddleware.findByIdOrTrow,
  userController.findById,
);

router.post("", userMiddleware.createValidate, userController.create);

router.put(
  "/:id",
  commonMiddleware.checkId,
  userMiddleware.updateValidate,
  userMiddleware.findByIdAndUpdateOrTrow,
  userController.findByIdAndUpdate,
);

router.delete(
  "/:id",
  commonMiddleware.checkId,
  userMiddleware.findByIdAndDeleteOrTrow,
  userController.findByIdAndDelete,
);

export const userRouter = router;
