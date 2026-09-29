import type { RootState } from './index';
export const selectOrders = (state: RootState) => state.orders.items;
export const selectSelectedOrder = (state: RootState) => state.orders.items.find((order) => order.id === state.orders.selectedId) ?? null;
export const selectProducts = (state: RootState) => state.products.items.filter((product) => state.products.filter === 'all' || product.type === state.products.filter);
