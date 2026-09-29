import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product, ProductType } from '../../shared/types/domain';
import { seedProducts } from '../../shared/data/seed';
interface ProductsState { items: Product[]; filter: ProductType | 'all'; }
const slice = createSlice({ name: 'products', initialState: { items: seedProducts, filter: 'all' } as ProductsState, reducers: { setFilter: (state, action: PayloadAction<ProductType | 'all'>) => { state.filter = action.payload; } } });
export const { setFilter } = slice.actions; export default slice.reducer;
