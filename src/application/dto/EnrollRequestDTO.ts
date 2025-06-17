export class EnrollRequestDTO {
  public constructor(
    private student: { name: string; email: string; },
    private leader: { email: string; },
    private project: { name: string; },
    private timestamp: string
  ) { }

  public getNameStudent(): string {
    return this.student.name;
  }
  public getEmailStudent(): string {
    return this.student.email;
  }
  public getEmailLeader(): string {
    return this.leader.email;
  }
  public getNameProject(): string {
    return this.project.name;
  }
  public getTimestamp(): string {
    return this.timestamp;
  }
};
