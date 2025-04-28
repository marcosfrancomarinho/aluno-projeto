import { Request, Response, NextFunction } from 'express';
import { ICreateProjectControllers } from '../interfaces/ICreateProjectControllers';
import { inject, injectable } from 'tsyringe';
import { ICreateProjectUseCase } from '../../../application/usecase/interfaces/ICreateProjectUseCase';
import { OutputProjectDTO } from '../../../application/dto/OutputProjectDTO';
import { CreateProjectUseCase } from '../../../application/usecase/implementation/CreateProjectUseCase';

@injectable()
export class CreateProjectControllers implements ICreateProjectControllers {
  public constructor(@inject(CreateProjectUseCase) private createProjectUseCase: ICreateProjectUseCase) {}
  public async toCreate(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { name } = request.body;
      const { idProject }: OutputProjectDTO = await this.createProjectUseCase.create({ name });
      response.status(200).json({ idProject, message: 'project create successfully' });
    } catch (error) {
      next(error);
    }
  }
}
