import { PasswordEncryptor } from '../../domain/interfaces/PasswordEncryptor';
import { Password } from '../../domain/valueobject/Password';
import bcrypt from 'bcrypt';

export class BcryptPasswordEncryptor implements PasswordEncryptor {
  public async encrypt(password: Password): Promise<Password> {
    const salt: number = 10;
    const hash: string = await bcrypt.hash(password.getValue(), salt);
    return Password.with(hash);
  }

  public async validatePasswordHash(password: Password, passwordHash: Password): Promise<boolean> {
    throw new Error('not yet implemented');
  }
}
