import { User } from '../entities/User';
import { Token } from '../valueobject/Token';

export interface UserAuthenticator {
  generateToken(user: User): Token;
  validateToken(token: Token): void;
}
