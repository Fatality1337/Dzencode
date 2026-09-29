import { eventBus } from '../events/eventBus.js';
import { ProductRepository } from '../repositories/productRepository.js';
import { PrismaProductRepository } from '../repositories/prismaProductRepository.js';
import type { CreateProductInput } from '../domain.js';
import type { ProductRepositoryContract } from '../repositories/productRepositoryTypes.js';
const repository: ProductRepositoryContract =
  process.env.USE_DATABASE === 'true' ? new PrismaProductRepository() : new ProductRepository();
export class ProductService {
  constructor(private readonly repo: ProductRepositoryContract = repository) {}
  list() {
    return this.repo.findAll();
  }
  create(input: CreateProductInput) {
    const result = this.repo.create(input);
    eventBus.emit('PRODUCT_CREATED', { name: input.name });
    return result;
  }
  update(id: number, input: Partial<CreateProductInput>) {
    return this.repo.update(id, input);
  }
  delete(id: number) {
    const result = this.repo.delete(id);
    if (result) eventBus.emit('PRODUCT_DELETED', { id });
    return result;
  }
}
