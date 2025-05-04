import { inject, injectable } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { StudentEnrollerInProjectHandler } from '../../application/usecase/implementation/StudentEnrollerInProjectHandler';
import { StudentEnrollerInProjectUseCase } from '../../application/usecase/interfaces/StudentEnrollerInProjectUseCase';
import { EnrollRequestDTO } from '../../application/dto/EnrollRequestDTO';
import { EnrollResponseDTO } from '../../application/dto/EnrollResponseDTO';

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
