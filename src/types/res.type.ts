import { Response } from "express";

export type TRes<T> = Promise<Response<T>>;
