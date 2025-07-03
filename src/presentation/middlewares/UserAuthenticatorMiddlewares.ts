import { HttpContext } from '../../domain/interfaces/HttpContext';
import { HttpControllers } from '../../domain/interfaces/HttpController';
import { UserAuthenticator } from '../../domain/interfaces/UserAuthenticator';
import { Token } from '../../domain/valueobject/Token';

export class UserAuthenticatorMiddlewares implements HttpControllers {
  public constructor(private userAuthenticator: UserAuthenticator) {}

  async execute(http: HttpContext): Promise<void> {
    try {
      const token: Token = Token.create(http.getToken('token'));
      this.userAuthenticator.validateToken(token);
    } catch (error) {
      http.sendError(error);
    }
  }
}
