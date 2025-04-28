import { inject, injectable } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { ProjectEnrollUseCase } from '../../../application/usecase/implementation/ProjectEnrollUseCase';
import { IProjectEnrollUseCase } from '../../../application/usecase/interfaces/IProjectEnrollUseCase';
import { InputEnrollDTO } from '../../../application/dto/InputEnrollDTO';
import { OutputEnrollDTO } from '../../../application/dto/OutputEnrollDTO';
import { IEnrollProjectControllers } from '../interfaces/IEnrollProjectControllers';

@injectable()
export class EnrollProjectControllers implements IEnrollProjectControllers {
  public constructor(@inject(ProjectEnrollUseCase) private projectEnrollment: IProjectEnrollUseCase) {}

  public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { student, leader, project } = request.body as InputEnrollDTO;
      const idsEnroll: OutputEnrollDTO = await this.projectEnrollment.create({ student, leader, project });
      response.status(200).json({ ...idsEnroll, message: 'enroll whith successfully' });
    } catch (error) {
      next(error);
    }
  }
}
