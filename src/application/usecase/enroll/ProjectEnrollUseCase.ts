import { inject, injectable } from 'tsyringe';
import { Enroll } from '../../../domain/entities/Enroll';
import { EnrollProject } from '../../../domain/interfaces/EnrollProject';
import { LeaderServices } from '../../../domain/services/enroll/LeaderServices';
import { ProjectServices } from '../../../domain/services/enroll/ProjectServices';
import { StudentServices } from '../../../domain/services/enroll/StudentServices';
import { PrismaEnrollProject } from '../../../infrastructure/repository/PrismaEnrollProject';
import { InputDTO } from '../../dto/enroll/InputDTO';
import { OutputDTO } from '../../dto/enroll/OutputDTO';
import { IProjectEnrollUseCase } from './IProjectEnrollUseCase';

@injectable()
export class ProjectEnrollUseCase implements IProjectEnrollUseCase {
  public constructor(
    @inject(StudentServices) private studentServices: StudentServices,
    @inject(ProjectServices) private projectServices: ProjectServices,
    @inject(PrismaEnrollProject) private enrollProject: EnrollProject,
    @inject(LeaderServices) private leaderServices: LeaderServices
  ) {}

  public async create({ leader, project, student }: InputDTO): Promise<OutputDTO> {
    const _student = await this.studentServices.create(student);
    const _project = await this.projectServices.create(project);
    const _leader = await this.leaderServices.create(leader, _project);

    const enroll: Enroll = Enroll.create(_student, _leader, _project);
    const { idLeader, idProject, idStudent } = await this.enrollProject.register(enroll);

    const idsEnroll: OutputDTO = {
      idLeader: idLeader.getValue(),
      idProject: idProject.getValue(),
      idStudent: idStudent.getValue(),
    };
    return idsEnroll;
  }
}
