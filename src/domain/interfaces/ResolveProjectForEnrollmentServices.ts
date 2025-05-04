import { EnrollRequestDTO } from '../../application/dto/EnrollRequestDTO';
import { Project } from '../entities/Project';

export type EnrollRequest = EnrollRequestDTO['project'];

export interface ResolveProjectForEnrollmentServices {
  resolve(input: EnrollRequestDTO): Promise<Project>;
}
