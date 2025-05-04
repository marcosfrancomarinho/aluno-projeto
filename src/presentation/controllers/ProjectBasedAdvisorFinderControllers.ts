import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { ProjectBasedAdvisorFinderHandler } from '../../application/usecase/implementation/ProjectBasedAdvisorFinderHandler';
import { ProjectBasedAdvisorFinderUseCase } from '../../application/usecase/interfaces/ProjectBasedAdvisorFinderUseCase';
import { ProjectRequestDTO } from '../../application/dto/ProjectRequestDTO';
import { LeaderContactResponseDTO } from '../../application/dto/LeaderContactResponseDTO';

@injectable()
export class ProjectBasedAdvisorFinderControllers {
  public constructor(
    @inject(ProjectBasedAdvisorFinderHandler) private projectBasedAdvisorFinderHandler: ProjectBasedAdvisorFinderUseCase
  ) {}
  public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { name } = request.query as ProjectRequestDTO;
      const leaderContacts: LeaderContactResponseDTO[] = await this.projectBasedAdvisorFinderHandler.findAll({
        name,
      });
      response.status(200).json(leaderContacts);
    } catch (error) {
      next(error);
    }
  }
}
