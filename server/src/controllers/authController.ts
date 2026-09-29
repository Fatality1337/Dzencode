import type { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../repositories/prismaClient.js';
import { signToken, verifyPassword } from '../auth.js';

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });

export async function login(req: Request, res: Response): Promise<void> {
  const input = loginSchema.parse(req.body);
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user || !user.passwordHash || !verifyPassword(input.password, user.passwordHash)) {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }
  res.json({
    token: signToken({ id: user.id, email: user.email, role: user.role }),
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
}
