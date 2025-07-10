import axios, { type AxiosInstance } from 'axios';
import type { HttpClient } from '../domain/interfaces/HttpClient';

export class AxiosHttpClient implements HttpClient {
  private instance: AxiosInstance;
  public constructor(baseURL: string) {
    this.instance = axios.create({ baseURL });
  }

  async post<T>(url: string, data: any): Promise<T> {
    try {
      const response = await this.instance.post<T>(url, data);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response.data.code === 'INVALID_CREDENTIALS') {
        throw new Error('Email ou senha inválida.');
      }
      throw new Error(error.response.data.message);
    }
  }
}
