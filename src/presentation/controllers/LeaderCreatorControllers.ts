import { inject, injectable } from 'tsyringe';
import { LeaderCreatorHandler } from '../../application/usecase/implementation/LeaderCreatorHandler';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { LeaderCreatorUseCase } from '../../application/usecase/interfaces/LeaderCreatorUseCase';
import { ControllerHttp } from '../../domain/interfaces/ControllerHttp';

@injectable()
export class LeaderCreatorControllers  implements ControllerHttp{
  public constructor(@inject(LeaderCreatorHandler) private leaderCreator: LeaderCreatorUseCase) {}

  public async execute(http: HttpContext): Promise<void> {
    try {
      const { name, specialty, email } = http.getRequestBody();

      const { leaderID, specialtyId } = await this.leaderCreator.create({ name, specialty, email });

      http.send(200, { leaderID, specialtyId, message: 'leader registered successfully' });
    } catch (error) {
      http.send(400, error);
    }
  }
}
