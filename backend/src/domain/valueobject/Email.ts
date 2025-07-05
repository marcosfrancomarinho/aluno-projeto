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
    const regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email ) throw new Exception('Email is required.', 400, Exception.UNDEFINED);

    if (typeof email !== 'string') throw new Exception('Email must be a string.', 400, Exception.INVALID);

    if (!regex.test(email.trim())) throw new Exception('Email format is invalid.', 400, Exception.INVALID);
  }

}