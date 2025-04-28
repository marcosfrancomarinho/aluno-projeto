import { Leader } from '../entities/Leader';
import { ID } from '../valueobject/ID';

export interface RegisterLeader {
  execute(leader: Leader): Promise<ID>;
}
