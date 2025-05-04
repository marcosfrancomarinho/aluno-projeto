import { LeaderContactResquestDTO } from '../../dto/LeaderContactRequestDTO';
import { LeaderContactResponseDTO } from '../../dto/LeaderContactResponseDTO';

export interface ProjectBasedAdvisorFinderUseCase {
  findAll(input: LeaderContactResquestDTO): Promise<LeaderContactResponseDTO[]>;
}
