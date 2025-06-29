import { AllProjectResponseDTO } from '../../application/dto/AllProjectResponseDTO';
import { AllProjectFinderUseCase } from '../../application/usecase/AllProjectFinderUseCase';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { HttpController } from '../../domain/interfaces/HttpController';

export class AllProjectFinderControllers implements HttpController {
  public constructor(private allProjectFinderUseCase: AllProjectFinderUseCase) {}

  public async execute(http: HttpContext): Promise<void> {
    try {
      const allProjectResponseDTO: AllProjectResponseDTO[] = await this.allProjectFinderUseCase.findAll();
      http.send(200, allProjectResponseDTO);
    } catch (error) {
      http.sendError(error);
    }
  }
}
