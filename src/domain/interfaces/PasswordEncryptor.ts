import { Password } from '../valueobject/Password';

export interface PasswordEncryptor {
  encrypt(password: Password): Promise<Password>;
  validatePasswordHash(password: Password, passwordHash: Password): Promise<boolean>;
}
