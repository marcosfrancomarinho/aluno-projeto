import { Request, Response, NextFunction } from 'express';
import { ICreateProjectControllers } from './ICreateProjectControllers';
import { inject, injectable } from 'tsyringe';
import { CreateProjectUseCase } from '../../../application/usecase/project/CreateProjectUseCase';
import { ICreateProjectUseCase } from '../../../application/usecase/project/ICreateProjectUseCase';
import { OutputDTO } from '../../../application/dto/project/OutputDTO';

@injectable()
export class CreateProjectControllers implements ICreateProjectControllers {
  public constructor(@inject(CreateProjectUseCase) private createProjectUseCase: ICreateProjectUseCase) {}
  public async toCreate(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { name } = request.body;
      const { idProject }: OutputDTO = await this.createProjectUseCase.create({ name });
      response.status(200).json({ idProject, message: 'project create successfully' });
    } catch (error) {
      next(error);
    }
  }
}
