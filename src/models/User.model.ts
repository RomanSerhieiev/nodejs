import { Model, model, Schema } from "mongoose";

import { EGenders } from "../enums/genders.enum";
import { IUser } from "../interfaces/user.interface";

export const User: Model<IUser> = model(
  "user",
  new Schema<IUser>(
    {
      name: {
        type: String,
      },
      age: {
        type: Number,
        min: [0, "Minimum age is 0"],
        max: [199, "Maximum age is 199"],
      },
      gender: {
        type: String,
        enum: EGenders,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  ),
);
