import type { ReactNode } from 'react';
import { Providers } from '../providers';
import { DashboardShell } from '../dashboard-shell';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <Providers><DashboardShell>{children}</DashboardShell></Providers>;
}
