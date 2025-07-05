export interface TemplateRenderer {
    render(path: string, object: any): Promise<string>;
}