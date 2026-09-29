import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { ProductType } from '../types/domain';
const types: ProductType[] = ['Ноутбуки', 'Мониторы', 'Периферия', 'Планшеты', 'Аксессуары'];
const schema = z.object({
  name: z.string().trim().min(2, 'Введите название'),
  type: z.string().min(1, 'Выберите тип'),
  price: z.coerce.number().positive('Цена должна быть больше 0'),
  warrantyUntil: z.string().min(1, 'Укажите гарантию'),
  orderId: z.coerce.number().int().positive('Укажите приход'),
});
export type ProductFormValues = z.output<typeof schema>;
export function ProductForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial?: Partial<ProductFormValues>;
  onSubmit: (value: ProductFormValues) => void;
  onCancel: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initial?.name ?? '',
      type: initial?.type ?? '',
      price: initial?.price ?? 0,
      warrantyUntil: initial?.warrantyUntil ?? '',
      orderId: initial?.orderId ?? 1,
    },
  });
  return (
    <form className="order-form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="product-name">
        Название
        <input id="product-name" autoFocus {...register('name')} />
        {errors.name && <small>{errors.name.message}</small>}
      </label>
      <label htmlFor="product-type">
        Тип
        <select id="product-type" {...register('type')}>
          <option value="">Выберите тип</option>
          {types.map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.type && <small>{errors.type.message}</small>}
      </label>
      <label htmlFor="product-price">
        Цена
        <input id="product-price" type="number" min="0" step="0.01" {...register('price')} />
        {errors.price && <small>{errors.price.message}</small>}
      </label>
      <label htmlFor="product-warranty">
        Гарантия до
        <input id="product-warranty" type="date" {...register('warrantyUntil')} />
        {errors.warrantyUntil && <small>{errors.warrantyUntil.message}</small>}
      </label>
      <label htmlFor="product-order">
        Приход ID
        <input id="product-order" type="number" min="1" {...register('orderId')} />
        {errors.orderId && <small>{errors.orderId.message}</small>}
      </label>
      <div className="flex justify-end gap-2">
        <button type="button" className="secondary" onClick={onCancel}>
          Отмена
        </button>
        <button className="primary" type="submit" disabled={isSubmitting}>
          Сохранить
        </button>
      </div>
    </form>
  );
}
