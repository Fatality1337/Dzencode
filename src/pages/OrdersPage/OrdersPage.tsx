import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { selectSelectedOrder, selectVisibleOrders } from '../../app/store/selectors';
import { createOrder, fetchOrders, removeOrder, selectOrder } from '../../app/store/ordersSlice';
import { showToast } from '../../app/store/uiSlice';
import {
  calculateOrderTotal,
  convertPrice,
  formatCurrency,
  formatDate,
  formatDateLong,
} from '../../shared/utils/format';
import { ConfirmModal } from '../../shared/components/ConfirmModal';
import { CreateOrderForm } from '../../shared/components/CreateOrderForm';
import { InventoryChart } from '../../shared/components/InventoryChart';
import { useOrderStatistics } from '../../shared/workers/useOrderStatistics';

export default function OrdersPage() {
  const { t } = useTranslation();
  const currency = useAppSelector(state => state.settings.currency);
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
  
  const allProducts = useMemo(() => allOrders.flatMap((order) => order.products), [allOrders]);
  const statistics = useOrderStatistics(allProducts);
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
          <label>ОБЗОР СКЛАДА</label>
          <h1 className="text-3xl font-bold tracking-tight">{t('orders')}</h1>
          <p>История поступлений на склад</p>
        </div>
        <button
          className="primary rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white"
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
        <>
          <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <small>Товаров</small>
              <strong className="mt-1 block text-2xl">{statistics.totalProducts}</strong>
            </div>
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <small>Стоимость</small>
              <strong className="mt-1 block text-2xl">{formatCurrency(convertPrice(statistics.totalValue, 'USD', currency), currency)}</strong>
            </div>
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <small>Типов товаров</small>
              <strong className="mt-1 block text-2xl">{Object.keys(statistics.byType).length}</strong>
            </div>
          </div>
          <InventoryChart data={statistics.byType} />
        </>
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
              {orders.map((order) => {
                const total = calculateOrderTotal(order.products);
                return (
                  <tr
                    className={selected?.id === order.id ? 'sel' : ''}
                    onClick={() => dispatch(selectOrder(order.id))}
                    key={order.id}
                  >
                    <td>
                      <b>{order.name}</b>
                      <small>
                        {order.id} · {formatDate(order.createdAt)} · {formatDateLong(order.createdAt)}
                      </small>
                    </td>
                    <td>{order.supplier}</td>
                    <td>{order.products.length}</td>
                    <td>
                      <b>{formatCurrency(convertPrice(total, 'USD', currency), currency)}</b>
                      
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {selected && (
          <aside className="detail">
            <button className="detail__close" aria-label="Закрыть детали" onClick={() => dispatch(selectOrder(null))}>
              ×
            </button>
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
                <strong>
                  {formatCurrency(convertPrice(product.price, product.currency, currency), currency)}
                  
                </strong>
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
          <div className="modal rounded-2xl p-7">
            <button className="modal-close" aria-label="Закрыть" onClick={() => setCreateOpen(false)}>
              ×
            </button>
            <h2 className="text-xl font-bold">Новый приход</h2>
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
                      warrantyUntil: values.warrantyDate, quantity: values.quantity,
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
