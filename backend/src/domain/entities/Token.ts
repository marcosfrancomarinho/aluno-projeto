export class Token {
  private constructor(private token: string) {}

  public getValue() {
    return this.token;
  }

  public static create(token: string): Token {
    return new Token(token);
  }
}
