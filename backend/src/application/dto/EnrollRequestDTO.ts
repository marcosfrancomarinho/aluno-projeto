export class EnrollRequestDTO {
  public constructor(
    private student_name: string,
    private student_email: string,
    private leader_email: string,
    private project_name: string,
    private timestamp: string
  ) { }

  public getNameStudent(): string {
    return this.student_name;
  }
  public getEmailStudent(): string {
    return this.student_email;
  }
  public getEmailLeader(): string {
    return this.leader_email;
  }
  public getNameProject(): string {
    return this.project_name;
  }
  public getTimestamp(): string {
    return this.timestamp;
  }
};
