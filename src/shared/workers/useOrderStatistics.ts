import { useEffect, useState } from 'react';
import type { Product } from '../types/domain';
import type { StatisticsOutput } from './orderStatistics.worker';
export function useOrderStatistics(products: Product[]) {
  const [result, setResult] = useState<StatisticsOutput | null>(null);
  useEffect(() => {
    const worker = new Worker(new URL('./orderStatistics.worker.ts', import.meta.url), { type: 'module' });
    worker.onmessage = (event: MessageEvent<StatisticsOutput>) => setResult(event.data);
    worker.postMessage({
      prices: products.map((product) => product.price),
      types: products.map((product) => product.type),
    });
    return () => worker.terminate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(products.map(p => ({ price: p.price, type: p.type })))]);
  return result;
}
