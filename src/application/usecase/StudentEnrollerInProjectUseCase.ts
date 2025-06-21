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
import { NotificationPublisher } from '../../domain/events/NotificationPublisher';

@injectable()
export class StudentEnrollerInProjectUseCase {
  public constructor(
    @inject(PrismaStudentEnrollerInProject) private studentEnrollerInProject: StudentEnrollerInProject,
    @inject(ValidateEnrollmentCreatorServices) private validateEnrollmentCreatorServices: ValidateEnrollmentCreatorServices,
    @inject(SchedulingDateTimeValidatorServices) private schedulingDateTimeValidatorServices: SchedulingDateTimeValidatorServices,
    @inject(NotificationPublisher) private notificationPublisher: NotificationPublisher
  ) { }

  public async enroll(enrollDTO: EnrollRequestDTO): Promise<EnrollResponseDTO> {
    const enrollment: Enrollment = await this.validateEnrollmentCreatorServices.create(enrollDTO);
    const scheduling: Scheduling = await this.schedulingDateTimeValidatorServices.validate(enrollDTO);

    const enrollmentId: ID = await this.studentEnrollerInProject.enroll(enrollment, scheduling);
    const enrollResponseDTO: EnrollResponseDTO = new EnrollResponseDTO(enrollmentId.getValue());
    await this.notificationPublisher.notify(enrollment);
    return enrollResponseDTO;
  }
}
