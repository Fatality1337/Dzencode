import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
const allProducts = (state: RootState) => state.products.items;
const filter = (state: RootState) => state.products.filter;
const search = (state: RootState) => state.ui.search;
export const selectFilteredProducts = createSelector([allProducts, filter, search], (products, current, query) => {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  return products.filter((product) => (current === 'all' || product.type === current) && (!normalizedQuery || [product.name, product.serialNumber, product.type, product.status].some((value) => value.toLocaleLowerCase().includes(normalizedQuery))));
});
