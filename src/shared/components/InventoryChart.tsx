interface InventoryChartProps {
  data: Record<string, number>;
}
export function InventoryChart({ data }: InventoryChartProps) {
  const entries = Object.entries(data);
  const max = Math.max(...entries.map(([, value]) => value), 1);
  return (
    <section
      className="inventory-chart rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      aria-label="Статистика по типам товаров"
    >
      <div className="inventory-chart__header">
        <div>
          <p className="inventory-chart__eyebrow">АНАЛИТИКА</p>
          <h2 className="inventory-chart__title">Товары по типам</h2>
        </div>
        <span className="inventory-chart__total">{entries.reduce((sum, [, value]) => sum + value, 0)}</span>
      </div>
      <div className="inventory-chart__bars">
        {entries.map(([label, value]) => (
          <div className="inventory-chart__item" key={label}>
            <div
              className="inventory-chart__bar"
              style={{ height: `${Math.max((value / max) * 100, 12)}%` }}
              title={`${label}: ${value}`}
            >
              <span>{value}</span>
            </div>
            <small>{label}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
