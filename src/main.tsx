import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { store } from './app/store';
import { AppShell } from './app/layout/AppShell';
import './app/styles/global.css';

const OrdersPage = lazy(() => import('./pages/OrdersPage/OrdersPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage/ProductsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

function App() {
  return <BrowserRouter><AppShell><Suspense fallback={<div className="page-loading">Загрузка раздела…</div>}><Routes>
    <Route path="/" element={<Navigate to="/orders" replace />} />
    <Route path="/orders" element={<OrdersPage />} />
    <Route path="/products" element={<ProductsPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes></Suspense></AppShell></BrowserRouter>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><Provider store={store}><App /></Provider></React.StrictMode>);
