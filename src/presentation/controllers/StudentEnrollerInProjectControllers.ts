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
      const enrollRequestDTO: EnrollRequestDTO = new EnrollRequestDTO(student, leader, project, timestamp);
      const enrollResponseDTO: EnrollResponseDTO = await this.studentEnrollerInProjectHandler.enroll(enrollRequestDTO);

      httpContext.send(200, enrollResponseDTO.toObject());
    } catch (error) {
      httpContext.handlerError(error);
    }
  }
}
