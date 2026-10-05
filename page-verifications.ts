import { type Page, expect } from '@playwright/test';

export async function IsCartContainSelectedItem(
  page: Page,
  productName: string,
  productPrice: string,
) {
  const productLocator = page.getByRole('heading', {
    name: `${productName} ${productPrice}`,
  });
  const totalButtonCartPageLocator = page.locator('[data-test="checkout"]');
  const espressoItemInCartLocator = page.getByText(
    `${productName}${productPrice} x 1+-${productPrice}x`,
  );
  await expect(totalButtonCartPageLocator).toContainText(productPrice);
  await expect(espressoItemInCartLocator).toBeVisible();
}

export async function IsTotalButtonCartContainItemPrice(
  page: Page,
  productPrice: string,
) {
  const totalButtonLocator = page.locator('[data-test="checkout"]');
  await expect(totalButtonLocator).toContainText(productPrice);
}

export async function IsThanksMessageVisible(page: Page) {
  const thanksMessageLocator = page.getByRole('button', {
    name: 'Thanks for your purchase.',
  });
  await expect(thanksMessageLocator).toBeVisible();
}
