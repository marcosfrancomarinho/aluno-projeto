import { EnrollRequestDTO } from '../../application/dto/EnrollRequestDTO';
import { EnrollResponseDTO } from '../../application/dto/EnrollResponseDTO';
import { StudentEnrollerInProjectUseCase } from '../../application/usecase/StudentEnrollerInProjectUseCase';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { HttpController } from '../../domain/interfaces/HttpController';

export class StudentEnrollerInProjectControllers implements HttpController {
  public constructor(private studentEnrollerInProjectHandler: StudentEnrollerInProjectUseCase) {}

  public async execute(httpContext: HttpContext): Promise<void> {
    try {
      const { student_name, student_email, leader_email, project_name, timestamp } = httpContext.getRequestBody();
      const enrollRequestDTO: EnrollRequestDTO = new EnrollRequestDTO(
        student_name,
        student_email,
        leader_email,
        project_name,
        timestamp
      );
      const enrollResponseDTO: EnrollResponseDTO = await this.studentEnrollerInProjectHandler.enroll(enrollRequestDTO);

      httpContext.send(200, enrollResponseDTO.toObject());
    } catch (error) {
      httpContext.sendError(error);
    }
  }
}
