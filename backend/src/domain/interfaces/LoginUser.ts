import { User } from '../entities/User';

export interface LoginUser {
  login(user: User): Promise<User | null>;
}
