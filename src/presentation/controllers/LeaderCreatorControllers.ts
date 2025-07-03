import { LeaderRequestDTO } from '../../application/dto/LeaderRequestDTO';
import { LeaderResponseDTO } from '../../application/dto/LeaderResponseDTO';
import { LeaderCreatorUseCase } from '../../application/usecase/LeaderCreatorUseCase';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { HttpControllers } from '../../domain/interfaces/HttpController';

export class LeaderCreatorControllers implements HttpControllers {
  public constructor(private leaderCreator: LeaderCreatorUseCase) {}

  public async execute(httpContext: HttpContext): Promise<void> {
    try {
      const { name, specialty, email } = httpContext.getRequestBody();
      const leaderRequestDTO: LeaderRequestDTO = new LeaderRequestDTO(name, email, specialty);
      const leaderResponseDTO: LeaderResponseDTO = await this.leaderCreator.create(leaderRequestDTO);

      httpContext.send(200, leaderResponseDTO.toObject());
    } catch (error) {
      httpContext.sendError(error);
    }
  }
}
