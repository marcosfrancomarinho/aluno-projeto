import jwt from 'jsonwebtoken';
import { User } from '../../domain/entities/User';
import { Payload, UserAuthenticator } from '../../domain/interfaces/UserAuthenticator';
import { Token } from '../../domain/valueobject/Token';

export class JwtUserAuthenticator implements UserAuthenticator {
  public generateToken(user: User): Token {
    const userId: string = user.getId();
    const keySecret = process.env.KEY_SECRET as string;
    const hash: string = jwt.sign({ userId }, keySecret, { expiresIn: '1d' });
    return Token.create(hash);
  }

  public validateToken(token: Token): Payload {
    const keySecret = process.env.KEY_SECRET as string;
    const payload = jwt.verify(token.getValue(), keySecret) as Payload;
    return payload;
  }
}

