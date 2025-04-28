import { Response, Request, NextFunction } from 'express';

export interface ICreateProjectControllers {
  toCreate(request: Request, response: Response, next: NextFunction): Promise<void>;
}
