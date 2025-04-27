import { InputDTO } from '../../dto/leader/InputDTO';
import { OutputDTO } from '../../dto/leader/OutputDTO';

export interface IRegisterLeaderUseCase {
  register(input: InputDTO): Promise<OutputDTO>;
}
