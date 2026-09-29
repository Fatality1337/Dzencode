import type { Currency, Product } from '../types/domain';
export const rates: Record<Currency, number> = { USD: 1, EUR: 1.08, UAH: 0.027 };
export const formatCurrency = (value: number, currency: Currency = 'USD') =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);
export const convertPrice = (value: number, from: Currency, to: Currency) => (value * rates[from]) / rates[to];
export const calculateOrderTotal = (products: Product[]) =>
  products.reduce((total, product) => total + convertPrice(product.price, product.currency, 'USD'), 0);
export const formatDate = (value: string) =>
  new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(value));
