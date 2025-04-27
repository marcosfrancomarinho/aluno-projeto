import { Leader } from '../entities/Leader';
import { ID } from '../valueobject/ID';

export interface RegisterLeader {
  register(leader: Leader): Promise<ID>;
}
