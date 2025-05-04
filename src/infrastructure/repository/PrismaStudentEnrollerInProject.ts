import { RegistrationIds, StudentEnrollerInProject } from '../../domain/interfaces/StudentEnrollerInProject';
import { Enrolment } from '../../domain/entities/Enroll';
import { ID } from '../../domain/valueobject/ID';
import { Client } from './Client';

export type DatasEnroll = {
  id_leader: string;
  id_student: string;
  id_project: string;
};

export class PrismaStudentEnrollerInProject implements StudentEnrollerInProject {
  public async enroll(enroll: Enrolment): Promise<RegistrationIds> {
    const data: DatasEnroll = enroll.getIdsEnroll();

    const { id_leader, id_project, id_student } = await Client.enroll.create({ data });

    const leaderId: ID = ID.create(id_leader);
    const projectId: ID = ID.create(id_student);
    const studentId: ID = ID.create(id_project);

    return { leaderId, projectId, studentId };
  }
}
