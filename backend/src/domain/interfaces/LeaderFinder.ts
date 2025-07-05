import { Leader } from '../entities/Leader';

export interface LeaderFinder {
  find(leader: Leader): Promise<Leader | null>;
}
