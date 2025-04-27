import { inject, injectable } from 'tsyringe';
import { Leader } from '../../../domain/entities/Leader';
import { Project } from '../../../domain/entities/Project';
import { Student } from '../../../domain/entities/Student';
import { Enroll } from '../../../domain/services/Enroll';
import { Email } from '../../../domain/valueobject/Email';
import { ID } from '../../../domain/valueobject/ID';
import { Name } from '../../../domain/valueobject/Name';
import { Specialty } from '../../../domain/valueobject/Specialty';
import { InputDTO } from '../../dto/enroll/InputDTO';
import { OutputDTO } from '../../dto/enroll/OutputDTO';
import { IProjectEnrollUseCase } from './IProjectEnrollUseCase';
import { PrismaSearchStudents } from '../../../infrastructure/repository/PrismaSearchStudents';
import { SearchStudents } from '../../../domain/interfaces/SearchStudents';
import { UUID } from '../../../infrastructure/idgenerator/UUID';
import { IdGenerator } from '../../../domain/interfaces/IdGenerator';
import { PrismaRegisterStudents } from '../../../infrastructure/repository/PrismaRegisterStudents';
import { RegisterStudents } from '../../../domain/interfaces/RegisterStudents';
import { PrismaEnrollProject } from '../../../infrastructure/repository/PrismaEnrollProject';
import { EnrollProject } from '../../../domain/interfaces/EnrollProject';
import { SearchProjectExistence } from '../../../domain/interfaces/SearchProjectExistence';
import { PrimaSearchProjectExistence } from '../../../infrastructure/repository/PrismaSearchProjectExistence';
import { PrismaSearchLeaderProject } from '../../../infrastructure/repository/PrismaSearchLeaderProject';
import { SearchLeaderProject } from '../../../domain/interfaces/SearchLeaderProject';


@injectable()
export class ProjectEnrollUseCase implements IProjectEnrollUseCase {
  public constructor(
    @inject(PrismaSearchStudents) private searchStudents: SearchStudents,
    @inject(UUID) private idGenerator: IdGenerator,
    @inject(PrismaRegisterStudents) private registerStudents: RegisterStudents,
    @inject(PrismaEnrollProject) private enrollProject: EnrollProject,
    @inject(PrimaSearchProjectExistence) private searchProjectExistence: SearchProjectExistence,
    @inject(PrismaSearchLeaderProject) private searchLeaderProject: SearchLeaderProject
  ) {}

  public async create({ leader, project, student }: InputDTO): Promise<OutputDTO> {
    const nameStudent: Name = Name.create(student.name);
    const emailStudent: Email = Email.create(student.email);
    const registrationStudent: ID = ID.create(this.idGenerator.create());

    var _student: Student = Student.create(registrationStudent, nameStudent, emailStudent);
    const responseSearchStudent: Student | null = await this.searchStudents.search(_student);
    !responseSearchStudent ? await this.registerStudents.register(_student) : (_student = responseSearchStudent);

    const nameProject: Specialty = Specialty.create(project.name);
    const codeProject: ID | null = await this.searchProjectExistence.search(nameProject);
    const _project: Project = Project.create(codeProject, nameProject);

    const emailLeader: Email = Email.create(leader.email);
    const _leader: Leader | null = await this.searchLeaderProject.search(emailLeader, _project);

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
