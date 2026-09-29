import type { RootState } from './index';
import { selectFilteredProducts } from '../../features/filterProducts/filterProductsSelector';
export const selectOrders = (state: RootState) => state.orders.items;
export const selectSelectedOrder = (state: RootState) => state.orders.items.find((order) => order.id === state.orders.selectedId) ?? null;
export const selectProducts = selectFilteredProducts;
