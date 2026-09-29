import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Order, OrderId } from '../../shared/types/domain';
import { seedOrders } from '../../shared/data/seed';
interface OrdersState { items: Order[]; selectedId: OrderId | null; loading: boolean; error: string | null; }
const initialState: OrdersState = { items: seedOrders, selectedId: seedOrders[0].id, loading: false, error: null };
const slice = createSlice({ name: 'orders', initialState, reducers: { selectOrder: (state, action: PayloadAction<OrderId | null>) => { state.selectedId = action.payload; }, deleteOrder: (state, action: PayloadAction<OrderId>) => { state.items = state.items.filter((order) => order.id !== action.payload); if (state.selectedId === action.payload) state.selectedId = null; } } });
export const { selectOrder, deleteOrder } = slice.actions; export default slice.reducer;
