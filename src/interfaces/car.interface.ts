import { Document } from "mongoose";

import { EConditions } from "../enums/condition";

export interface ICar extends Document {
  price?: number;
  year?: number;
  condition?: EConditions;
  brand: string;
  model: string;
}
