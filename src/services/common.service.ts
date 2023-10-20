import { Model } from "mongoose";

import { commonRepository } from "../repositories/common.repository";

class CommonService {
  async findAll<T>(model: Model<T>): Promise<T[]> {
    try {
      return await commonRepository.findAll<T>(model);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findById<T>(model: Model<T>, id: string): Promise<T> {
    try {
      return await commonRepository.findById<T>(model, id);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async create<T>(model: Model<T>, value: T): Promise<T> {
    try {
      return await commonRepository.create(model, value);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findByIdAndUpdate<T>(
    model: Model<T>,
    id: string,
    value: Partial<T>,
  ): Promise<T> {
    try {
      return await commonRepository.findByIdAndUpdate<T>(model, id, value);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findByIdAndDelete<T>(model: Model<T>, id: string): Promise<T> {
    try {
      return await commonRepository.findByIdAndDelete<T>(model, id);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export const commonService = new CommonService();
