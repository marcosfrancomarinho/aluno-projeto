import { EnrollRequestDTO } from '../../dto/EnrollRequestDTO';
import { EnrollResponseDTO } from '../../dto/EnrollResponseDTO';

export interface StudentEnrollerInProjectUseCase {
  enroll(input: EnrollRequestDTO): Promise<EnrollResponseDTO>;
}
