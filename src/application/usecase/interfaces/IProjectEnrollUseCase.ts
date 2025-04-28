import { InputEnrollDTO } from '../../dto/InputEnrollDTO';
import { OutputEnrollDTO } from '../../dto/OutputEnrollDTO';

export interface IProjectEnrollUseCase {
  create(input: InputEnrollDTO): Promise<OutputEnrollDTO>;
}
