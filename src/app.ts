import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { configs } from "./config/config";
import { ApiError } from "./errors/api.error";
import { IUser } from "./interfaces/user.interface";
import { User } from "./models/User.model";
import { UserValidator } from "./validators/user.validator";

type TRes<T> = Promise<Response<T>>;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/users",
  async (req: Request, res: Response, next: NextFunction): TRes<IUser[]> => {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  },
);

app.get(
  "/users/:userId",
  async (req: Request, res: Response, next: NextFunction): TRes<IUser> => {
    try {
      const { userId } = req.params;
      if (!mongoose.isObjectIdOrHexString(userId)) {
        throw new ApiError("Not valid ID", 400);
      }
      const user = await User.findById(userId);
      if (!user) {
        throw new ApiError("User not found", 404);
      }
      return res.json(user);
    } catch (e) {
      next(e);
    }
  },
);

app.post("/users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = UserValidator.create.validate(req.body);
    if (error) {
      throw new ApiError(error.message, 400);
    }
    const createdUser = await User.create(value);
    res.status(201).json(createdUser);
  } catch (e) {
    next(e);
  }
});

app.put(
  "/users/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      if (!mongoose.isObjectIdOrHexString(userId)) {
        throw new ApiError("Not valid ID", 400);
      }
      const { error, value } = UserValidator.update.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      const user = await User.findByIdAndUpdate(userId, value, {
        returnDocument: "after",
      });
      if (!user) {
        throw new ApiError("User not found", 404);
      }
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  },
);

app.delete(
  "/users/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      if (!mongoose.isObjectIdOrHexString(userId)) {
        throw new ApiError("Not valid ID", 400);
      }
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        throw new ApiError("User not found", 404);
      }
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).json(error.message);
});

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URI);
  // eslint-disable-next-line no-console
  console.log(`Server has successfully started on PORT ${configs.PORT}`);
});
