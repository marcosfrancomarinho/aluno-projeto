import { InputProjectDTO } from '../../dto/InputProjectDTO';
import { OutputProjectDTO } from '../../dto/OutputProjectDTO';

export interface ICreateProjectUseCase {
  create(input: InputProjectDTO): Promise<OutputProjectDTO>;
}
