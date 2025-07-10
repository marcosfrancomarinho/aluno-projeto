export interface StorageClient {
  set(key: string, datas: any): void;
  get<T>(key: string): T;
  delete(key: string): void;
}
