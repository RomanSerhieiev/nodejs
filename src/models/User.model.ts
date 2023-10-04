import { model, Schema } from "mongoose";

import { EGenders } from "../enums/genders.enum";

export const User = model(
  "user",
  new Schema(
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
