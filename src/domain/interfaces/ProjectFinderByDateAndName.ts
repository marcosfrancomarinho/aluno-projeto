import { Project } from '../entities/Project';
import { Specialty } from '../valueobject/Specialty';

export interface ProjectFinderByDateAndName {
  find(specialty: Specialty): Promise<Project | null>;
}
