import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { configs } from "./config/config";
import { ApiError } from "./errors/api.error";
import { carRouter } from "./routes/car.router";
import { userRouter } from "./routes/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/cars", carRouter);

app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).json(error.message);
});

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URI);
  // eslint-disable-next-line no-console
  console.log(`Server has successfully started on PORT ${configs.PORT}`);
});
