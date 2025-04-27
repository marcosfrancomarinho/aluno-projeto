import { Response, Request, NextFunction } from 'express';

export interface IRegisterLeaderControllers {
  toRegister(request: Request, response: Response, next: NextFunction): Promise<void>;
}
