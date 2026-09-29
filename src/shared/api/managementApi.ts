import { apiClient } from './client';
import type { Group, User } from '../types/domain';
export const managementApi = {
  groups: {
    list: () => apiClient.get<Group[]>('/groups').then((r) => r.data),
    create: (data: Omit<Group, 'id'>) => apiClient.post<Group>('/groups', data).then((r) => r.data),
    update: (id: number, data: Partial<Group>) => apiClient.patch<Group>(`/groups/${id}`, data).then((r) => r.data),
    remove: (id: number) => apiClient.delete(`/groups/${id}`),
  },
  users: {
    list: () => apiClient.get<User[]>('/users').then((r) => r.data),
    create: (data: Omit<User, 'id'>) => apiClient.post<User>('/users', data).then((r) => r.data),
    update: (id: number, data: Partial<User>) => apiClient.patch<User>(`/users/${id}`, data).then((r) => r.data),
    remove: (id: number) => apiClient.delete(`/users/${id}`),
  },
};
