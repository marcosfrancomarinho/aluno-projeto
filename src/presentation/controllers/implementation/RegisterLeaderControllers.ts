import { Request, Response, NextFunction } from 'express';
import { IRegisterLeaderControllers } from '../interfaces/IRegisterLeaderControllers';
import { inject, injectable } from 'tsyringe';
import { IRegisterLeaderUseCase } from '../../../application/usecase/interfaces/IRegisterLeaderUseCase';
import { RegisterLeaderUseCase } from '../../../application/usecase/implementation/RegisterLeaderUseCase';

@injectable()
export class RegisterLeaderControllers implements IRegisterLeaderControllers {
  public constructor(@inject(RegisterLeaderUseCase) private leader: IRegisterLeaderUseCase) {}
  public async toRegister(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { name, specialty, email } = request.body;
      const { idLeader } = await this.leader.register({ name, specialty, email });
      response.status(200).json({ idLeader, message: 'leader registered successfully' });
    } catch (error) {
      next(error);
    }
  }
}
