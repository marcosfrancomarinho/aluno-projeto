import { Exception } from '../../shared/error/Exception';
import { User } from '../entities/User';
import { PasswordEncryptor } from '../interfaces/PasswordEncryptor';

export class VerifyUserCredentialsServices {
  public constructor(private passwordEncryptor: PasswordEncryptor) {}

  public async verify(user: User, foundUser: User | null): Promise<void> {
    if (!foundUser) throw new Exception('Invalid email or password', 400, Exception.INVALID_CREDENTIALS);
    const isPassswordCorrect: boolean = await this.passwordEncryptor.validatePasswordHash(
      user.getPassword(),
      foundUser.getPassword()
    );
    if (!isPassswordCorrect) throw new Exception('Invalid email or password', 400, Exception.INVALID_CREDENTIALS);
  }
}
