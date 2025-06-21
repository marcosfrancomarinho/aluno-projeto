import { inject, injectable } from 'tsyringe';
import { LeaderContactResquestDTO } from '../../application/dto/LeaderContactRequestDTO';
import { LeaderContactResponseDTO } from '../../application/dto/LeaderContactResponseDTO';
import { ProjectBasedAdvisorFinderUseCase } from '../../application/usecase/ProjectBasedAdvisorFinderUseCase';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { HttpController } from '../../domain/interfaces/HttpController';

@injectable()
export class ProjectBasedAdvisorFinderControllers implements HttpController {
  public constructor(
    @inject(ProjectBasedAdvisorFinderUseCase) private projectBasedAdvisorFinderHandler: ProjectBasedAdvisorFinderUseCase
  ) { }
  public async execute(httpContext: HttpContext): Promise<void> {
    try {
      const { name } = httpContext.getRequestQuery();
      const leaderContactResquestDTO: LeaderContactResquestDTO = new LeaderContactResquestDTO(name);
      const leaderContactResponseDTO: LeaderContactResponseDTO[] = await this.projectBasedAdvisorFinderHandler.findAll(leaderContactResquestDTO);
      httpContext.send(200, leaderContactResponseDTO);
    } catch (error) {
      httpContext.sendError(error);
    }
  }
}
