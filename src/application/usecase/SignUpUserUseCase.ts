import { User } from '../../domain/entities/User';
import { IdGenerator } from '../../domain/interfaces/IdGenerator';
import { PasswordEncryptor } from '../../domain/interfaces/PasswordEncryptor';
import { SignUpUser } from '../../domain/interfaces/SignUpUser';
import { Algorithm } from '../../domain/valueobject/Algorithm';
import { Email } from '../../domain/valueobject/Email';
import { ID } from '../../domain/valueobject/ID';
import { Name } from '../../domain/valueobject/Name';
import { Password } from '../../domain/valueobject/Password';
import { SignUpUserRequestDTO } from '../dto/SignUpUserRequestDTO';
import { SignUpUserResponseDTO } from '../dto/SignUpUserResponseDTO';

export class SignUpUserUseCase {
  public constructor(
    private signUpUser: SignUpUser,
    private idGenerator: IdGenerator,
    private passwordEncyptor: PasswordEncryptor
  ) {}

  public async sign(signUserDTO: SignUpUserRequestDTO): Promise<SignUpUserResponseDTO> {
    const name: Name = Name.create(signUserDTO.getName());
    const email: Email = Email.create(signUserDTO.getEmail());
    const algorithm: Algorithm = Algorithm.create('bcrypt');
    const password: Password = Password.create(signUserDTO.getPassword());
    const hashPassword: Password = await this.passwordEncyptor.encrypt(password);
    const id: ID = this.idGenerator.generete();
    const user: User = User.create(email, hashPassword, algorithm, id, name);
    await this.signUpUser.sign(user);
    const signUpUserResponseDTO: SignUpUserResponseDTO = new SignUpUserResponseDTO(id.getValue());
    return signUpUserResponseDTO;
  }
}
