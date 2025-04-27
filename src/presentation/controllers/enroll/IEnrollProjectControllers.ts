import { Response, Request, NextFunction } from 'express';
export interface IEnrollProjectControllers {
  toEnroll(request: Request, response: Response, next: NextFunction): Promise<void>;
}
