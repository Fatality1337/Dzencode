import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface InventoryChartProps {
  data: Record<string, number>;
}

export function InventoryChart({ data }: InventoryChartProps) {
  const chartData = Object.entries(data).map(([name, count]) => ({ name, count }));
  const total = chartData.reduce((sum, item) => sum + item.count, 0);

  return (
    <section
      className="inventory-chart rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      aria-label="Статистика по типам товаров"
    >
      <div className="inventory-chart__header mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">АНАЛИТИКА</p>
          <h2 className="text-xl font-bold">Товары по типам</h2>
        </div>
        <span className="text-3xl font-bold text-indigo-600">{total}</span>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }} 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
