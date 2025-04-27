import { EnrollProject, IdEnroll } from '../../domain/interfaces/EnrollProject';
import { Enroll } from '../../domain/services/Enroll';
import { ID } from '../../domain/valueobject/ID';
import { Client } from './Client';

export interface DatasEnroll {
  id_leader: string;
  id_student: string;
  id_project: string;
}

export class PrismaEnrollProject implements EnrollProject {
  public async register(enroll: Enroll): Promise<IdEnroll> {
    const data: DatasEnroll = enroll.getIdsEnroll();
    const { id_leader, id_project, id_student } = await Client.enroll.create({ data });
    const idLeader: ID = ID.create(id_leader);
    const idStudent: ID = ID.create(id_student);
    const idProject: ID = ID.create(id_project);
    return { idLeader, idStudent, idProject };
  }
}
