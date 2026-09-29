import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ProductForm } from '../src/shared/components/ProductForm';

describe('ProductForm integration', () => {
  it('shows validation errors and submits valid data', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<ProductForm onSubmit={onSubmit} onCancel={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: 'Сохранить' }));
    expect(await screen.findByText('Введите название')).toBeVisible();
    await user.type(screen.getByLabelText(/Название/), 'Keyboard');
    await user.selectOptions(screen.getByLabelText(/Тип/), 'Периферия');
    await user.clear(screen.getByLabelText(/Цена/)); await user.type(screen.getByLabelText(/Цена/), '20');
    await user.type(screen.getByLabelText(/Гарантия до/), '2027-01-01');
    await user.clear(screen.getByLabelText(/Приход ID/)); await user.type(screen.getByLabelText(/Приход ID/), '1');
    await user.click(screen.getByRole('button', { name: 'Сохранить' }));
    expect(onSubmit).toHaveBeenCalledOnce();
  });
});
