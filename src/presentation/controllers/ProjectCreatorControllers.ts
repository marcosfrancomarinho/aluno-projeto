import { inject, injectable } from 'tsyringe';
import { ProjectResponseDTO } from '../../application/dto/ProjectResponseDTO';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { HttpController } from '../../domain/interfaces/HttpController';
import { ProjectCreatorUseCase } from '../../application/usecase/ProjectCreatorUseCase';
import { ProjectRequestDTO } from '../../application/dto/ProjectRequestDTO';

@injectable()
export class ProjectCreatorControllers implements HttpController {
  public constructor(@inject(ProjectCreatorUseCase) private projectCreatorHandler: ProjectCreatorUseCase) { }

  public async execute(httpContext: HttpContext): Promise<void> {
    try {
      const { name, timestamp } = httpContext.getRequestBody();
      const requestDTO: ProjectRequestDTO = new ProjectRequestDTO(name, timestamp);
      const { projectId }: ProjectResponseDTO = await this.projectCreatorHandler.create(requestDTO);

      httpContext.send(200, { projectId, message: 'project create successfully' });
    } catch (error) {
      httpContext.handlerError(error);
    }
  }
}
