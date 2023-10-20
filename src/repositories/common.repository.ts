import { Model } from "mongoose";

class CommonRepository {
  async findAll<T>(model: Model<T>): Promise<T[]> {
    try {
      return await model.find();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findById<T>(model: Model<T>, id: string): Promise<T> {
    try {
      return await model.findById(id);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async create<T>(model: Model<T>, value: T): Promise<any> {
    try {
      return await model.create(value);
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
      return await model.findByIdAndUpdate(id, value, {
        returnDocument: "after",
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findByIdAndDelete<T>(model: Model<T>, id: string): Promise<T> {
    try {
      return await model.findByIdAndDelete(id);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export const commonRepository = new CommonRepository();
