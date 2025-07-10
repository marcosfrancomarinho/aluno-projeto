import { Enrollment } from '../../domain/entities/Enrollment';
import { Scheduling } from '../../domain/entities/Scheduling';
import { StudentEnrollerInProject } from '../../domain/interfaces/StudentEnrollerInProject';
import { ID } from '../../domain/valueobject/ID';
import { Client } from './Client';

export type DatasEnroll = {
  code: string;
  id_leader: string;
  id_student: string;
  id_project: string;
};

export type DatasScheduling = {
  code: string;
  timestamp: Date;
};

export class PrismaStudentEnrollerInProject implements StudentEnrollerInProject {
  public async enroll(enroll: Enrollment, scheduling: Scheduling): Promise<ID> {
    const datasEnroll: DatasEnroll = enroll.getIdentifiers();
    const datasScheduling: DatasScheduling = scheduling.getPersistenceData();

    const code: string = await Client.$transaction(async ({ enroll, scheduling }) => {
      const { code } = await enroll.create({ data: datasEnroll });
      await scheduling.create({ data: { ...datasScheduling, id_enroll: code } });
      return code;
    });

    const enrollmentId: ID = ID.create(code);
    return enrollmentId;
  }
}
