import type { ReactNode } from 'react';

export const metadata = { title: 'Inventory SSR', description: 'Warehouse management system' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>{children}</body></html>;
}
