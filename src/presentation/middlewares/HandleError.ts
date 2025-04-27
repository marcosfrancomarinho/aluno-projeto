import { NextFunction, Request, Response } from 'express';

export class HandleError {
  public static catch(error: any, request: Request, response: Response, next: NextFunction) {
    
    response.status(400).json({ error: (error as Error).message });
  }
}
