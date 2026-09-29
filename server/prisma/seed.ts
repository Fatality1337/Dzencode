import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const groups = [
  { name: 'Рабочая техника', description: 'Ноутбуки и мониторы' },
  { name: 'Аксессуары', description: 'Периферия и аудио' },
  { name: 'Мобильные устройства', description: 'Смартфоны и планшеты' },
];
const users = [
  { name: 'Алексей Морозов', email: 'alexey@inventory.io', role: 'Администратор' },
  { name: 'Мария Волкова', email: 'maria@inventory.io', role: 'Менеджер склада' },
  { name: 'Иван Петров', email: 'ivan@inventory.io', role: 'Наблюдатель' },
];
const orders = [
  {
    id: 1,
    name: 'Поставка техники Apple',
    supplier: 'Apple Distribution',
    products: [
      {
        name: 'MacBook Pro 16',
        serialNumber: 'MBP-16-M2-001',
        type: 'Ноутбуки',
        status: 'Свободен',
        price: 2499,
        currency: 'USD',
        warrantyUntil: '2026-09-12',
      },
      {
        name: 'Dell UltraSharp U2723QE',
        serialNumber: 'DEL-U27-023',
        type: 'Мониторы',
        status: 'Свободен',
        price: 685,
        currency: 'USD',
        warrantyUntil: '2026-09-12',
      },
    ],
  },
  {
    id: 2,
    name: 'Офисная периферия',
    supplier: 'TechnoHub LLC',
    products: [
      {
        name: 'Logitech MX Master 3S',
        serialNumber: 'LOG-MX3-442',
        type: 'Периферия',
        status: 'В ремонте',
        price: 99,
        currency: 'USD',
        warrantyUntil: '2025-09-08',
      },
      {
        name: 'Apple iPad Air',
        serialNumber: 'IPA-AIR-109',
        type: 'Планшеты',
        status: 'Свободен',
        price: 799,
        currency: 'USD',
        warrantyUntil: '2026-09-08',
      },
    ],
  },
  {
    id: 3,
    name: 'Аудио и аксессуары',
    supplier: 'Sound Store',
    products: [
      {
        name: 'Sony WH-1000XM5',
        serialNumber: 'SNY-WH5-781',
        type: 'Аксессуары',
        status: 'Списан',
        price: 349,
        currency: 'USD',
        warrantyUntil: '2025-09-01',
      },
    ],
  },
];

async function main() {
  for (const group of groups) await prisma.group.upsert({ where: { name: group.name }, update: group, create: group });
  for (const user of users) {
    const passwordHash = bcrypt.hashSync('password123', 12);
    await prisma.user.upsert({
      where: { email: user.email },
      update: { ...user, passwordHash },
      create: { ...user, passwordHash },
    });
  }
  for (const data of orders) {
    const order = await prisma.order.upsert({
      where: { id: data.id },
      update: { name: data.name, supplier: data.supplier },
      create: { id: data.id, name: data.name, supplier: data.supplier },
    });
    for (const product of data.products)
      await prisma.product.upsert({
        where: { serialNumber: product.serialNumber },
        update: { ...product, warrantyUntil: new Date(product.warrantyUntil), orderId: order.id },
        create: { ...product, warrantyUntil: new Date(product.warrantyUntil), orderId: order.id },
      });
  }
  process.stdout.write('Seed completed safely.\n');
}
main()
  .catch((error: unknown) => {
    process.stderr.write(`${String(error)}\n`);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
