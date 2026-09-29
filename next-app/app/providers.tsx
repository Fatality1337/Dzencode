'use client';

import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../src/app/store';
import '../../src/app/styles/global.css';
import '../../src/shared/i18n';

export function Providers({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
