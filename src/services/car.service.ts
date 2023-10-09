import { ICar } from "../interfaces/car.interface";
import { carRepository } from "../repositories/car.repository";

class CarService {
  async findAll(): Promise<ICar[]> {
    try {
      return await carRepository.findAll();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findById(id: string): Promise<ICar> {
    try {
      return await carRepository.findById(id);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async create(value: any) {
    try {
      return await carRepository.create(value);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findByIdAndUpdate(id: string, value: any) {
    try {
      return await carRepository.findByIdAndUpdate(id, value);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findByIdAndDelete(id: string) {
    try {
      return await carRepository.findByIdAndDelete(id);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export const carService = new CarService();
