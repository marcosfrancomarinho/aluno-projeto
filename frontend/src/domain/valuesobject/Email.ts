export class Email {
  private constructor(private email: string) {
  }

  public getValue(): string {
    return this.email;
  }
  public static create(email: string): Email {
    this.validate(email);
    return new Email(email.trim());
  }

  private static validate(email: string): void {
    const regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) throw new Error('Email é obrigatório.');

    if (typeof email !== 'string') throw new Error('O e-mail deve ser uma string.');

    if (!regex.test(email.trim())) throw new Error('Formato de e-mail inválido.');
  }
}
