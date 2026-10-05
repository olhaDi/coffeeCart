import { test } from '@playwright/test';

//page actions
import { SelectEspresso } from '../page-actions';
import { ClickTotalButton } from '../page-actions';
import { CloseModalWindow } from '../page-actions';
import { NavigateToCartPage } from '../page-actions';
import { SelectProductHeading } from '../page-actions';
import { FillPaymentDetails } from '../page-actions';
import { SubmitPaymentDetails } from '../page-actions';
//assertions
import { IsCartContainSelectedItem } from '../page-verifications';
import { IsTotalButtonCartContainItemPrice } from '../page-verifications';
import { IsThanksMessageVisible } from '../page-verifications';

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
  await IsTotalButtonCartContainItemPrice(page, espressoPrice);
  await IsCartContainSelectedItem(page, espressoProduct, espressoPrice);
});

test('Product is added to the cart', async ({ page }) => {
  await SelectEspresso(page);
  await SelectProductHeading(page, espressoProduct);
  await IsTotalButtonCartContainItemPrice(page, espressoPrice);
});

test('User can complete a coffee order successfully', async ({ page }) => {
  await SelectEspresso(page);
  await ClickTotalButton(page);
  await FillPaymentDetails(page, 'Olia', 'olia@ol.ua');
  await SubmitPaymentDetails(page);
  await IsThanksMessageVisible(page);
});
