import { InputDTO } from '../../dto/enroll/InputDTO';
import { OutputDTO } from '../../dto/enroll/OutputDTO';

export interface IProjectEnrollUseCase {
  create(input: InputDTO): Promise<OutputDTO>;
}
