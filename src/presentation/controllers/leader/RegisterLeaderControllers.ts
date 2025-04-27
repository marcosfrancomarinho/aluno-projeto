import { Request, Response, NextFunction } from 'express';
import { IRegisterLeaderControllers } from './IRegisterLeaderControllers';
import { inject, injectable } from 'tsyringe';
import { RegisterLeaderUseCase } from '../../../application/usecase/leader/RegisterLeaderUseCase';
import { IRegisterLeaderUseCase } from '../../../application/usecase/leader/IRegisterLeaderUseCase';

@injectable()
export class RegisterLeaderControllers implements IRegisterLeaderControllers {
  public constructor(@inject(RegisterLeaderUseCase) private registerLeaderUseCase: IRegisterLeaderUseCase) {}
  public async toRegister(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { name, specialty, email } = request.body;
      const { idLeader } = await this.registerLeaderUseCase.register({ name, specialty, email });
      response.status(200).json({ idLeader, message: 'leader registered successfully' });
    } catch (error) {
      next(error);
    }
  }
}
