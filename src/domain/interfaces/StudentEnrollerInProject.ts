import { Enrolment } from '../entities/Enroll';
import { ID } from '../valueobject/ID';

export type RegistrationIds = {
  studentId: ID;
  leaderId: ID;
  projectId: ID;
};
export interface StudentEnrollerInProject {
  enroll(enroll: Enrolment): Promise<RegistrationIds>;
}
