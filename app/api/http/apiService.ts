import { TUser } from "@/app/types/userTypes";
import { HttpClient } from "./httpInstance";

interface IApiService {
  login(params: Partial<TUser>): Promise<{ token: string }>;
}

class ApiServiceImpl implements IApiService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async login({ email, password }: Partial<TUser>): Promise<{ token: string }> {
    const response = await this.httpClient.post<
      Partial<TUser>,
      { token: string }
    >("/user/login", {
      email,
      password,
    });

    return response;
  }

  async register({
    name,
    email,
    password,
  }: Partial<TUser>): Promise<{ token: string }> {
    const response = await this.httpClient.post<
      Partial<TUser>,
      { token: string }
    >("/user/register", {
      name,
      email,
      password,
    });

    return response;
  }
}

export default ApiServiceImpl;
