import { apiClient } from './client';
import { graphqlClient } from './graphqlClient';
import { ORDERS_QUERY } from './graphqlQueries';
import type { Order } from '../types/domain';
export interface CreateOrderPayload {
  name: string;
  supplier: string;
  product: { name: string; type: string; price: number; warrantyUntil: string };
}
export const ordersApi = {
  list: () =>
    graphqlClient
      .query<{ orders: Order[] }>({ query: ORDERS_QUERY, fetchPolicy: 'network-only' })
      .then((r) => r.data.orders),
  get: (id: number) => apiClient.get<Order>(`/orders/${id}`).then((r) => r.data),
  create: (payload: CreateOrderPayload) => apiClient.post<Order>('/orders', payload).then((r) => r.data),
  remove: (id: number) => apiClient.delete(`/orders/${id}`),
};
