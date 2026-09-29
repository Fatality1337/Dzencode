import { expect, test } from '@playwright/test';

test.describe('Inventory flows', () => {
  test('deletes an order through confirmation modal', async ({ page }) => {
    await page.goto('/orders');
    await expect(page.getByRole('heading', { name: 'Приходы' })).toBeVisible();
    await page.getByRole('cell', { name: /Аудио и аксессуары/ }).click();
    await page.getByRole('button', { name: '✖ Удалить приход' }).click();
    const dialog = page.getByRole('alertdialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('Удалить приход?');
    await dialog.getByRole('button', { name: 'Удалить' }).click();
    await expect(dialog).toBeHidden();
    await expect(page.getByText('Аудио и аксессуары')).toBeHidden();
  });

  test('filters products by type', async ({ page }) => {
    await page.goto('/products');
    await expect(page.getByRole('heading', { name: 'Продукты' })).toBeVisible();
    await page.getByRole('combobox', { name: 'Фильтр по типу' }).selectOption({ label: 'Ноутбуки' });
    await expect(page.getByText(/MacBook Pro 16/)).toBeVisible();
    await expect(page.getByText('Dell UltraSharp U2723QE')).toBeHidden();
  });

  test('updates active sessions between browser contexts', async ({ browser }) => {
    const first = await browser.newContext();
    const second = await browser.newContext();
    const firstPage = await first.newPage();
    const secondPage = await second.newPage();
    await firstPage.goto('/orders');
    await expect(firstPage.getByText(/Активные сессии:/)).toBeVisible();
    await secondPage.goto('/orders');
    await expect(firstPage.getByText(/Активные сессии:\s*2/)).toBeVisible();
    await second.close();
    await expect(firstPage.getByText(/Активные сессии:\s*1/)).toBeVisible();
    await first.close();
  });
});
