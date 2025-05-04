import { EnrollRequestDTO } from '../../application/dto/EnrollRequestDTO';
import { Enrollment } from '../entities/Enrollment';

export interface ValidateEnrollmentCreatorServices {
  create(input: EnrollRequestDTO): Promise<Enrollment>;
}
