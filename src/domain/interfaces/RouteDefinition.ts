export type RouteDefinition = {
  get(path: string, ...handlers: any[]): void;
  post(path: string, ...handlers: any[]): void;
  put(path: string, ...handlers: any[]): void;
  delete(path: string, ...handlers: any[]): void;
};
