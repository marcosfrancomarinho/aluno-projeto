import { Enrollment } from '../../domain/entities/Enrollment';
import { Scheduling } from '../../domain/entities/Scheduling';
import { NotificationPublisher } from '../../domain/events/NotificationPublisher';
import { StudentEnrollerInProject } from '../../domain/interfaces/StudentEnrollerInProject';
import { SchedulingDateTimeValidatorServices } from '../../domain/services/SchedulingDateTimeValidatorServices';
import { ValidateEnrollmentCreatorServices } from '../../domain/services/ValidateEnrollmentCreatorServices';
import { ID } from '../../domain/valueobject/ID';
import { EnrollRequestDTO } from '../dto/EnrollRequestDTO';
import { EnrollResponseDTO } from '../dto/EnrollResponseDTO';

export class StudentEnrollerInProjectUseCase {
  public constructor(
    private studentEnrollerInProject: StudentEnrollerInProject,
    private validateEnrollmentCreatorServices: ValidateEnrollmentCreatorServices,
    private schedulingDateTimeValidatorServices: SchedulingDateTimeValidatorServices,
    private notificationPublisher: NotificationPublisher
  ) {}

  public async enroll(enrollDTO: EnrollRequestDTO): Promise<EnrollResponseDTO> {
    const enrollment: Enrollment = await this.validateEnrollmentCreatorServices.create(enrollDTO);
    const scheduling: Scheduling = await this.schedulingDateTimeValidatorServices.validate(enrollDTO);

    const enrollmentId: ID = await this.studentEnrollerInProject.enroll(enrollment, scheduling);
    const enrollResponseDTO: EnrollResponseDTO = new EnrollResponseDTO(enrollmentId.getValue());
    this.notificationPublisher.notify(enrollment);
    return enrollResponseDTO;
  }
}
