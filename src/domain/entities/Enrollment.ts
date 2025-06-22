import { ID } from '../valueobject/ID';
import { Leader } from './Leader';
import { Project } from './Project';
import { Student } from './Student';

export class Enrollment {
  private constructor(private code: ID, private student: Student, private leader: Leader, private project: Project) { }
  public static create(code: ID, student: Student, leader: Leader, project: Project): Enrollment {
    return new Enrollment(code, student, leader, project);
  }
  public getEmailStudent(): string {
    return this.student.getEmail();
  }
  public getNameProjectRaw(): string {
    return this.project.getNameRaw();
  }
  public getNameStudent(): string {
    return this.student.getName();
  }
  public getIdentifiers() {
    return {
      id_leader: this.leader.getCode(),
      id_student: this.student.getRegistration(),
      id_project: this.project.getCode(),
      code: this.code.getValue(),
    };
  }
}
