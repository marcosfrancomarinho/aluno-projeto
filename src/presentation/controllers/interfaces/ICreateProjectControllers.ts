import { Response, Request, NextFunction } from 'express';

export interface ICreateProjectControllers {
  execute(request: Request, response: Response, next: NextFunction): Promise<void>;
}
