export interface IService<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  create(value: any): Promise<any>;
  findByIdAndUpdate(id: string, value: any): Promise<T>;
  findByIdAndDelete(id: string): Promise<T>;
}
