export class LoginUserResponseDTO {
  public constructor(private token: string) {}

  public getToken(): string {
    return this.token;
  }
  public toObject() {
    return {
      message: 'login successfully',
      status: true,
      token: this.token,
    };
  }
}
