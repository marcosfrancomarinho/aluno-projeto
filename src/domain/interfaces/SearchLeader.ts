import { Leader } from '../entities/Leader';

export interface SearchLeader {
  execute(leader: Leader): Promise<Leader | null>;
}
