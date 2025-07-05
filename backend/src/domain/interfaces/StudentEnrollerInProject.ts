import { Enrollment } from '../entities/Enrollment';
import { Scheduling } from '../entities/Scheduling';
import { ID } from '../valueobject/ID';


export interface StudentEnrollerInProject {
  enroll(enroll: Enrollment, scheduling:Scheduling): Promise<ID>;
}
