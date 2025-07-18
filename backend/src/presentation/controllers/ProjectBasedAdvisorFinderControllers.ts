import { LeaderContactResquestDTO } from '../../application/dto/LeaderContactRequestDTO';
import { LeaderContactResponseDTO } from '../../application/dto/LeaderContactResponseDTO';
import { ProjectBasedAdvisorFinderUseCase } from '../../application/usecase/ProjectBasedAdvisorFinderUseCase';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { HttpControllers } from '../../domain/interfaces/HttpController';

export class ProjectBasedAdvisorFinderControllers implements HttpControllers {
  public constructor(private projectBasedAdvisorFinderHandler: ProjectBasedAdvisorFinderUseCase) {}
  public async execute(httpContext: HttpContext): Promise<void> {
    try {
      const { name } = httpContext.getRequestQuery();
      const leaderContactResquestDTO: LeaderContactResquestDTO = new LeaderContactResquestDTO(name);
      const leaderContactResponseDTO: LeaderContactResponseDTO[] = await this.projectBasedAdvisorFinderHandler.findAll(
        leaderContactResquestDTO
      );
      httpContext.send(200, leaderContactResponseDTO);
    } catch (error) {
      httpContext.sendError(error);
    }
  }
}
