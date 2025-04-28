import { inject, injectable } from 'tsyringe';
import { Enroll } from '../../../domain/entities/Enroll';
import { EnrollProject } from '../../../domain/interfaces/EnrollProject';
import { CreateLeaderToEnroll } from '../../../domain/services/CreateLeaderToEnroll';
import { CreateProjectToEnroll } from '../../../domain/services/CreateProjectToEnroll';
import { CreateStudentToEnroll } from '../../../domain/services/CreateStudentToEnroll';
import { PrismaEnrollProject } from '../../../infrastructure/repository/PrismaEnrollProject';
import { InputEnrollDTO } from '../../dto/InputEnrollDTO';
import { OutputEnrollDTO } from '../../dto/OutputEnrollDTO';
import { IProjectEnrollUseCase } from '../interfaces/IProjectEnrollUseCase';

@injectable()
export class ProjectEnrollUseCase implements IProjectEnrollUseCase {
  public constructor(
    @inject(CreateStudentToEnroll) private createStudent: CreateStudentToEnroll,
    @inject(CreateProjectToEnroll) private createProject: CreateProjectToEnroll,
    @inject(PrismaEnrollProject) private enrollProject: EnrollProject,
    @inject(CreateLeaderToEnroll) private createLeader: CreateLeaderToEnroll
  ) {}

  public async create(input: InputEnrollDTO): Promise<OutputEnrollDTO> {
    const student = await this.createStudent.execute(input.student);
    const project = await this.createProject.execute(input.project);
    const leader = await this.createLeader.execute(input.leader, project);

    const enroll: Enroll = Enroll.create(student, leader, project);
    const { idLeader, idProject, idStudent } = await this.enrollProject.register(enroll);

    const idsEnroll: OutputEnrollDTO = {
      idLeader: idLeader.getValue(),
      idProject: idProject.getValue(),
      idStudent: idStudent.getValue(),
    };
    return idsEnroll;
  }
}
