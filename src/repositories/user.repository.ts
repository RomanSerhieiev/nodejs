import { IUser } from "../interfaces/user.interface";
import { User } from "../models/User.model";

class UserRepository {
  async findAll(): Promise<IUser[]> {
    try {
      return await User.find();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findById(id: string): Promise<IUser> {
    try {
      return await User.findById(id);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async create(value: any) {
    try {
      return await User.create(value);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findByIdAndUpdate(id: string, value: any) {
    try {
      return await User.findByIdAndUpdate(id, value, {
        returnDocument: "after",
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findByIdAndDelete(id: string) {
    try {
      return await User.findByIdAndDelete(id);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export const userRepository = new UserRepository();
