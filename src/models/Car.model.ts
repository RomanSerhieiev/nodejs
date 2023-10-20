import { Model, model, Schema } from "mongoose";

import { EConditions } from "../enums/condition.enum";
import { ICar } from "../interfaces/car.interface";

export const Car: Model<ICar> = model(
  "car",
  new Schema<ICar>(
    {
      price: {
        type: Number,
        min: [0, "Minimum age is 0"],
      },
      year: {
        type: Number,
        min: [1885, "Minimum age is 1885"],
        max: [2023, "Maximum age is 2023"],
      },
      condition: {
        type: String,
        enum: EConditions,
      },
      brand: {
        type: String,
        required: true,
        trim: true,
      },
      model: {
        type: String,
        required: true,
        trim: true,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  ),
);
