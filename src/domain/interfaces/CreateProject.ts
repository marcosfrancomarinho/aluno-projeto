import { Project } from '../entities/Project';
import { ID } from '../valueobject/ID';

export interface CreateProject {
  create(project: Project): Promise<ID>;
}
