import { Leader } from './Leader';
import { Project } from './Project';
import { Student } from './Student';

export class Enrolment {
  private constructor(private student: Student, private leader: Leader, private project: Project) {}
  public static create(student: Student, leader: Leader, project: Project): Enrolment {
    return new Enrolment(student, leader, project);
  }

  public getIds() {
    return {
      id_leader: this.leader.getCode(),
      id_student: this.student.getRegistration(),
      id_project: this.project.getCode(),
    };
  }
}
