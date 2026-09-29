'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TopMenu } from '../../src/widgets/TopMenu/TopMenu';

const links = [['/orders', 'Приходы'], ['/products', 'Продукты'], ['/groups', 'Группы'], ['/users', 'Пользователи'], ['/warehouses', 'Склады'], ['/settings', 'Настройки']];
export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <div className="app flex min-h-screen bg-slate-50 text-slate-900"><aside className="sidebar flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-7 shadow-sm"><div className="text-xl font-bold">inventory</div><nav className="mt-8 flex flex-col gap-1" aria-label="Основная навигация">{links.map(([href, label]) => <Link key={href} href={href} className={`rounded-xl px-3 py-3 text-sm font-medium ${pathname === href ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}>{label}</Link>)}</nav></aside><main className="min-w-0 flex-1"><TopMenu /><section className="content mx-auto max-w-[1450px]">{children}</section></main></div>;
}
