import { LeaderRequestDTO } from '../../application/dto/LeaderRequestDTO';
import { Leader } from '../entities/Leader';

export interface ValidatedLeaderCreatorServices {
  create(input: LeaderRequestDTO): Promise<Leader>;
}
