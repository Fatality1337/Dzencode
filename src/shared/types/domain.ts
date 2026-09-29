export type OrderId = number;
export type ProductId = number;
export type Currency = 'USD' | 'EUR' | 'UAH';
export type ProductType = 'Ноутбуки' | 'Мониторы' | 'Периферия' | 'Планшеты' | 'Аксессуары';
export type ProductStatus = 'Свободен' | 'В ремонте' | 'Списан';

export interface Product {
  id: ProductId;
  name: string;
  serialNumber: string;
  type: ProductType;
  status: ProductStatus;
  price: number;
  currency: Currency;
  warrantyUntil: string;
  orderId: OrderId;
  image?: string;
}
export interface Order {
  id: OrderId;
  name: string;
  createdAt: string;
  supplier: string;
  products: Product[];
}
export interface Group {
  id: number;
  name: string;
  description: string;
}
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}
