export interface StatisticsInput {
  prices: number[];
  types: string[];
}
export interface StatisticsOutput {
  totalValue: number;
  totalProducts: number;
  byType: Record<string, number>;
}
self.onmessage = (event: MessageEvent<StatisticsInput>) => {
  const result = event.data.types.reduce<Record<string, number>>(
    (acc, type) => ({ ...acc, [type]: (acc[type] || 0) + 1 }),
    {},
  );
  const output: StatisticsOutput = {
    totalValue: event.data.prices.reduce((a, b) => a + b, 0),
    totalProducts: event.data.prices.length,
    byType: result,
  };
  self.postMessage(output);
};
