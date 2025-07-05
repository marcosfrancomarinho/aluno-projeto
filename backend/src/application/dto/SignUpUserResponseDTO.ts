export class SignUpUserResponseDTO {
  public constructor(private id: string) {}

  public toObject() {
    return {
      userId: this.id,
      message: 'user register whith success.',
    };
  }
}
