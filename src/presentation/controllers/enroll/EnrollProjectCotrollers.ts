import { inject, injectable } from 'tsyringe';
import { IEnrollProjectControllers } from './IEnrollProjectControllers';
import { Request, Response, NextFunction } from 'express';
import { ProjectEnrollUseCase } from '../../../application/usecase/enroll/ProjectEnrollUseCase';
import { IProjectEnrollUseCase } from '../../../application/usecase/enroll/IProjectEnrollUseCase';
import { InputDTO } from '../../../application/dto/enroll/InputDTO';
import { OutputDTO } from '../../../application/dto/enroll/OutputDTO';

@injectable()
export class EnrollProjectControllers implements IEnrollProjectControllers {
  public constructor(@inject(ProjectEnrollUseCase) private projectEnrollUseCase: IProjectEnrollUseCase) {}

  public async toEnroll(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { student, leader, project } = request.body as InputDTO;
      const idsEnroll: OutputDTO = await this.projectEnrollUseCase.create({ student, leader, project });
      response.status(200).json({ ...idsEnroll, message: 'enroll whith successfully' });
    } catch (error) {
      next(error);
    }
  }
}
