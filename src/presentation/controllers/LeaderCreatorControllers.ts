import { inject, injectable } from 'tsyringe';
import { LeaderRequestDTO } from '../../application/dto/LeaderRequestDTO';
import { LeaderCreatorUseCase } from '../../application/usecase/LeaderCreatorUseCase';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { HttpController } from '../../domain/interfaces/HttpController';
import { LeaderResponseDTO } from '../../application/dto/LeaderResponseDTO';

@injectable()
export class LeaderCreatorControllers implements HttpController {
  public constructor(@inject(LeaderCreatorUseCase) private leaderCreator: LeaderCreatorUseCase) { }

  public async execute(httpContext: HttpContext): Promise<void> {
    try {
      const { name, specialty, email } = httpContext.getRequestBody();
      const leaderRequestDTO: LeaderRequestDTO = new LeaderRequestDTO(name, email, specialty);
      const leaderResponseDTO: LeaderResponseDTO = await this.leaderCreator.create(leaderRequestDTO);
      
      httpContext.send(200, leaderResponseDTO.toObject());
    } catch (error) {
      httpContext.handlerError(error);
    }
  }
}
