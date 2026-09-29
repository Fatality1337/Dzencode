import { describe, expect, it } from 'vitest';
import { store } from '../src/app/store';
import { selectFilteredProducts } from '../src/features/filterProducts/filterProductsSelector';
import { setFilter } from '../src/app/store/productsSlice';
import { setSearch } from '../src/app/store/uiSlice';

describe('product selectors', () => {
  it('filters products by type and global search query', () => {
    const typeState = {
      ...store.getState(),
      products: { ...store.getState().products, filter: 'Ноутбуки' as const },
      ui: { ...store.getState().ui, search: '' },
    };
    expect(selectFilteredProducts(typeState)).toHaveLength(1);
    const searchState = {
      ...store.getState(),
      products: { ...store.getState().products, filter: 'all' as const },
      ui: { ...store.getState().ui, search: 'Dell' },
    };
    expect(selectFilteredProducts(searchState).map((product) => product.name)).toEqual(['Dell UltraSharp U2723QE']);
  });

  it('keeps filter and search actions independent', () => {
    const state = store.getState();
    expect(state.products.filter).toBe('all');
    expect(setFilter('Мониторы').type).toBe('products/setFilter');
    expect(setSearch('MacBook').type).toBe('ui/setSearch');
  });
});
