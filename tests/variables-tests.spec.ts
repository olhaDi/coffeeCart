import { test, expect } from '@playwright/test';

const baseUrl = 'https://coffee-cart.app/';
const espressoProduct = "Espresso";
const espressoPrice = "$10.00";

test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
});

test('Product is visible on Cart tab', async ({ page }) => {
    const espressoLocator = page.locator(`[data-test="${espressoProduct}"]`);
    const totalButtonLocatorMenuPageLocator = page.locator('[data-test="checkout"]');
    const closeModalWindowLocator = page.getByRole('button', { name: '×' });
    const cartTabLinkLocator = page.getByRole('link', { name: 'Cart page' });
    const totalButtonCartPageLocator = page.locator('[data-test="checkout"]');
    const espressoItemInCartLocator = page.getByText(`${espressoProduct}${espressoPrice} x 1+-${espressoPrice}x`);

    await espressoLocator.click();
    await totalButtonLocatorMenuPageLocator.click();
    await closeModalWindowLocator.click();
    await cartTabLinkLocator.click();
    await expect(totalButtonCartPageLocator).toContainText(espressoPrice);
    await expect(espressoItemInCartLocator).toBeVisible();
});

test('Product is added to the cart', async ({ page }) => {
    const espressoLocator = page.locator(`[data-test="${espressoProduct}"]`);
    const espressoHeadingLocator = page.getByRole('heading', { name: 'Espresso $' });
    const totalButtonLocatorMenuPageLocator = page.locator('[data-test="checkout"]');

    await espressoLocator.click();
    await espressoHeadingLocator.click();
    await expect(totalButtonLocatorMenuPageLocator).toContainText(espressoPrice);
});

test('User can complete a coffee order successfully', async ({ page }) => {
    const espressoLocator = page.locator(`[data-test="${espressoProduct}"]`);
    const totalButtonLocatorMenuPageLocator = page.locator('[data-test="checkout"]');
    const nameInputPaymentDetailsPageLocator = page.getByRole('textbox', { name: 'Name' });
    const emailInputPaymentDetailsPageLocator = page.getByRole('textbox', { name: 'Email' });
    const promotionCheckboxPaymentDetailsPageLocator = page.getByRole('checkbox', { name: 'Promotion checkbox' });
    const submitButtonPaymentDetailsPageLocator = page.getByRole('button', { name: 'Submit' });
    const thanksMessageLocator = page.getByRole('button', { name: 'Thanks for your purchase.' });

    await espressoLocator.click();
    await totalButtonLocatorMenuPageLocator.click();
    await nameInputPaymentDetailsPageLocator.fill('Olia');
    await emailInputPaymentDetailsPageLocator.fill('olia@ol.ua');
    await promotionCheckboxPaymentDetailsPageLocator.check();
    await submitButtonPaymentDetailsPageLocator.click();
    await expect(thanksMessageLocator).toBeVisible();
});

test('Discounted Mocha is added after accepting the promo offer', async ({ page }) => {
    const espressoLocator = page.locator(`[data-test="${espressoProduct}"]`);
    const espressoMacchiatoLocator = page.locator('[data-test="Espresso_Macchiato"]');
    const cappuccinoLocator = page.locator('[data-test="Cappuccino"]');
    const luckyDayPromoLocator = page.getByText('It\'s your lucky day! Get an');
    const yesPromoButtonLocator = page.getByRole('button', { name: 'Yes, of course!' });
    const cartTabLinkLocator = page.getByRole('link', { name: 'Cart page' });
    const discountedMochaItemLocator = page.getByText('(Discounted) Mocha$4.00 x 1');

    await espressoLocator.click();
    await espressoMacchiatoLocator.click();
    await cappuccinoLocator.click();
    await luckyDayPromoLocator.click();
    await yesPromoButtonLocator.click();
    await cartTabLinkLocator.click();
    await expect(discountedMochaItemLocator).toBeVisible();
});

test('Should remove one Espresso from cart', async ({ page }) => {
    const espressoLocator = page.locator(`[data-test="${espressoProduct}"]`);
    const cartTabLinkLocator = page.getByRole('link', { name: 'Cart page' });
    const espressoItemInCartLocator = page.getByText(`${espressoProduct}${espressoPrice} x 1+-${espressoPrice}x`);
    const removeOneEspressoButtonLocator = page.getByRole('button', { name: 'Remove one Espresso' });
    const noCoffeeInCartLocator = page.getByText('No coffee, go add some.');

    await espressoLocator.click();
    await cartTabLinkLocator.click();
    await expect(espressoItemInCartLocator).toBeVisible();
    await removeOneEspressoButtonLocator.click();
    await expect(noCoffeeInCartLocator).toBeVisible();
});