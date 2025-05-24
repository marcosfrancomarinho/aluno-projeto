import { HttpContext } from './HttpContext';

export interface ControllerHttp {
  execute(http: HttpContext): Promise<void>;
}
