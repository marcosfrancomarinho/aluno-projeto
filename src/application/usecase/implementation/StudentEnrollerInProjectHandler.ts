import { inject, injectable } from 'tsyringe';
import { StudentEnrollerInProject } from '../../../domain/interfaces/StudentEnrollerInProject';
import { PrismaStudentEnrollerInProject } from '../../../infrastructure/repository/PrismaStudentEnrollerInProject';
import { EnrollRequestDTO } from '../../dto/EnrollRequestDTO';
import { EnrollResponseDTO } from '../../dto/EnrollResponseDTO';
import { StudentEnrollerInProjectUseCase } from '../interfaces/StudentEnrollerInProjectUseCase';
import { ID } from '../../../domain/valueobject/ID';
import { ValidateEnrollmentCreator } from '../../../domain/services/ValidateEnrollmentCreator';
import { ValidateEnrollmentCreatorServices } from '../../../domain/interfaces/ValidateEnrollmentCreatorServices';
import { Enrollment } from '../../../domain/entities/Enrollment';
import { Scheduling } from '../../../domain/entities/Scheduling';
import { SchedulingDateTimeValidator } from '../../../domain/services/SchedulingDateTimeValidator';
import { SchedulingDateTimeValidatorServices } from '../../../domain/interfaces/SchedulingDateTimeValidatorServices';

@injectable()
export class StudentEnrollerInProjectHandler implements StudentEnrollerInProjectUseCase {
  public constructor(
    @inject(PrismaStudentEnrollerInProject) private studentEnrollerInProject: StudentEnrollerInProject,
    @inject(ValidateEnrollmentCreator) private validateEnrollmentCreator: ValidateEnrollmentCreatorServices,
    @inject(SchedulingDateTimeValidator) private schedulingDateTimeValidator: SchedulingDateTimeValidatorServices
  ) {}

  public async enroll(input: EnrollRequestDTO): Promise<EnrollResponseDTO> {
    const enrollment: Enrollment = await this.validateEnrollmentCreator.create(input);
    const scheduling: Scheduling = await this.schedulingDateTimeValidator.validate(input);
    
    const enrollmentId: ID = await this.studentEnrollerInProject.enroll(enrollment, scheduling);

    const enrollmentIdGenereted: EnrollResponseDTO = {
      enrollmentId: enrollmentId.getValue(),
    };
    return enrollmentIdGenereted;
  }
}
