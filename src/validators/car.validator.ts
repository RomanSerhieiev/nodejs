import Joi from "joi";

import { EConditions } from "../enums/condition";

export class CarValidator {
  static price = Joi.number().min(0);
  static year = Joi.number().min(1885).max(2023);
  static condition = Joi.valid(...Object.values(EConditions));
  static brand = Joi.string().trim();
  static model = Joi.string().trim();

  static create = Joi.object({
    price: this.price.required(),
    year: this.year.required(),
    condition: this.condition.required(),
    brand: this.brand.required(),
    model: this.model.required(),
  });

  static update = Joi.object({
    price: this.price,
    year: this.year,
    condition: this.condition,
  });
}
