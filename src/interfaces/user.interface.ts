import { Document } from "mongoose";

import { EGenders } from "../enums/genders.enum";

export interface IUser extends Document {
  name?: string;
  age?: number;
  gender?: EGenders;
  email: string;
  password: string;
}
