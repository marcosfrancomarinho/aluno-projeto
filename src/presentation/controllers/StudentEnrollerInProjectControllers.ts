import { inject, injectable } from 'tsyringe';
import { EnrollResponseDTO } from '../../application/dto/EnrollResponseDTO';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { HttpController } from '../../domain/interfaces/HttpController';
import { StudentEnrollerInProjectUseCase } from '../../application/usecase/StudentEnrollerInProjectUseCase';
import { EnrollRequestDTO } from '../../application/dto/EnrollRequestDTO';

@injectable()
export class StudentEnrollerInProjectControllers implements HttpController {
  public constructor(
    @inject(StudentEnrollerInProjectUseCase) private studentEnrollerInProjectHandler: StudentEnrollerInProjectUseCase
  ) { }

  public async execute(httpContext: HttpContext): Promise<void> {
    try {
      const { student, leader, project, timestamp } = httpContext.getRequestBody();
      const requestDTO: EnrollRequestDTO = new EnrollRequestDTO(student, leader, project, timestamp);
      const idsEnroll: EnrollResponseDTO = await this.studentEnrollerInProjectHandler.enroll(requestDTO);

      httpContext.send(200, { ...idsEnroll, message: 'enroll whith successfully' });
    } catch (error) {
      httpContext.handlerError(error);
    }
  }
}
