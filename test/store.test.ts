import { describe, expect, it } from 'vitest';
import ordersReducer, { deleteOrder } from '../src/app/store/ordersSlice';
import productsReducer, { setFilter } from '../src/app/store/productsSlice';
import { seedOrders } from '../src/shared/data/seed';

describe('Redux slices', () => {
  it('deletes selected order and clears selection', () => {
    const state = ordersReducer({ items: seedOrders, selectedId: 1, loading: false, error: null }, deleteOrder(1));
    expect(state.items).toHaveLength(2);
    expect(state.selectedId).toBeNull();
  });

  it('stores a valid product filter', () => {
    expect(productsReducer(undefined, setFilter('Ноутбуки')).filter).toBe('Ноутбуки');
  });
});
