import { Response, Request, NextFunction } from 'express';
export interface IEnrollProjectControllers {
  execute(request: Request, response: Response, next: NextFunction): Promise<void>;
}
