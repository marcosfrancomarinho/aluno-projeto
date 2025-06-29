import { LoginUserRequestDTO } from '../../application/dto/LoginUserRequestDTO';
import { LoginUserResponseDTO } from '../../application/dto/LoginUserResponseDTO';
import { LoginUserUseCase } from '../../application/usecase/LoginUserUseCase';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { HttpController } from '../../domain/interfaces/HttpController';

export class LoginUserControllers implements HttpController {
  public constructor(private loginUserUseCase: LoginUserUseCase) {}

  public async execute(httpContext: HttpContext): Promise<void> {
    try {
      const { email, password } = httpContext.getRequestBody();
      const loginUserRequestDTO: LoginUserRequestDTO = new LoginUserRequestDTO(email, password);
      const loginUserResponseDTO: LoginUserResponseDTO = await this.loginUserUseCase.login(loginUserRequestDTO);
      httpContext.send(200, loginUserResponseDTO.toObject(), loginUserResponseDTO.getToken());
    } catch (error) {
      httpContext.sendError(error);
    }
  }
}
