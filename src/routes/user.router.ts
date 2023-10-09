import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.findAll);

router.get(
  "/:id",
  commonMiddleware.isIdValid("id"),
  userMiddleware.findById,
  userController.findById,
);

router.post(
  "/",
  commonMiddleware.isBodyValid(UserValidator.create),
  userController.create,
);

router.put(
  "/:id",
  commonMiddleware.isIdValid("id"),
  commonMiddleware.isBodyValid(UserValidator.update),
  userMiddleware.findByIdAndUpdate,
  userController.findByIdAndUpdate,
);

router.delete(
  "/:id",
  commonMiddleware.isIdValid("id"),
  userMiddleware.findByIdAndDelete,
  userController.findByIdAndDelete,
);

export const userRouter = router;
