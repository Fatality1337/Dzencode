import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';
import { selectFilteredProducts } from '../../features/filterProducts/filterProductsSelector';
export const selectOrders = (state: RootState) => state.orders.items;
export const selectSearch = (state: RootState) => state.ui.search;
export const selectProducts = selectFilteredProducts;
export const selectSelectedOrder = (state: RootState) =>
  state.orders.items.find((order) => order.id === state.orders.selectedId) ?? null;
export const selectVisibleOrders = createSelector([selectOrders, selectSearch], (orders, query) => {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  return !normalizedQuery
    ? orders
    : orders.filter((order) =>
        [order.name, order.supplier].some((value) => value.toLocaleLowerCase().includes(normalizedQuery)),
      );
});
