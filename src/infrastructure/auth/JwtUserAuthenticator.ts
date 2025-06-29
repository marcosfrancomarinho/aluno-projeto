import { User } from '../../domain/entities/User';
import { UserAuthenticator } from '../../domain/interfaces/UserAuthenticator';
import { Token } from '../../domain/valueobject/Token';
import jwt from 'jsonwebtoken';

export class JwtUserAuthenticator implements UserAuthenticator {
  public genereteToken(user: User): Token {
    const userId: string = user.getId();
    const keySecret = process.env.KEY_SECRET as string;
    const hash: string = jwt.sign({ userId }, keySecret, { expiresIn: '1d' });
    return Token.create(hash);
  }

  public validateToken(token: Token): void {
    throw new Error('no implement');
  }
}
