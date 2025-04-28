import { Project } from '../entities/Project';
import { ID } from '../valueobject/ID';

export interface CreateProject {
  execute(project: Project): Promise<ID>;
}
