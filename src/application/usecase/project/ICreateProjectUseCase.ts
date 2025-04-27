import { InputDTO } from '../../dto/project/InputDTO';
import { OutputDTO } from '../../dto/project/OutputDTO';

export interface ICreateProjectUseCase {
  create(input: InputDTO): Promise<OutputDTO>;
}
