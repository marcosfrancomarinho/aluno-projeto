import { inject, injectable } from 'tsyringe';
import { LeaderCreatorHandler } from '../../application/usecase/implementation/LeaderCreatorHandler';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { LeaderCreatorUseCase } from '../../application/usecase/interfaces/LeaderCreatorUseCase';
import { HttpController } from '../../domain/interfaces/HttpController';

@injectable()
export class LeaderCreatorControllers implements HttpController {
  public constructor(@inject(LeaderCreatorHandler) private leaderCreator: LeaderCreatorUseCase) {}

  public async execute(httpContext: HttpContext): Promise<void> {
    try {
      const { name, specialty, email } = httpContext.getRequestBody();

      const { leaderID, specialtyId } = await this.leaderCreator.create({ name, specialty, email });

      httpContext.send(200, { leaderID, specialtyId, message: 'leader registered successfully' });
    } catch (error) {
      httpContext.send(400, error);
    }
  }
}
