import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product, ProductType } from '../../shared/types/domain';
import { seedProducts } from '../../shared/data/seed';
import { productsApi } from '../../shared/api/productsApi';
interface ProductsState { items: Product[]; filter: ProductType | 'all'; loading: boolean; error: string | null; }
const initialState: ProductsState = { items: seedProducts, filter: 'all', loading: false, error: null };
export const fetchProducts = createAsyncThunk('products/fetch', () => productsApi.list());
const slice = createSlice({ name: 'products', initialState, reducers: { setFilter: (state, action: PayloadAction<ProductType | 'all'>) => { state.filter = action.payload; window.localStorage.setItem('inventory-product-filter', action.payload); } }, extraReducers: (builder) => { builder.addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; }).addCase(fetchProducts.fulfilled, (state, action) => { state.items = action.payload; state.loading = false; }).addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? 'Не удалось загрузить продукты'; }); } });
export const { setFilter } = slice.actions; export default slice.reducer;
