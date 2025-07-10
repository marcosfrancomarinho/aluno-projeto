import type { StorageClient } from '../domain/interfaces/StorageClient';

export class LocalStorageClient implements StorageClient {
  public get<T>(key: string): T {
    const data = window.localStorage.getItem(key);
    if (!data) throw new Error(`"Chave ${key}' não encontrada no armazenamento local."`);
    return data as T;
  }
  public set(key: string, datas: any): void {
    localStorage.setItem(key, JSON.stringify(datas));
  }
  public delete(key: string): void {
    localStorage.removeItem(key);
  }
}
