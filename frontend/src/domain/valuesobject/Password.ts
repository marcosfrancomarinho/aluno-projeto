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
      throw new Error('A senha é obrigatória.');
    }

    if (typeof password !== 'string') {
      throw new Error('A senha deve ser uma string.');
    }

    if (!hasUppercase.test(password.trim())) {
      throw new Error('A senha deve conter pelo menos uma letra maiúscula.');
    }

    if (!hasLowercase.test(password.trim())) {
      throw new Error('A senha deve conter pelo menos uma letra minúscula.');
    }

    if (!hasNumber.test(password.trim())) {
      throw new Error('A senha deve conter pelo menos um número.');
    }

    if (!hasSymbol.test(password.trim())) {
      throw new Error('A senha deve conter pelo menos um símbolo.');
    }

    if (!hasMinLength.test(password.trim())) {
      throw new Error('A senha deve ter pelo menos 8 caracteres.');
    }
  }
}
