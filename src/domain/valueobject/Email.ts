import { Exception } from "../../shared/error/Exception";

export class Email {
  private constructor(private email: string) { }

  public getValue(): string {
    return this.email;
  }
  public static create(email: string): Email {
    this.validate(email);
    return new Email(email.trim());
  }

  private static validate(email: string): void {
    const regex: RegExp = /^(?!\s*$)[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const checked: boolean = !!email && regex.test(email.trim());
    if (!checked) throw new Exception('email invalid', 400, Exception.INVALID);
  }
}
