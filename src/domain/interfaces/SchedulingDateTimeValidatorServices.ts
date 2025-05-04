import { EnrollRequestDTO } from '../../application/dto/EnrollRequestDTO';
import { Scheduling } from '../entities/Scheduling';


export interface SchedulingDateTimeValidatorServices {
  validate(input: EnrollRequestDTO): Promise<Scheduling>;
}
