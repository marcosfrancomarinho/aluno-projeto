import { Response, Request, NextFunction } from 'express';

export interface IRegisterLeaderControllers {
  execute(request: Request, response: Response, next: NextFunction): Promise<void>;
}
