import { inject, injectable } from 'tsyringe';
import { Enrolment } from '../../../domain/entities/Enroll';
import { StudentEnrollerInProject } from '../../../domain/interfaces/StudentEnrollerInProject';
import { QualifiedLeaderFinder } from '../../../domain/services/QualifiedLeaderFinder';
import { ResolveProjectForEnrollment } from '../../../domain/services/ResolveProjectForEnrollment';
import { EnsureStudentExistsForEnrollment } from '../../../domain/services/EnsureStudentExistsForEnrollment';
import { PrismaStudentEnrollerInProject } from '../../../infrastructure/repository/PrismaStudentEnrollerInProject';
import { EnrollRequestDTO } from '../../dto/EnrollRequestDTO';
import { EnrollResponseDTO } from '../../dto/EnrollResponseDTO';
import { StudentEnrollerInProjectUseCase } from '../interfaces/StudentEnrollerInProjectUseCase';
import { QualifiedLeaderFinderServices } from '../../../domain/interfaces/QualifiedLeaderFinderServices';
import { EnsureStudentExistsForEnrollmentServices } from '../../../domain/interfaces/EnsureStudentExistsForEnrollmentServices';
import { ResolveProjectForEnrollmentServices } from '../../../domain/interfaces/ResolveProjectForEnrollmentServices';

@injectable()
export class StudentEnrollerInProjectHandler implements StudentEnrollerInProjectUseCase {
  public constructor(
    @inject(EnsureStudentExistsForEnrollment) private ensureStudentExistsForEnrollment: EnsureStudentExistsForEnrollmentServices,
    @inject(ResolveProjectForEnrollment) private resolveProjectForEnrollment: ResolveProjectForEnrollmentServices,
    @inject(PrismaStudentEnrollerInProject) private studentEnrollerInProject: StudentEnrollerInProject,
    @inject(QualifiedLeaderFinder) private qualifiedLeaderFinder: QualifiedLeaderFinderServices
  ) {}

  public async enroll(input: EnrollRequestDTO): Promise<EnrollResponseDTO> {
    const student = await this.ensureStudentExistsForEnrollment.execute(input.student);
    const project = await this.resolveProjectForEnrollment.resolve(input.project);
    const leader = await this.qualifiedLeaderFinder.find(input.leader, project);

    const enrolment: Enrolment = Enrolment.create(student, leader, project);

    const { leaderId, projectId, studentId } = await this.studentEnrollerInProject.enroll(enrolment);

    const enrollmentIds: EnrollResponseDTO = {
      leaaderId: leaderId.getValue(),
      projectId: projectId.getValue(),
      studentId: studentId.getValue(),
    };
    return enrollmentIds;
  }
}
