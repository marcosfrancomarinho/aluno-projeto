import { inject, injectable } from 'tsyringe';
import { LeaderRequestDTO } from '../../application/dto/LeaderRequestDTO';
import { LeaderCreatorUseCase } from '../../application/usecase/LeaderCreatorUseCase';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { HttpController } from '../../domain/interfaces/HttpController';

@injectable()
export class LeaderCreatorControllers implements HttpController {
  public constructor(@inject(LeaderCreatorUseCase) private leaderCreator: LeaderCreatorUseCase) { }

  public async execute(httpContext: HttpContext): Promise<void> {
    try {
      const { name, specialty, email } = httpContext.getRequestBody();
      const requestDTO: LeaderRequestDTO = new LeaderRequestDTO(name, email, specialty);
      const { leaderId, specialtyId } = await this.leaderCreator.create(requestDTO);

      httpContext.send(200, { leaderId, specialtyId, message: 'leader registered successfully' });
    } catch (error) {
      httpContext.handlerError(error);
    }
  }
}
