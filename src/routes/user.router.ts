import { Router } from "express";

import { commonController } from "../controllers/common.controller";
import { IUser } from "../interfaces/user.interface";
import { commonMiddleware } from "../middlewares/common.middleware";
import { User } from "../models/User.model";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", commonController.findAll<IUser>(User));

router.get(
  "/:id",
  commonMiddleware.isIdValid("id"),
  commonMiddleware.findById<IUser>(User),
  commonController.findById<IUser>,
);

router.post(
  "/",
  commonMiddleware.isBodyValid(UserValidator.create),
  commonController.create<IUser>(User),
);

router.put(
  "/:id",
  commonMiddleware.isIdValid("id"),
  commonMiddleware.isBodyValid(UserValidator.update),
  commonMiddleware.updateById<IUser>(User),
  commonController.findByIdAndUpdate,
);

router.delete(
  "/:id",
  commonMiddleware.isIdValid("id"),
  commonMiddleware.deleteById<IUser>(User),
  commonController.findByIdAndDelete,
);

export const userRouter = router;
