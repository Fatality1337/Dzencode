import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { store } from './app/store';
import { AppShell } from './app/layout/AppShell';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import './app/styles/global.css';
import './shared/i18n';

const OrdersPage = lazy(() => import('./pages/OrdersPage/OrdersPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage/ProductsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const GroupsPage = lazy(() => import('./pages/GroupsPage/GroupsPage'));
const UsersPage = lazy(() => import('./pages/UsersPage/UsersPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage/SettingsPage'));

function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Suspense fallback={<div className="page-loading">Загрузка раздела…</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/orders" replace />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/groups" element={<GroupsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AppShell>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
);
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'));
