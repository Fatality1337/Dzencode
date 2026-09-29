import type { CreateOrderInput, Order } from '../domain.js';
export interface OrderRepositoryContract {
  findAll(): Promise<Order[]> | Order[];
  findById(id: number): Promise<Order | undefined> | Order | undefined;
  create(input: CreateOrderInput): Promise<Order> | Order;
  delete(id: number): Promise<boolean> | boolean;
}
