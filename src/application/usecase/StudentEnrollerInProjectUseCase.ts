import { inject, injectable } from 'tsyringe';
import { Enrollment } from '../../domain/entities/Enrollment';
import { Scheduling } from '../../domain/entities/Scheduling';
import { StudentEnrollerInProject } from '../../domain/interfaces/StudentEnrollerInProject';
import { SchedulingDateTimeValidatorServices } from '../../domain/services/SchedulingDateTimeValidatorServices';
import { ValidateEnrollmentCreatorServices } from '../../domain/services/ValidateEnrollmentCreatorServices';
import { ID } from '../../domain/valueobject/ID';
import { PrismaStudentEnrollerInProject } from '../../infrastructure/repository/PrismaStudentEnrollerInProject';
import { EnrollRequestDTO } from '../dto/EnrollRequestDTO';
import { EnrollResponseDTO } from '../dto/EnrollResponseDTO';

@injectable()
export class StudentEnrollerInProjectUseCase {
  public constructor(
    @inject(PrismaStudentEnrollerInProject) private studentEnrollerInProject: StudentEnrollerInProject,
    @inject(ValidateEnrollmentCreatorServices) private validateEnrollmentCreatorServices: ValidateEnrollmentCreatorServices,
    @inject(SchedulingDateTimeValidatorServices) private schedulingDateTimeValidatorServices: SchedulingDateTimeValidatorServices
  ) { }

  public async enroll(input: EnrollRequestDTO): Promise<EnrollResponseDTO> {
    const enrollment: Enrollment = await this.validateEnrollmentCreatorServices.create(input);
    const scheduling: Scheduling = await this.schedulingDateTimeValidatorServices.validate(input);

    const enrollmentId: ID = await this.studentEnrollerInProject.enroll(enrollment, scheduling);

    const enrollmentIdGenereted: EnrollResponseDTO = new EnrollResponseDTO(enrollmentId.getValue());
    return enrollmentIdGenereted;
  }
}
