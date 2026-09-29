import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product, ProductType } from '../../shared/types/domain';
import { seedProducts } from '../../shared/data/seed';
import { productsApi } from '../../shared/api/productsApi';
import type { ProductPayload } from '../../shared/api/productsApi';
interface ProductsState {
  items: Product[];
  filter: ProductType | 'all';
  loading: boolean;
  error: string | null;
}
const initialState: ProductsState = { items: seedProducts, filter: 'all', loading: false, error: null };
export const fetchProducts = createAsyncThunk('products/fetch', () => productsApi.list());
export const createProduct = createAsyncThunk('products/create', (data: ProductPayload) => productsApi.create(data));
export const updateProduct = createAsyncThunk(
  'products/update',
  ({ id, data }: { id: number; data: Partial<ProductPayload> }) => productsApi.update(id, data),
);
export const removeProduct = createAsyncThunk('products/remove', (id: number) => productsApi.remove(id).then(() => id));
const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<ProductType | 'all'>) => {
      state.filter = action.payload;
      window.localStorage.setItem('inventory-product-filter', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Не удалось загрузить продукты';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index >= 0) state.items[index] = action.payload;
        state.loading = false;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.loading = false;
      })
      .addMatcher(
        (action) => action.type.startsWith('products/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) => action.type.startsWith('products/') && action.type.endsWith('/rejected'),
        (state) => {
          state.loading = false;
          state.error = 'Операция с продуктом не выполнена';
        },
      );
  },
});
export const { setFilter } = slice.actions;
export default slice.reducer;
