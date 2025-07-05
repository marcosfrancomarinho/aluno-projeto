import { HttpContext } from './HttpContext';

export interface HttpControllers {
  execute(http: HttpContext): Promise<void>;
}
