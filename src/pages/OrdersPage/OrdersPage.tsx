import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { selectOrders, selectSelectedOrder } from '../../app/store/selectors';
import { createOrder, fetchOrders, removeOrder, selectOrder } from '../../app/store/ordersSlice';
import { calculateOrderTotal, formatCurrency, formatDate } from '../../shared/utils/format';
import { CreateOrderForm } from '../../shared/components/CreateOrderForm';

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const selected = useAppSelector(selectSelectedOrder);
  const loading = useAppSelector((state) => state.orders.loading);
  const error = useAppSelector((state) => state.orders.error);
  const [confirm, setConfirm] = useState<number | null>(null); const [createOpen, setCreateOpen] = useState(false);
  useEffect(() => { void dispatch(fetchOrders()); }, [dispatch]);
  return <>
    <div className="heading"><div><label className="font-semibold tracking-widest text-slate-400">ОБЗОР СКЛАДА</label><h1 className="text-3xl font-bold tracking-tight text-slate-900">Приходы</h1><p>История поступлений на склад</p></div><button className="primary inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700" onClick={() => setCreateOpen(true)}>＋ Новый приход</button></div>
    {loading && <div className="page-loading">Загрузка приходов…</div>}{error && <div className="alert alert-danger">{error}</div>}
    <div className="income"><div className="table"><table><thead><tr><th>ПРИХОД</th><th>ПОСТАВЩИК</th><th>ТОВАРОВ</th><th>СТОИМОСТЬ</th></tr></thead><tbody>{orders.map((order) => <tr className={selected?.id === order.id ? 'sel' : ''} onClick={() => dispatch(selectOrder(order.id))} key={order.id}><td><b>{order.name}</b><small>{order.id} · {formatDate(order.createdAt)}</small></td><td>{order.supplier}</td><td>{order.products.length}</td><td><b>{formatCurrency(calculateOrderTotal(order.products))}</b></td></tr>)}</tbody></table></div>
      {selected && <aside className="detail"><label>ДЕТАЛИ ПРИХОДА</label><h3>{selected.name}</h3><small>{selected.supplier}</small>{selected.products.map((product) => <div className="mini" key={product.id}><span>📦</span><b>{product.name}<small>{product.serialNumber}</small></b><strong>{formatCurrency(product.price, product.currency)}</strong></div>)}<button className="danger" onClick={() => setConfirm(selected.id)}>♲ Удалить приход</button></aside>}
    </div>{confirm && <div className="backdrop"><div className="modal"><h2>Удалить приход?</h2><p>Связанные товары также будут удалены.</p><button className="secondary" onClick={() => setConfirm(null)}>Отмена</button><button className="danger" onClick={() => { void dispatch(removeOrder(confirm)); setConfirm(null); }}>Удалить</button></div></div>}
    {createOpen && <div className="backdrop"><div className="modal rounded-2xl border border-slate-100 p-7 shadow-2xl"><button className="modal-close" aria-label="Закрыть" onClick={() => setCreateOpen(false)}>×</button><h2 className="text-xl font-bold">Новый приход</h2><p className="text-sm text-slate-400">Добавьте поставку и первый товар.</p><CreateOrderForm onSubmit={(values) => { void dispatch(createOrder({ name: values.orderName, supplier: 'Новый поставщик', product: { name: values.productName, type: values.type, price: values.price, warrantyUntil: values.warrantyDate } })); setCreateOpen(false); }} /></div></div>}
  </>;
}
