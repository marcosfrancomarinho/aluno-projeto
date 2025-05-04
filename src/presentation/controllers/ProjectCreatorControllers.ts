import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';
import { ProjectCreatorUseCase } from '../../application/usecase/interfaces/ProjectCreatorUseCase';
import { ProjectResponseDTO } from '../../application/dto/ProjectResponseDTO';
import { ProjectCreatorHandler } from '../../application/usecase/implementation/ProjectCreatorHandler';

@injectable()
export class ProjectCreatorControllers {
  public constructor(@inject(ProjectCreatorHandler) private projectCreator: ProjectCreatorUseCase) {}

  public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { name } = request.body;

      const { projectId }: ProjectResponseDTO = await this.projectCreator.create({ name });

      response.status(200).json({ projectId, message: 'project create successfully' });
    } catch (error) {
      next(error);
    }
  }
}
