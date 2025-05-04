import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';
import { ProjectCreatorUseCase } from '../../application/usecase/interfaces/ProjectCreatorUseCase';
import { ProjectResponseDTO } from '../../application/dto/ProjectResponseDTO';
import { ProjectCreatorHandler } from '../../application/usecase/implementation/ProjectCreatorHandler';
import { ProjectRequestDTO } from '../../application/dto/ProjectRequestDTO';

@injectable()
export class ProjectCreatorControllers {
  public constructor(@inject(ProjectCreatorHandler) private projectCreatorHandler: ProjectCreatorUseCase) {}

  public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { name, timestamp } = request.body as ProjectRequestDTO;

      const { projectId }: ProjectResponseDTO = await this.projectCreatorHandler.create({ name, timestamp });

      response.status(200).json({ projectId, message: 'project create successfully' });
    } catch (error) {
      next(error);
    }
  }
}
