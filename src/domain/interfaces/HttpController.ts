import { HttpContext } from './HttpContext';

export interface HttpController {
  execute(http: HttpContext): Promise<void>;
}
