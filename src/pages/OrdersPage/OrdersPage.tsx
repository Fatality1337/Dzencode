import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { selectSelectedOrder, selectVisibleOrders } from '../../app/store/selectors';
import { createOrder, fetchOrders, removeOrder, selectOrder } from '../../app/store/ordersSlice';
import { showToast } from '../../app/store/uiSlice';
import { calculateOrderTotal, formatCurrency, formatDate } from '../../shared/utils/format';
import { ConfirmModal } from '../../shared/components/ConfirmModal';
import { CreateOrderForm } from '../../shared/components/CreateOrderForm';
import { useOrderStatistics } from '../../shared/workers/useOrderStatistics';
export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectVisibleOrders);
  const allOrders = useAppSelector((state) => state.orders.items);
  const selected = useAppSelector(selectSelectedOrder);
  const loading = useAppSelector((state) => state.orders.loading);
  const error = useAppSelector((state) => state.orders.error);
  const [confirm, setConfirm] = useState<number | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  useEffect(() => {
    void dispatch(fetchOrders());
  }, [dispatch]);
  const statistics = useOrderStatistics(allOrders.flatMap((order) => order.products));
  const notify = (message: string, type: 'success' | 'error') => dispatch(showToast({ message, type }));
  const remove = () => {
    if (confirm === null) return;
    void dispatch(removeOrder(confirm))
      .unwrap()
      .then(() => {
        setConfirm(null);
        notify('Приход удалён', 'success');
      })
      .catch(() => notify('Не удалось удалить приход', 'error'));
  };
  return (
    <>
      <div className="heading">
        <div>
          <label className="font-semibold tracking-widest text-slate-400">ОБЗОР СКЛАДА</label>
          <h1 className="text-3xl font-bold tracking-tight">Приходы</h1>
          <p>История поступлений на склад</p>
        </div>
        <button
          className="primary inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
          onClick={() => setCreateOpen(true)}
        >
          ＋ Новый приход
        </button>
      </div>
      {loading && <div className="page-loading">Загрузка приходов…</div>}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {statistics && (
        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <small className="text-slate-400">Товаров</small>
            <strong className="mt-1 block text-2xl">{statistics.totalProducts}</strong>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <small className="text-slate-400">Стоимость</small>
            <strong className="mt-1 block text-2xl">{formatCurrency(statistics.totalValue)}</strong>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <small className="text-slate-400">Типов товаров</small>
            <strong className="mt-1 block text-2xl">{Object.keys(statistics.byType).length}</strong>
          </div>
        </div>
      )}
      {!loading && !orders.length && (
        <div className="empty rounded-2xl border border-dashed bg-white">Приходы не найдены</div>
      )}
      <div className="income">
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>ПРИХОД</th>
                <th>ПОСТАВЩИК</th>
                <th>ТОВАРОВ</th>
                <th>СТОИМОСТЬ</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  className={selected?.id === order.id ? 'sel' : ''}
                  onClick={() => dispatch(selectOrder(order.id))}
                  key={order.id}
                >
                  <td>
                    <b>{order.name}</b>
                    <small>
                      {order.id} · {formatDate(order.createdAt)}
                    </small>
                  </td>
                  <td>{order.supplier}</td>
                  <td>{order.products.length}</td>
                  <td>
                    <b>{formatCurrency(calculateOrderTotal(order.products))}</b>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selected && (
          <aside className="detail">
            <label>ДЕТАЛИ ПРИХОДА</label>
            <h3>{selected.name}</h3>
            <small>{selected.supplier}</small>
            {selected.products.map((product) => (
              <div className="mini" key={product.id}>
                <span>📦</span>
                <b>
                  {product.name}
                  <small>{product.serialNumber}</small>
                </b>
                <strong>{formatCurrency(product.price, product.currency)}</strong>
              </div>
            ))}
            <button className="danger" onClick={() => setConfirm(selected.id)}>
              ✖ Удалить приход
            </button>
          </aside>
        )}
      </div>
      {confirm !== null && (
        <ConfirmModal
          title="Удалить приход?"
          description="Связанные товары также будут удалены."
          busy={loading}
          onClose={() => setConfirm(null)}
          onConfirm={remove}
        />
      )}
      {createOpen && (
        <div className="backdrop">
          <div className="modal rounded-2xl border border-slate-100 p-7 shadow-2xl">
            <button className="modal-close" aria-label="Закрыть" onClick={() => setCreateOpen(false)}>
              ×
            </button>
            <h2 className="text-xl font-bold">Новый приход</h2>
            <p className="text-sm text-slate-400">Добавьте поставку и первый товар.</p>
            <CreateOrderForm
              onSubmit={(values) => {
                void dispatch(
                  createOrder({
                    name: values.orderName,
                    supplier: 'Новый поставщик',
                    product: {
                      name: values.productName,
                      type: values.type,
                      price: values.price,
                      warrantyUntil: values.warrantyDate,
                    },
                  }),
                )
                  .unwrap()
                  .then(() => {
                    setCreateOpen(false);
                    notify('Приход создан', 'success');
                  })
                  .catch(() => notify('Не удалось создать приход', 'error'));
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
