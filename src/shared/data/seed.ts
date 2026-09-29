import type { Order, Product } from '../types/domain';

export const seedProducts: Product[] = [
  { id: 1, name: 'MacBook Pro 16"', serialNumber: 'MBP-16-M2-001', type: 'Ноутбуки', status: 'Свободен', price: 2499, currency: 'USD', warrantyUntil: '2026-09-12', orderId: 1 },
  { id: 2, name: 'Dell UltraSharp U2723QE', serialNumber: 'DEL-U27-023', type: 'Мониторы', status: 'Свободен', price: 685, currency: 'USD', warrantyUntil: '2026-09-12', orderId: 1 },
  { id: 3, name: 'Logitech MX Master 3S', serialNumber: 'LOG-MX3-442', type: 'Периферия', status: 'В ремонте', price: 99, currency: 'USD', warrantyUntil: '2025-09-08', orderId: 2 },
  { id: 4, name: 'Apple iPad Air', serialNumber: 'IPA-AIR-109', type: 'Планшеты', status: 'Свободен', price: 799, currency: 'USD', warrantyUntil: '2026-09-08', orderId: 2 },
  { id: 5, name: 'Sony WH-1000XM5', serialNumber: 'SNY-WH5-781', type: 'Аксессуары', status: 'Списан', price: 349, currency: 'USD', warrantyUntil: '2025-09-01', orderId: 3 },
];
export const seedOrders: Order[] = [
  { id: 1, name: 'Поставка техники Apple', createdAt: '2024-09-12T10:30:00Z', supplier: 'Apple Distribution', products: seedProducts.filter((product) => product.orderId === 1) },
  { id: 2, name: 'Офисная периферия', createdAt: '2024-09-08T10:30:00Z', supplier: 'TechnoHub LLC', products: seedProducts.filter((product) => product.orderId === 2) },
  { id: 3, name: 'Аудио и аксессуары', createdAt: '2024-09-01T10:30:00Z', supplier: 'Sound Store', products: seedProducts.filter((product) => product.orderId === 3) },
];
