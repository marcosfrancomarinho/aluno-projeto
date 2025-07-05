import { Exception } from '../../shared/error/Exception';

export class Password {
  private constructor(private password: string) {}

  public getValue(): string {
    return this.password;
  }
  public static with(password: string) {
    return new Password(password);
  }

  public static create(password: string): Password {
    this.validate(password);
    return new Password(password.trim());
  }
  private static validate(password: string): void {
    const hasUppercase: RegExp = /[A-Z]/;
    const hasLowercase: RegExp = /[a-z]/;
    const hasNumber: RegExp = /\d/;
    const hasSymbol: RegExp = /[!@#$%^&*(),.?":{}|<>]/;
    const hasMinLength: RegExp = /.{8,}/;

    if (!password) {
      throw new Exception('password is required.', 400, Exception.UNDEFINED);
    }

    if (typeof password !== 'string') {
      throw new Exception('password must be a string.', 400, Exception.INVALID);
    }

    if (!hasUppercase.test(password.trim())) {
      throw new Exception('password must contain at least one uppercase letter.', 400, Exception.INVALID);
    }

    if (!hasLowercase.test(password.trim())) {
      throw new Exception('password must contain at least one lowercase letter.', 400, Exception.INVALID);
    }

    if (!hasNumber.test(password.trim())) {
      throw new Exception('password must contain at least one number.', 400, Exception.INVALID);
    }

    if (!hasSymbol.test(password.trim())) {
      throw new Exception('password must contain at least one symbol.', 400, Exception.INVALID);
    }

    if (!hasMinLength.test(password.trim())) {
      throw new Exception('password must be at least 8 characters long.', 400, Exception.INVALID);
    }
  }
}
