import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  async findAll(): Promise<IUser[]> {
    try {
      return await userRepository.findAll();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findById(id: string): Promise<IUser> {
    try {
      return await userRepository.findById(id);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async create(value: any) {
    try {
      return await userRepository.create(value);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findByIdAndUpdate(id: string, value: any) {
    try {
      return await userRepository.findByIdAndUpdate(id, value);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findByIdAndDelete(id: string) {
    try {
      return await userRepository.findByIdAndDelete(id);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export const userService = new UserService();
