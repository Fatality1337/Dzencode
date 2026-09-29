import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const secret = process.env.JWT_SECRET || 'development-only-change-me';

export type AuthUser = { id: number; email: string; role: string };

export function createPasswordHash(password: string): string {
  return bcrypt.hashSync(password, 12);
}

export function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function signToken(user: AuthUser): string {
  return jwt.sign(user, secret, { expiresIn: '1h' });
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const header = req.header('authorization');
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;
  if (!token) {
    res.status(401).json({ message: 'Authentication required' });
    return;
  }
  try {
    res.locals.user = jwt.verify(token, secret) as AuthUser;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}
