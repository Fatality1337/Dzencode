import { products } from '../data.js';
import type { CreateProductInput, Product } from '../domain.js';
import type { ProductRepositoryContract } from './productRepositoryTypes.js';
export class ProductRepository implements ProductRepositoryContract {
  findAll() {
    return products;
  }
  create(input: CreateProductInput) {
    const product: Product = {
      id: Math.max(...products.map((item) => item.id)) + 1,
      name: input.name,
      serialNumber: `NEW-${Date.now()}`,
      type: input.type,
      status: 'Свободен',
      price: input.price,
      currency: 'USD',
      warrantyUntil: input.warrantyUntil,
      orderId: input.orderId,
    };
    products.push(product);
    return product;
  }
  update(id: number, input: Partial<CreateProductInput>) {
    const product = products.find((item) => item.id === id);
    if (!product) return undefined;
    Object.assign(product, input);
    return product;
  }
  delete(id: number) {
    const index = products.findIndex((item) => item.id === id);
    if (index < 0) return false;
    products.splice(index, 1);
    return true;
  }
}
