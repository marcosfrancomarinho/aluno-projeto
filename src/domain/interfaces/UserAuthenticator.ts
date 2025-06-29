import { User } from '../entities/User';
import { Token } from '../valueobject/Token';

export interface UserAuthenticator {
  genereteToken(user: User): Token;
  validateToken(token: Token): void;
}
