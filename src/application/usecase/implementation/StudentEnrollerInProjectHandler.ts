import { inject, injectable } from 'tsyringe';
import { Enrolment } from '../../../domain/entities/Enroll';
import { StudentEnrollerInProject } from '../../../domain/interfaces/StudentEnrollerInProject';
import { CreateLeaderToEnroll } from '../../../domain/services/CreateLeaderToEnroll';
import { CreateProjectToEnroll } from '../../../domain/services/CreateProjectToEnroll';
import { CreateStudentToEnroll } from '../../../domain/services/CreateStudentToEnroll';
import { PrismaStudentEnrollerInProject } from '../../../infrastructure/repository/PrismaStudentEnrollerInProject';
import { EnrollRequestDTO } from '../../dto/EnrollRequestDTO';
import { EnrollResponseDTO } from '../../dto/EnrollResponseDTO';
import { StudentEnrollerInProjectUseCase } from '../interfaces/StudentEnrollerInProjectUseCase';

@injectable()
export class StudentEnrollerInProjectHandler implements StudentEnrollerInProjectUseCase {
  public constructor(
    @inject(CreateStudentToEnroll) private createStudent: CreateStudentToEnroll,
    @inject(CreateProjectToEnroll) private createProject: CreateProjectToEnroll,
    @inject(PrismaStudentEnrollerInProject) private studentEnrollerInProject: StudentEnrollerInProject,
    @inject(CreateLeaderToEnroll) private createLeader: CreateLeaderToEnroll
  ) {}

  public async enroll(input: EnrollRequestDTO): Promise<EnrollResponseDTO> {
    const student = await this.createStudent.execute(input.student);
    const project = await this.createProject.execute(input.project);
    const leader = await this.createLeader.execute(input.leader, project);

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
