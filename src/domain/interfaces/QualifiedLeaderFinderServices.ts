import { EnrollRequestDTO } from '../../application/dto/EnrollRequestDTO';
import { Leader } from '../entities/Leader';
import { Project } from '../entities/Project';

export type LeaderRequest = EnrollRequestDTO['leader'];

export interface QualifiedLeaderFinderServices {
  find(input: LeaderRequest, project: Project): Promise<Leader>;
}
