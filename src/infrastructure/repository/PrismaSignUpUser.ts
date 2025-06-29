import { User } from '../../domain/entities/User';
import { SignUpUser } from '../../domain/interfaces/SignUpUser';
import { Client } from './Client';

export class PrismaSignUpUser implements SignUpUser {
  public async sign(user: User): Promise<void> {
    const data = {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
      algorithm: user.getAlgorithm(),
    };
    await Client.user.create({ data });
  }
}
