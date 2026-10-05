import { test, expect } from '@playwright/test';

//page actions
import { SelectEspresso } from '../page-actions';
import { ClickTotalButton } from '../page-actions';
import { CloseModalWindow } from '../page-actions';
import { NavigateToCartPage } from '../page-actions';
import { SelectProductHeading } from '../page-actions';
import { FillPaymentDetails } from '../page-actions';
import { SubmitPaymentDetails } from '../page-actions';

const baseUrl = 'https://coffee-cart.app/';
const espressoProduct = 'Espresso';
const espressoPrice = '$10.00';

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
});

test('Product is visible on Cart tab', async ({ page }) => {
  await SelectEspresso(page);
  await ClickTotalButton(page);
  await CloseModalWindow(page);
  await NavigateToCartPage(page);

  const totalButtonCartPageLocator = page.locator('[data-test="checkout"]');
  const espressoItemInCartLocator = page.getByText(
    `${espressoProduct}${espressoPrice} x 1+-${espressoPrice}x`,
  );
  await expect(totalButtonCartPageLocator).toContainText(espressoPrice);
  await expect(espressoItemInCartLocator).toBeVisible();
});

test('Product is added to the cart', async ({ page }) => {
  await SelectEspresso(page);
  await SelectProductHeading(page, espressoProduct);
  const totalButtonLocatorMenuPageLocator = page.locator(
    '[data-test="checkout"]',
  );
  await expect(totalButtonLocatorMenuPageLocator).toContainText(espressoPrice);
});

test('User can complete a coffee order successfully', async ({ page }) => {
  await SelectEspresso(page);
  await ClickTotalButton(page);
  await FillPaymentDetails(page, 'Olia', 'olia@ol.ua');
  await SubmitPaymentDetails(page);
  const thanksMessageLocator = page.getByRole('button', {
    name: 'Thanks for your purchase.',
  });
  await expect(thanksMessageLocator).toBeVisible();
});
