import type { Request, Response } from 'express';
import { z } from 'zod';
import { ProductService } from '../services/productService.js';
const service = new ProductService();
const schema = z.object({
  name: z.string().min(2),
  type: z.string().min(1),
  price: z.number().positive(),
  warrantyUntil: z.string().date(),
  orderId: z.number().int().positive(),
});
export const listProducts = async (_req: Request, res: Response) => res.json(await service.list());
export const createProduct = async (req: Request, res: Response) => {
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ message: 'Invalid product' });
  return res.status(201).json(await service.create(result.data));
};
export const updateProduct = async (req: Request, res: Response) => {
  const result = schema.partial().safeParse(req.body);
  if (!result.success) return res.status(400).json({ message: 'Invalid product' });
  const product = await service.update(Number(req.params.id), result.data);
  return product ? res.json(product) : res.status(404).json({ message: 'Product not found' });
};
export const deleteProduct = async (req: Request, res: Response) =>
  (await service.delete(Number(req.params.id)))
    ? res.status(204).send()
    : res.status(404).json({ message: 'Product not found' });
