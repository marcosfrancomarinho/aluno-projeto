import { User } from '../entities/User';

export interface SignUpUser {
  sign(user: User): Promise<void>;
}
