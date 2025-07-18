import { AllProjectResponseDTO } from '../../application/dto/AllProjectResponseDTO';
import { AllProjectFinderUseCase } from '../../application/usecase/AllProjectFinderUseCase';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { HttpControllers } from '../../domain/interfaces/HttpController';

export class AllProjectFinderControllers implements HttpControllers {
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
