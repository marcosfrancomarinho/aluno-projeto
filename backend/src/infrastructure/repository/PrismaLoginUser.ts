import { User } from '../../domain/entities/User';
import { LoginUser } from '../../domain/interfaces/LoginUser';
import { Algorithm } from '../../domain/valueobject/Algorithm';
import { Email } from '../../domain/valueobject/Email';
import { ID } from '../../domain/valueobject/ID';
import { Name } from '../../domain/valueobject/Name';
import { Password } from '../../domain/valueobject/Password';
import { Client } from './Client';

export class PrismaLoginUser implements LoginUser {
  public async login(user: User): Promise<User | null> {
    const email: string = user.getEmail();
    const foundUser = await Client.user.findUnique({ where: { email } });

    if (!foundUser) return null;

    return User.create(
      Email.create(foundUser.email),
      Password.with(foundUser.password),
      Algorithm.create(foundUser.algorithm),
      ID.create(foundUser.id),
      Name.create(foundUser.name)
    );
  }
}
