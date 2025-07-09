import type { Email } from '../valuesobject/Email';
import type { Password } from '../valuesobject/Password';

export class User {
  private constructor(private email: Email, private password: Password) {
  }

  public static create(email: Email, password: Password): User {
    return new User(email, password);
  }

  public getEmail(): string {
    return this.email.getValue();
  }

  public getPassword(): string {
    return this.password.getValue();
  }

  public getDataToAuthenticate() {
    return {
      email: this.email.getValue(),
      password: this.password.getValue(),
    };
  }
}
