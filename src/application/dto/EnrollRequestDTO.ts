export class EnrollRequestDTO {
  public constructor(
    public student: { name: string; email: string; },
    public leader: { email: string; },
    public project: { name: string; },
    public timestamp: string
  ) { }
};
