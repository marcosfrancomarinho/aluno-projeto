import { Leader } from '../entities/Leader';
import { ID } from '../valueobject/ID';

export interface LeaderCreator {
  create(leader: Leader): Promise<ID>;
}
