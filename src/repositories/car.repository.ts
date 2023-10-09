import { ICar } from "../interfaces/car.interface";
import { Car } from "../models/Car.model";

class CarRepository {
  async findAll(): Promise<ICar[]> {
    try {
      return await Car.find();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findById(id: string): Promise<ICar> {
    try {
      return await Car.findById(id);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async create(value: any) {
    try {
      return await Car.create(value);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findByIdAndUpdate(id: string, value: any) {
    try {
      return await Car.findByIdAndUpdate(id, value, {
        returnDocument: "after",
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findByIdAndDelete(id: string) {
    try {
      return await Car.findByIdAndDelete(id);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export const carRepository = new CarRepository();
