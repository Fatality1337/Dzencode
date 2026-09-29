import type { Request, Response } from 'express';
import { z } from 'zod';
import { GroupService, UserService } from '../services/managementService.js';
import type { User } from '../domain.js';
const groups = new GroupService();
const users = new UserService();
const groupSchema = z.object({ name: z.string().min(2), description: z.string().min(2) });
const userSchema = z.object({ name: z.string().min(2), email: z.string().email(), role: z.string().min(2) });
export const listGroups = async (_req: Request, res: Response) => res.json(await groups.list());
export const createGroup = async (req: Request, res: Response) => {
  const result = groupSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ message: 'Invalid group' });
  return res.status(201).json(await groups.create(result.data.name, result.data.description));
};
export const updateGroup = async (req: Request, res: Response) => {
  const result = groupSchema.partial().safeParse(req.body);
  if (!result.success) return res.status(400).json({ message: 'Invalid group' });
  const group = await groups.update(Number(req.params.id), result.data);
  return group ? res.json(group) : res.status(404).json({ message: 'Group not found' });
};
export const deleteGroup = async (req: Request, res: Response) =>
  (await groups.delete(Number(req.params.id)))
    ? res.status(204).send()
    : res.status(404).json({ message: 'Group not found' });
export const listUsers = async (_req: Request, res: Response) => res.json(await users.list());
export const createUser = async (req: Request, res: Response) => {
  const result = userSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ message: 'Invalid user' });
  return res
    .status(201)
    .json(await users.create(result.data.name, result.data.email, result.data.role as User['role']));
};
export const updateUser = async (req: Request, res: Response) => {
  const result = userSchema.partial().safeParse(req.body);
  if (!result.success) return res.status(400).json({ message: 'Invalid user' });
  const user = await users.update(Number(req.params.id), result.data as Partial<User>);
  return user ? res.json(user) : res.status(404).json({ message: 'User not found' });
};
export const deleteUser = async (req: Request, res: Response) =>
  (await users.delete(Number(req.params.id)))
    ? res.status(204).send()
    : res.status(404).json({ message: 'User not found' });
