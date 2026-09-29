import { configureStore } from '@reduxjs/toolkit'; import orders from './ordersSlice'; import products from './productsSlice'; import ui from './uiSlice'; import settings from './settingsSlice';
export const store = configureStore({ reducer: { orders, products, ui, settings } }); export type RootState = ReturnType<typeof store.getState>; export type AppDispatch = typeof store.dispatch;
