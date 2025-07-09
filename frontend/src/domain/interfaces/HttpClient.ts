export interface HttpClient {
  post<T>(url: string, data: any): Promise<T>;
}
