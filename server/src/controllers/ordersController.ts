import type { Request, Response } from 'express';
import { z } from 'zod';
import { OrderService } from '../services/orderService.js';
const service = new OrderService();
const createSchema = z.object({
  name: z.string().min(3),
  supplier: z.string().min(2),
  product: z.object({
    name: z.string().min(2),
    type: z.string().min(1),
    price: z.number().positive(),
    warrantyUntil: z.string().date(),
  }),
});
export const listOrders = async (_req: Request, res: Response) => res.json(await service.list());
export const getOrder = async (req: Request, res: Response) => {
  const order = await service.get(Number(req.params.id));
  if (!order) return res.status(404).json({ message: 'Order not found' });
  return res.json(order);
};
export const createOrder = async (req: Request, res: Response) => {
  const result = createSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ message: 'Invalid order payload', issues: result.error.issues });
  return res.status(201).json(await service.create(result.data));
};
export const removeOrder = async (req: Request, res: Response) => {
  const deleted = await service.delete(Number(req.params.id));
  if (!deleted) return res.status(404).json({ message: 'Order not found' });
  return res.status(204).send();
};
export { service as orderService };
