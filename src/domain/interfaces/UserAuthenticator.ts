import { User } from '../entities/User';
import { Token } from '../valueobject/Token';
export type Payload = { userId: string; iat: number; exp: number };

export interface UserAuthenticator {
  generateToken(user: User): Token;
  validateToken(token: Token): Payload;
}
