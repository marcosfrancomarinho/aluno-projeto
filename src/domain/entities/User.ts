import { Exception } from '../../shared/error/Exception';
import { Algorithm } from '../valueobject/Algorithm';
import { Email } from '../valueobject/Email';
import { ID } from '../valueobject/ID';
import { Name } from '../valueobject/Name';
import { Password } from '../valueobject/Password';

export class User {
  private constructor(
    private email: Email,
    private password: Password,
    private algorithm?: Algorithm,
    private id?: ID,
    private name?: Name
  ) {}

  public static create(email: Email, password: Password, algorithm: Algorithm, id: ID, name: Name): User {
    return new User(email, password, algorithm, id, name);
  }
  public static with(email: Email, password: Password): User {
    return new User(email, password);
  }
  public getAlgorithm() {
    if (!this.algorithm) throw new Exception('Value algorithm not defined.', 400, Exception.UNDEFINED);
    return this.algorithm.getValue();
  }

  public getName(): string {
    if (!this.name) throw new Exception('Value name not defined.', 400, Exception.UNDEFINED);
    return this.name.getValue();
  }

  public getEmail(): string {
    return this.email.getValue();
  }

  public getPassword(): string {
    return this.password.getValue();
  }
  public getId(): string {
    if (!this.id) throw new Exception('Value ID not defined.', 400, Exception.UNDEFINED);
    return this.id.getValue();
  }
}
