import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { EnrollRequestDTO } from '../../application/dto/EnrollRequestDTO';
import { EnrollResponseDTO } from '../../application/dto/EnrollResponseDTO';
import { StudentEnrollerInProjectHandler } from '../../application/usecase/implementation/StudentEnrollerInProjectHandler';
import { StudentEnrollerInProjectUseCase } from '../../application/usecase/interfaces/StudentEnrollerInProjectUseCase';

@injectable()
export class StudentEnrollerInProjectControllers {
  public constructor(
    @inject(StudentEnrollerInProjectHandler) private studentEnrollerInProjectHandler: StudentEnrollerInProjectUseCase
  ) {}

  public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { student, leader, project, timestamp } = request.body as EnrollRequestDTO;

      const idsEnroll: EnrollResponseDTO = await this.studentEnrollerInProjectHandler.enroll({ student, leader, project, timestamp });

      response.status(200).json({ ...idsEnroll, message: 'enroll whith successfully' });
    } catch (error) {
      next(error);
    }
  }
}
