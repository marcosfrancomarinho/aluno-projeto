export class Token {
  public constructor(private token: string) {}

  public getValue(): string {
    return this.token;
  }

  public static create(token: string): Token {
    return new Token(token);
  }
}
