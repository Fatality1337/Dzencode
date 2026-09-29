import { orders, products } from '../data.js';
import type { CreateOrderInput, Order } from '../domain.js';
export class OrderRepository {
  findAll(): Order[] {
    return orders;
  }
  findById(id: number) {
    return orders.find((order) => order.id === id);
  }
  create(input: CreateOrderInput) {
    const id = Math.max(0, ...orders.map((order) => order.id)) + 1;
    const product = {
      id: Math.max(0, ...products.map((item) => item.id)) + 1,
      name: input.product.name,
      serialNumber: `NEW-${Date.now()}`,
      type: input.product.type,
      status: 'Свободен',
      price: input.product.price,
      currency: 'USD' as const,
      warrantyUntil: input.product.warrantyUntil,
      orderId: id,
    };
    products.push(product);
    const order = {
      id,
      name: input.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      supplier: input.supplier,
      products: [product],
    };
    orders.push(order);
    return order;
  }
  delete(id: number) {
    const index = orders.findIndex((order) => order.id === id);
    if (index < 0) return false;
    orders.splice(index, 1);
    for (let i = products.length - 1; i >= 0; i -= 1) if (products[i].orderId === id) products.splice(i, 1);
    return true;
  }
}
