export class LeaderRequestDTO {
  public constructor(private name: string, private email: string, private specialty: string) { }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getSpecialty(): string {
    return this.specialty;
  }
};
