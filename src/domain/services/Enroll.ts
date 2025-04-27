import { Leader } from '../entities/Leader';
import { Project } from '../entities/Project';
import { Student } from '../entities/Student';

export class Enroll {
  private constructor(private student: Student, private leader: Leader, private project: Project) {}
  public static create(student: Student, leader: Leader | null, project: Project): Enroll {
    const leaderValidate: Leader = this.hasLeader(leader);
    return new Enroll(student, leaderValidate, project);
  }

  public getIdsEnroll() {
    return {
      id_leader: this.leader.getCodeLeader(),
      id_student: this.student.getRegistrationStudent(),
      id_project: this.project.getCodeProject(),
    };
  }
  private static hasLeader(leader: Leader | null): Leader {
    if (!leader) throw new Error('advisor inexistent or does not have the expertise for the project');
    return leader;
  }
}
