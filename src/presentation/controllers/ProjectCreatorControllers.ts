import { ProjectRequestDTO } from '../../application/dto/ProjectRequestDTO';
import { ProjectResponseDTO } from '../../application/dto/ProjectResponseDTO';
import { ProjectCreatorUseCase } from '../../application/usecase/ProjectCreatorUseCase';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { HttpController } from '../../domain/interfaces/HttpController';

export class ProjectCreatorControllers implements HttpController {
  public constructor(private projectCreatorHandler: ProjectCreatorUseCase) {}

  public async execute(httpContext: HttpContext): Promise<void> {
    try {
      const { name, timestamp } = httpContext.getRequestBody();
      const projectRequestDTO: ProjectRequestDTO = new ProjectRequestDTO(name, timestamp);
      const projectResponseDTO: ProjectResponseDTO = await this.projectCreatorHandler.create(projectRequestDTO);

      httpContext.send(200, projectResponseDTO.toObject());
    } catch (error) {
      httpContext.sendError(error);
    }
  }
}
