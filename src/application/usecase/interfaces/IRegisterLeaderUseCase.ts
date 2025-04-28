import { InputLeaderDTO } from '../../dto/InputLeaderDTO';
import { OutputLeaderDTO } from '../../dto/OutputLeaderDTO';

export interface IRegisterLeaderUseCase {
  register(input: InputLeaderDTO): Promise<OutputLeaderDTO>;
}
