import Joi from "joi";

import { regexConstant } from "../constants/regex.constant";
import { EGenders } from "../enums/genders.enum";

export class UserValidator {
  static firstName = Joi.string().min(2).max(50).trim();
  static age = Joi.number().min(18).max(150);
  static gender = Joi.valid(...Object.values(EGenders));
  static email = Joi.string().regex(regexConstant.EMAIL).trim();
  static password = Joi.string().regex(regexConstant.PASSWORD).trim();

  static create = Joi.object({
    name: this.firstName.required(),
    age: this.age.required(),
    gender: this.gender.required(),
    email: this.email.required(),
    password: this.password.required(),
  });

  static update = Joi.object({
    name: this.firstName,
    age: this.age,
    gender: this.gender,
  });
}
