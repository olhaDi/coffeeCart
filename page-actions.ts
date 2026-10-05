import { type Page } from '@playwright/test';

async function SelectProduct(page: Page, productName: string) {
  await page.locator(`[data-test="${productName}"]`).click();
}

export async function SelectEspresso(
  page: Page,
  productName: string = 'Espresso',
) {
  await SelectProduct(page, productName);
}

export async function SelectCappuccino(
  page: Page,
  productName: string = 'Cappuccino',
) {
  await SelectProduct(page, productName);
}

export async function ClickTotalButton(page: Page) {
  await page.locator('[data-test="checkout"]').click();
}

export async function CloseModalWindow(page: Page) {
  await page.getByRole('button', { name: '×' }).click();
}

export async function NavigateToCartPage(page: Page) {
  await page.getByRole('link', { name: 'Cart page' }).click();
}

export async function SelectProductHeading(page: Page, productName: string) {
  const productHeadingLocator = page.getByRole('heading', {
    name: `${productName} $`,
  });
  await productHeadingLocator.click();
}

export async function FillPaymentDetails(
  page: Page,
  name: string,
  email: string,
) {
  await page
    .getByRole('textbox', {
      name: 'Name',
    })
    .fill(name);
  await page
    .getByRole('textbox', {
      name: 'Email',
    })
    .fill(email);
  await page.getByRole('checkbox', { name: 'Promotion checkbox' }).check();
}

export async function SubmitPaymentDetails(page: Page) {
  page.getByRole('button', { name: 'Submit' }).click();
}
