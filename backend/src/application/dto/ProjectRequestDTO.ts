export class ProjectRequestDTO {
  public constructor(private name: string, private timestamp: string) { }

  public getName(): string {
    return this.name;
  }

  public getTimestamp(): string {
    return this.timestamp;
  }
};
