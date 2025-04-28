import { Leader } from './Leader';
import { Project } from './Project';
import { Student } from './Student';

export class Enroll {
  private constructor(private student: Student, private leader: Leader, private project: Project) {}
  public static create(student: Student, leader: Leader, project: Project): Enroll {
    return new Enroll(student, leader, project);
  }

  public getIdsEnroll() {
    return {
      id_leader: this.leader.getCodeLeader(),
      id_student: this.student.getRegistrationStudent(),
      id_project: this.project.getCodeProject(),
    };
  }
}
