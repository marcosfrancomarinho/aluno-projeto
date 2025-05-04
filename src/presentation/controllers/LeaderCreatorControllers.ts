import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';
import { LeaderCreatorUseCase } from '../../application/usecase/interfaces/LeaderCreatorUseCase';
import { LeaderCreatorHandler } from '../../application/usecase/implementation/LeaderCreatorHandler';

@injectable()
export class LeaderCreatorControllers {
  public constructor(@inject(LeaderCreatorHandler) private leaderCreator: LeaderCreatorUseCase) {}

  public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { name, specialty, email } = request.body;

      const { leaderID, specialtyId } = await this.leaderCreator.create({ name, specialty, email });

      response.status(200).json({ leaderID, specialtyId, message: 'leader registered successfully' });
    } catch (error) {
      next(error);
    }
  }
}
