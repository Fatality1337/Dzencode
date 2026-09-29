import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { selectProducts } from '../../app/store/selectors';
import { fetchProducts, setFilter } from '../../app/store/productsSlice';
import type { ProductType } from '../../shared/types/domain';
import { formatCurrency, formatDate } from '../../shared/utils/format';

export default function ProductsPage() {
  const dispatch = useAppDispatch(); const products = useAppSelector(selectProducts); const allProducts = useAppSelector((state) => state.products.items); const filter = useAppSelector((state) => state.products.filter); const loading = useAppSelector((state) => state.products.loading); const error = useAppSelector((state) => state.products.error); const types = [...new Set(allProducts.map((product) => product.type))];
  useEffect(() => { void dispatch(fetchProducts()); }, [dispatch]);
  return <><div className="heading"><div><label className="font-semibold tracking-widest text-slate-400">КАТАЛОГ</label><h1 className="text-3xl font-bold tracking-tight">Продукты</h1><p>Все товары складского учета</p></div><select className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100" value={filter} onChange={(event) => dispatch(setFilter(event.target.value as ProductType | 'all'))}><option value="all">Все типы</option>{types.map((type) => <option key={type}>{type}</option>)}</select></div>{loading && <div className="page-loading">Загрузка продуктов…</div>}{error && <div className="alert alert-danger">{error}</div>}<div className="table overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><table><thead><tr><th>ТОВАР</th><th>ТИП</th><th>СТАТУС</th><th>ГАРАНТИЯ</th><th>ЦЕНА</th></tr></thead><tbody>{products.map((product) => <tr className="transition-colors hover:bg-indigo-50/40" key={product.id}><td><b>{product.name}</b><small>{product.serialNumber}</small></td><td>{product.type}</td><td><span className="status ok">● {product.status}</span></td><td>{formatDate(product.warrantyUntil)}</td><td><b>{formatCurrency(product.price, product.currency)}</b></td></tr>)}</tbody></table></div></>;
}
