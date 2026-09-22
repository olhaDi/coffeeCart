import { test, expect } from '@playwright/test';

const product = "Espresso";
const price = "$10.00";

test('Product is visible on Cart tab', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator(`[data-test="${product}"]`).click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole('button', { name: '×' }).click();
  await page.getByRole('link', { name: 'Cart page' }).click();
  await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  await expect(page.getByText(`${product}${price} x 1+-$10.00x`)).toBeVisible();
});

test('Product is added to the cart', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator(`[data-test="${product}"]`).click();
  await page.getByRole('heading', { name: 'Espresso $' }).click();
  await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  await expect(page.locator('[data-test="checkout"]')).toContainText(price);
});

test('User can complete a coffee order successfully', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Olia');
  await page.getByRole('textbox', { name: 'Name' }).press('Tab');
  await page.getByRole('textbox', { name: 'Email' }).fill('olia@ol.ua');
  await page.getByRole('checkbox', { name: 'Promotion checkbox' }).check();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('button', { name: 'Thanks for your purchase.' })).toBeVisible();
});

test('Discounted Mocha is added after accepting the promo offer', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await page.getByText('It\'s your lucky day! Get an').click();
  await expect(page.getByText('It\'s your lucky day! Get an')).toBeVisible();
  await page.getByRole('button', { name: 'Yes, of course!' }).click();
  await page.getByRole('link', { name: 'Cart page' }).click();
  await expect(page.getByText('(Discounted) Mocha$4.00 x 1')).toBeVisible();
});

test('Should remove one Espresso from cart', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.getByRole('heading', { name: 'Espresso $' }).click();
  await page.locator('[data-test="Espresso"]').click();
  await page.getByRole('link', { name: 'Cart page' }).click();
  await expect(page.getByText('Espresso$10.00 x 1+-$10.00x')).toBeVisible();
  await page.getByRole('button', { name: 'Remove one Espresso' }).click();
  await expect(page.getByText('No coffee, go add some.')).toBeVisible();
});