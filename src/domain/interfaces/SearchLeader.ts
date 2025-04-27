import { Leader } from '../entities/Leader';

export interface SearchLeader {
  search(leader: Leader): Promise<Leader | null>;
}
