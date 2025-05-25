import { inject, injectable } from 'tsyringe';
import { EnrollResponseDTO } from '../../application/dto/EnrollResponseDTO';
import { StudentEnrollerInProjectHandler } from '../../application/usecase/implementation/StudentEnrollerInProjectHandler';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { StudentEnrollerInProjectUseCase } from '../../application/usecase/interfaces/StudentEnrollerInProjectUseCase';
import { HttpController } from '../../domain/interfaces/HttpController';

@injectable()
export class StudentEnrollerInProjectControllers implements HttpController {
  public constructor(
    @inject(StudentEnrollerInProjectHandler) private studentEnrollerInProjectHandler: StudentEnrollerInProjectUseCase
  ) {}

  public async execute(httpContext: HttpContext): Promise<void> {
    try {
      const { student, leader, project, timestamp } = httpContext.getRequestBody();

      const idsEnroll: EnrollResponseDTO = await this.studentEnrollerInProjectHandler.enroll({
        student,
        leader,
        project,
        timestamp,
      });

      httpContext.send(200, { ...idsEnroll, message: 'enroll whith successfully' });
    } catch (error) {
      httpContext.send(400, error);
    }
  }
}
