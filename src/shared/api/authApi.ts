import { apiClient } from './client';

export type AuthUser = { id: number; name: string; email: string; role: string };
export type LoginResponse = { token: string; user: AuthUser };

export const authApi = {
  login: (email: string, password: string) =>
    apiClient.post<LoginResponse>('/auth/login', { email, password }).then((response) => response.data),
};
