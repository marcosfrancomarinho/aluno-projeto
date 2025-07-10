import { TemplateRenderer } from '../../domain/interfaces/RenderTamplates';
import ejs from 'ejs';

export class EjsTemplateRenderer implements TemplateRenderer {
  public async render(path: string, object: any): Promise<string> {
    return await ejs.renderFile(path, { ...object });
  }
}
