export interface HttpClient {
  get<K>(url: string, config?: Record<string, unknown>): Promise<K>;

  post<T, K>(
    url: string,
    data?: T,
    config?: Record<string, unknown>
  ): Promise<K>;

  put<T, K>(
    url: string,
    data?: T,
    config?: Record<string, unknown>
  ): Promise<K>;

  delete<K>(url: string, config?: Record<string, unknown>): Promise<K>;
}
