import { describe, expect, it } from 'vitest';
import { calculateOrderTotal, convertPrice, formatDate } from '../src/shared/utils/format';

describe('domain utilities', () => {
  it('calculates order total from products', () => expect(calculateOrderTotal([{ id: 1, name: 'x', serialNumber: 'x', type: 'Ноутбуки', status: 'Свободен', price: 100, currency: 'USD', warrantyUntil: '2026-01-01', orderId: 1 }])).toBe(100));
  it('converts currencies using configured rates', () => expect(convertPrice(100, 'USD', 'EUR')).toBeCloseTo(92.59, 1));
  it('formats dates consistently', () => expect(formatDate('2026-09-29T10:30:00Z')).toMatch(/29\.09\.2026/));
});
