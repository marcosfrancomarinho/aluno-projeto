import { SignUpUserRequestDTO } from '../../application/dto/SignUpUserRequestDTO';
import { SignUpUserResponseDTO } from '../../application/dto/SignUpUserResponseDTO';
import { SignUpUserUseCase } from '../../application/usecase/SignUpUserUseCase';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { HttpController } from '../../domain/interfaces/HttpController';

export class SignUpUserControllers implements HttpController {
  public constructor(private signUpUserUseCase: SignUpUserUseCase) {}

  public async execute(http: HttpContext): Promise<void> {
    try {
      const { name, email, password } = http.getRequestBody();
      const signUpUserRequestDTO: SignUpUserRequestDTO = new SignUpUserRequestDTO(name, email, password);
      const signUpUserResponseDTO: SignUpUserResponseDTO = await this.signUpUserUseCase.sign(signUpUserRequestDTO);
      http.send(201, signUpUserResponseDTO.toObject());
    } catch (error) {
      http.sendError(error);
    }
  }
}
