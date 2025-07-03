import { SignUpUserRequestDTO } from '../../application/dto/SignUpUserRequestDTO';
import { SignUpUserResponseDTO } from '../../application/dto/SignUpUserResponseDTO';
import { SignUpUserUseCase } from '../../application/usecase/SignUpUserUseCase';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { HttpControllers } from '../../domain/interfaces/HttpController';

export class SignUpUserControllers implements HttpControllers {
  public constructor(private signUpUserUseCase: SignUpUserUseCase) {}

  public async execute(httpContext: HttpContext): Promise<void> {
    try {
      const { name, email, password } = httpContext.getRequestBody();
      const signUpUserRequestDTO: SignUpUserRequestDTO = new SignUpUserRequestDTO(name, email, password);
      const signUpUserResponseDTO: SignUpUserResponseDTO = await this.signUpUserUseCase.sign(signUpUserRequestDTO);
      httpContext.send(201, signUpUserResponseDTO.toObject());
    } catch (error) {
      httpContext.sendError(error);
    }
  }
}
