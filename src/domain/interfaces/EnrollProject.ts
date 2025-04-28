import { Enroll } from '../entities/Enroll';
import { ID } from '../valueobject/ID';

export interface IdEnroll {
  idStudent: ID;
  idLeader: ID;
  idProject: ID;
}
export interface EnrollProject {
  register(enroll: Enroll): Promise<IdEnroll>;
}
