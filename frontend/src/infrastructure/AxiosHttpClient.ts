import axios, { type AxiosInstance } from 'axios';
import type { HttpClient } from '../domain/interfaces/HttpClient';

export class AxiosHttpClient implements HttpClient {
  private instance: AxiosInstance;
  public constructor(baseURL: string) {
    this.instance = axios.create({ baseURL });
  }

  async post<T>(url: string, data: any): Promise<T> {
    const response = await this.instance.post<T>(url, data);
    return response.data;
  }
}
