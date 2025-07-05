import { Project } from '../entities/Project';
import { ID } from '../valueobject/ID';

export interface ProjectCreator {
  create(project: Project): Promise<ID>;
}
