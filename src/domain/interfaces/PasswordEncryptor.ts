import { Password } from '../valueobject/Password';

export interface PasswordEncryptor {
  encrypt(password: Password): Promise<Password>;
  validatePasswordHash(password: string, passwordHash: string): Promise<boolean>;
}
