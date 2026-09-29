import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icon = new L.Icon({ iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png', shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41] });
const warehouses = [
  { id: 1, name: 'Основной склад', city: 'Киев', position: [50.4501, 30.5234] as [number, number], stock: 128 },
  { id: 2, name: 'Региональный склад', city: 'Львов', position: [49.8397, 24.0297] as [number, number], stock: 64 },
  { id: 3, name: 'Южный склад', city: 'Одесса', position: [46.4825, 30.7233] as [number, number], stock: 42 },
];
export default function WarehousesPage() {
  return <div className="page p-4 md:p-8"><div className="mb-6"><p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Локации</p><h1 className="mt-2 text-3xl font-bold">Склады</h1><p className="mt-2 text-slate-500">Расположение складов и текущие остатки на карте.</p></div><div className="grid gap-5 lg:grid-cols-[1fr_300px]"><MapContainer center={[49.2, 29.5]} zoom={6} scrollWheelZoom className="h-[560px] min-h-[400px] rounded-3xl shadow-lg"><TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />{warehouses.map((warehouse) => <Marker key={warehouse.id} position={warehouse.position} icon={icon}><Popup><strong>{warehouse.name}</strong><br />{warehouse.city}<br />Товаров: {warehouse.stock}</Popup></Marker>)}</MapContainer><div className="space-y-3">{warehouses.map((warehouse) => <article key={warehouse.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><h2 className="font-semibold">{warehouse.name}</h2><p className="mt-1 text-sm text-slate-500">{warehouse.city}</p><p className="mt-3 text-sm"><span className="font-semibold text-indigo-600">{warehouse.stock}</span> товаров на остатке</p></article>)}</div></div></div>;
}
