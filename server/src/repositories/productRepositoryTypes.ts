import type { CreateProductInput, Product } from '../domain.js';
export interface ProductRepositoryContract {
  findAll(): Promise<Product[]> | Product[];
  create(input: CreateProductInput): Promise<Product> | Product;
  update(id: number, input: Partial<CreateProductInput>): Promise<Product | undefined> | Product | undefined;
  delete(id: number): Promise<boolean> | boolean;
}
