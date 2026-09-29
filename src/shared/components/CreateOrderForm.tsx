import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
const schema = z.object({
  orderName: z.string().trim().min(3, 'Минимум 3 символа'),
  productName: z.string().trim().min(2, 'Обязательное поле'),
  type: z.string().min(1, 'Выберите тип'),
  price: z.coerce.number().positive('Цена должна быть больше 0'),
  warrantyDate: z.string().min(1, 'Обязательное поле'),
  quantity: z.coerce.number().int().min(1, 'Количество минимум 1').default(1),
});
type FormInput = z.input<typeof schema>;
type FormValues = z.output<typeof schema>;
export function CreateOrderForm({ onSubmit }: { onSubmit: (values: FormValues) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput, undefined, FormValues>({ resolver: zodResolver(schema), defaultValues: { quantity: 1 } });
  return (
    <form className="order-form" onSubmit={handleSubmit(onSubmit)}>
      <label>
        Название прихода
        <input autoFocus {...register('orderName')} />
        {errors.orderName && <small>{errors.orderName.message}</small>}
      </label>
      <label>
        Название продукта
        <input {...register('productName')} />
        {errors.productName && <small>{errors.productName.message}</small>}
      </label>
      <label>
        Тип
        <select {...register('type')}>
          <option value="">Выберите тип</option>
          <option>Мониторы</option>
          <option>Сетевое оборудование</option>
          <option>Комплектующие</option>
          <option>Периферия</option>
          <option>Ноутбуки</option>
        </select>
        {errors.type && <small>{errors.type.message}</small>}
      </label>
      <label>
        Цена (USD)
        <input type="number" min="0" step="0.01" {...register('price')} />
        {errors.price && <small>{errors.price.message}</small>}
      </label>
      <label>
        Количество
        <input type="number" min="1" step="1" {...register('quantity')} />
        {errors.quantity && <small>{errors.quantity.message}</small>}
      </label>
      <label>
        Гарантия до
        <input type="date" {...register('warrantyDate')} />
        {errors.warrantyDate && <small>{errors.warrantyDate.message}</small>}
      </label>
      <button className="primary" type="submit">
        Сохранить
      </button>
    </form>
  );
}
