import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { store } from './app/store';
import { AppShell } from './app/layout/AppShell';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { useAppSelector } from './app/store/hooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app/styles/global.css';
import './shared/i18n';

const OrdersPage = lazy(() => import('./pages/OrdersPage/OrdersPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage/ProductsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const GroupsPage = lazy(() => import('./pages/GroupsPage/GroupsPage'));
const UsersPage = lazy(() => import('./pages/UsersPage/UsersPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage/SettingsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const WarehousesPage = lazy(() => import('./pages/WarehousesPage/WarehousesPage'));

function App() {
  const { pathname } = useLocation();
  const token = useAppSelector((state) => state.auth.token);
  if (!token && pathname !== '/login') return <Navigate to="/login" replace />;
  if (token && pathname === '/login') return <Navigate to="/orders" replace />;
  if (pathname === '/login') return <Suspense fallback={null}><LoginPage /></Suspense>;
  return (
    <AppShell>
      <div key={pathname} className="route-view">
        <Suspense fallback={<div className="page-loading">Загрузка раздела…</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/orders" replace />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/groups" element={<GroupsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/warehouses" element={<WarehousesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </AppShell>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
);
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'));
