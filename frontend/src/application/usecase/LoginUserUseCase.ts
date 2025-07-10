import { User } from '../../domain/entities/User';
import type { HttpClient } from '../../domain/interfaces/HttpClient';
import type { StorageClient } from '../../domain/interfaces/StorageClient';
import { Email } from '../../domain/valuesobject/Email';
import { Password } from '../../domain/valuesobject/Password';
import type { LoginUserRequestDTO } from '../DTO/LoginUserRequestDTO';
import type { LoginUserResponseDTO } from '../DTO/LoginUserResponseDTO';

export class LoginUserUseCase {
  public constructor(private httpClient: HttpClient, private storageClient: StorageClient) {}
  public async login(input: LoginUserRequestDTO): Promise<LoginUserResponseDTO> {
    try {
      const email: Email = Email.create(input.email);
      const password: Password = Password.create(input.password);
      const user: User = User.create(email, password);

      const authenticationResponse: LoginUserResponseDTO = await this.httpClient.post<LoginUserResponseDTO>(
        '/login-user',
        user.getDataToAuthenticate()
      );
      this.storageClient.set('token', authenticationResponse.token);
      return authenticationResponse;
    } catch (error) {
      this.storageClient.delete('token');
      throw error;
    }
  }
}
