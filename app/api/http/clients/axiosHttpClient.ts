import { axiosInstance } from "../axiosInstance";
import { HttpClient } from "../httpInstance";

export class AxiosHttpClient implements HttpClient {
  private axios = axiosInstance;

  async get<T>(url: string, config?: Record<string, unknown>): Promise<T> {
    const response = await this.axios.get(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: Record<string, unknown>
  ): Promise<T> {
    const response = await this.axios.post(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: Record<string, unknown>
  ): Promise<T> {
    const response = await this.axios.put(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: Record<string, unknown>): Promise<T> {
    const response = await this.axios.delete(url, config);
    return response.data;
  }
}
