import { LeaderRequestDTO } from '../../dto/LeaderRequestDTO';
import {  LeaderResponseDTO } from '../../dto/LeaderResponseDTO';

export interface LeaderCreatorUseCase {
  create(input: LeaderRequestDTO): Promise<LeaderResponseDTO>;
}
