import { inject, injectable } from 'tsyringe';
import { Enroll } from '../../../domain/entities/Enroll';
import { EnrollProject } from '../../../domain/interfaces/EnrollProject';
import { CreateLeaderToEnroll } from '../../../domain/services/CreateLeaderToEnroll';
import { CreateProjectToEnroll } from '../../../domain/services/CreateProjectToEnroll';
import { CreateStudentEnroll } from '../../../domain/services/CreateStudentEnroll';
import { PrismaEnrollProject } from '../../../infrastructure/repository/PrismaEnrollProject';
import { InputEnrollDTO } from '../../dto/InputEnrollDTO';
import { OutputEnrollDTO } from '../../dto/OutputEnrollDTO';
import { IProjectEnrollUseCase } from '../interfaces/IProjectEnrollUseCase';

@injectable()
export class ProjectEnrollUseCase implements IProjectEnrollUseCase {
  public constructor(
    @inject(CreateStudentEnroll) private studentEnroll: CreateStudentEnroll,
    @inject(CreateProjectToEnroll) private projectToEnroll: CreateProjectToEnroll,
    @inject(PrismaEnrollProject) private enrollProject: EnrollProject,
    @inject(CreateLeaderToEnroll) private leaderToEnroll: CreateLeaderToEnroll
  ) {}

  public async create({ leader, project, student }: InputEnrollDTO): Promise<OutputEnrollDTO> {
    const _student = await this.studentEnroll.create(student);
    const _project = await this.projectToEnroll.create(project);
    const _leader = await this.leaderToEnroll.create(leader, _project);

    const enroll: Enroll = Enroll.create(_student, _leader, _project);
    const { idLeader, idProject, idStudent } = await this.enrollProject.register(enroll);

    const idsEnroll: OutputEnrollDTO = {
      idLeader: idLeader.getValue(),
      idProject: idProject.getValue(),
      idStudent: idStudent.getValue(),
    };
    return idsEnroll;
  }
}
