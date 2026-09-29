import { graphqlClient } from './graphqlClient';
import { PRODUCTS_QUERY } from './graphqlQueries';
import { apiClient } from './client';
import type { Product } from '../types/domain';
export type ProductPayload = { name: string; type: string; price: number; warrantyUntil: string; orderId: number };
export const productsApi = {
  list: () =>
    graphqlClient
      .query<{ products: Product[] }>({ query: PRODUCTS_QUERY, fetchPolicy: 'network-only' })
      .then((r) => r.data.products),
  create: (data: ProductPayload) => apiClient.post<Product>('/products', data).then((r) => r.data),
  update: (id: number, data: Partial<ProductPayload>) =>
    apiClient.patch<Product>(`/products/${id}`, data).then((r) => r.data),
  remove: (id: number) => apiClient.delete(`/products/${id}`),
};
