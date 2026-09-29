import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { selectProducts, selectSearch } from '../../app/store/selectors';
import { createProduct, fetchProducts, removeProduct, setFilter, updateProduct } from '../../app/store/productsSlice';
import { showToast } from '../../app/store/uiSlice';
import type { Product, ProductType } from '../../shared/types/domain';
import { convertPrice, formatCurrency, formatDate, formatDateLong } from '../../shared/utils/format';
import { ConfirmModal } from '../../shared/components/ConfirmModal';
import { ProductForm, type ProductFormValues } from '../../shared/components/ProductForm';

export default function ProductsPage() {
  const { t } = useTranslation();
  const currency = useAppSelector(state => state.settings.currency);
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const allProducts = useAppSelector((state) => state.products.items);
  const orders = useAppSelector((state) => state.orders.items);
  const filter = useAppSelector((state) => state.products.filter);
  const loading = useAppSelector((state) => state.products.loading);
  const error = useAppSelector((state) => state.products.error);
  const query = useAppSelector(selectSearch);
  const [removeId, setRemoveId] = useState<number | null>(null);
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  useEffect(() => {
    void dispatch(fetchProducts());
  }, [dispatch]);
  
  const ordersMap = useMemo(() => {
    const map = new Map<number, string>();
    orders.forEach(o => map.set(o.id, o.name));
    return map;
  }, [orders]);
  
  const types = [...new Set(allProducts.map((product) => product.type))];
  const notify = (message: string, type: 'success' | 'error') => dispatch(showToast({ message, type }));
  const save = (value: ProductFormValues) => {
    const request = editing?.id
      ? dispatch(updateProduct({ id: editing.id, data: value }))
      : dispatch(createProduct(value));
    void request
      .unwrap()
      .then(() => {
        setEditing(null);
        notify('Продукт сохранён', 'success');
      })
      .catch(() => notify('Не удалось сохранить продукт', 'error'));
  };
  const remove = () => {
    if (removeId === null) return;
    void dispatch(removeProduct(removeId))
      .unwrap()
      .then(() => {
        setRemoveId(null);
        notify('Продукт удалён', 'success');
      })
      .catch(() => notify('Не удалось удалить продукт', 'error'));
  };
  return (
    <>
      <div className="heading">
        <div>
          <label>КАТАЛОГ</label>
          <h1 className="text-3xl font-bold tracking-tight">{t('products')}</h1>
          <p>Все товары складского учёта{query && ` · поиск: ${query}`}</p>
        </div>
        <div className="flex gap-2">
          <select
            aria-label="Фильтр по типу"
            className="rounded-xl border bg-white px-4 py-3 text-sm shadow-sm"
            value={filter}
            onChange={(event) => dispatch(setFilter(event.target.value as ProductType | 'all'))}
          >
            <option value="all">Все типы</option>
            {types.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
          <button
            className="primary rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white"
            onClick={() => setEditing({})}
          >
            ＋ Добавить
          </button>
        </div>
      </div>
      {loading && <div className="page-loading">Загрузка продуктов…</div>}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {!loading && !products.length && (
        <div className="empty rounded-2xl border border-dashed bg-white">Продукты не найдены</div>
      )}
      <div className="table overflow-hidden rounded-2xl border bg-white shadow-sm">
        <table>
          <thead>
            <tr>
              <th>ТОВАР</th>
              <th>ТИП</th>
              <th>ПРИХОД</th>
              <th>ГАРАНТИЯ</th>
              <th>ЦЕНА</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const orderName =
                ordersMap.get(product.orderId) ?? `Приход #${product.orderId}`;
              return (
                <tr className="hover:bg-indigo-50/40" key={product.id}>
                  <td>
                    <b>{product.name}</b>
                    <small>{product.serialNumber}</small>
                  </td>
                  <td>
                    {product.type}
                    <small>{product.status}</small>
                  </td>
                  <td>{orderName}</td>
                  <td>
                    {formatDate(product.warrantyUntil)}
                    <small>{formatDateLong(product.warrantyUntil)}</small>
                  </td>
                  <td>
                    <b>{formatCurrency(convertPrice(product.price, product.currency, currency), currency)}</b>
                    
                  </td>
                  <td>
                    <button className="mr-3 text-indigo-600" onClick={() => setEditing(product)}>
                      Изменить
                    </button>
                    <button className="text-rose-500" onClick={() => setRemoveId(product.id)}>
                      Удалить
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {removeId !== null && (
        <ConfirmModal
          title="Удалить продукт?"
          description="Товар будет удалён из каталога."
          busy={loading}
          onClose={() => setRemoveId(null)}
          onConfirm={remove}
        />
      )}
      {editing && (
        <div className="backdrop">
          <div className="modal rounded-2xl p-7">
            <button className="modal-close" aria-label="Закрыть" onClick={() => setEditing(null)}>
              ×
            </button>
            <h2 className="text-xl font-bold">{editing.id ? 'Изменить продукт' : 'Новый продукт'}</h2>
            <ProductForm initial={editing} onSubmit={save} onCancel={() => setEditing(null)} />
          </div>
        </div>
      )}
    </>
  );
}
