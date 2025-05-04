import { EnrollRequestDTO } from '../../application/dto/EnrollRequestDTO';
import { Leader } from '../entities/Leader';
import { Project } from '../entities/Project';

export type LeaderRquest = EnrollRequestDTO['leader'];

export interface QualifiedLeaderFinderServices {
  find(input: LeaderRquest, project: Project): Promise<Leader>;
}
