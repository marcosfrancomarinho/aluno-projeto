export class SignUpUserRequestDTO {
  public constructor(private name: string, private email: string, private password: string) {}

  public getName(): string {
    return this.name;
  }
  public getEmail(): string {
    return this.email;
  }
  public getPassword(): string {
    return this.password;
  }
}
