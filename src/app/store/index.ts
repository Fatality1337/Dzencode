import { configureStore } from '@reduxjs/toolkit';
import orders from './ordersSlice';
import products from './productsSlice';
import ui from './uiSlice';
import settings from './settingsSlice';
import management from './managementSlice';
export const store = configureStore({ reducer: { orders, products, ui, settings, management } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
