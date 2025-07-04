import { User } from '../../domain/entities/User';
import { LoginUser } from '../../domain/interfaces/LoginUser';
import { UserAuthenticator } from '../../domain/interfaces/UserAuthenticator';
import { VerifyUserCredentialsServices } from '../../domain/services/VerifyUserCredentialsServices';
import { Email } from '../../domain/valueobject/Email';
import { Password } from '../../domain/valueobject/Password';
import { Token } from '../../domain/entities/Token';
import { LoginUserRequestDTO } from '../dto/LoginUserRequestDTO';
import { LoginUserResponseDTO } from '../dto/LoginUserResponseDTO';

export class LoginUserUseCase {
  public constructor(
    private loginUser: LoginUser,
    private userAuthenticator: UserAuthenticator,
    private verifyUserCredentialsServices: VerifyUserCredentialsServices
  ) {}

  public async login(loginUserDTO: LoginUserRequestDTO): Promise<LoginUserResponseDTO> {
    const email: Email = Email.create(loginUserDTO.getEmail());
    const password: Password = Password.create(loginUserDTO.getPassword());
    const user: User = User.with(email, password);
    const foundUser: User | null = await this.loginUser.login(user);
    await this.verifyUserCredentialsServices.verify(user, foundUser);
    const token: Token = this.userAuthenticator.generateToken(foundUser as User);
    const loginUserResponseDTO: LoginUserResponseDTO = new LoginUserResponseDTO(token.getValue());
    return loginUserResponseDTO;
  }
}
