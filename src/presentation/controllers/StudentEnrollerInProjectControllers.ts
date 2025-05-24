import { inject, injectable } from 'tsyringe';
import { EnrollResponseDTO } from '../../application/dto/EnrollResponseDTO';
import { StudentEnrollerInProjectHandler } from '../../application/usecase/implementation/StudentEnrollerInProjectHandler';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { StudentEnrollerInProjectUseCase } from '../../application/usecase/interfaces/StudentEnrollerInProjectUseCase';
import { ControllerHttp } from '../../domain/interfaces/ControllerHttp';

@injectable()
export class StudentEnrollerInProjectControllers implements ControllerHttp {
  public constructor(
    @inject(StudentEnrollerInProjectHandler) private studentEnrollerInProjectHandler: StudentEnrollerInProjectUseCase
  ) {}

  public async execute(http: HttpContext): Promise<void> {
    try {
      const { student, leader, project, timestamp } = http.getRequestBody();

      const idsEnroll: EnrollResponseDTO = await this.studentEnrollerInProjectHandler.enroll({
        student,
        leader,
        project,
        timestamp,
      });

      http.send(200, { ...idsEnroll, message: 'enroll whith successfully' });
    } catch (error) {
      http.send(400, error);
    }
  }
}
