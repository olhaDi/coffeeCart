import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://coffee-cart.app/');
});

test('Product is visible on Cart tab', async ({ page }) => {
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('.close').click();
    await page.locator('a[href="/cart"]').click();
    await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $10.00');
    await expect(
        page.locator('li.list-item:has-text("Espresso"):has-text("$10.00")')
    ).toBeVisible();
});

test('Product is added to the cart', async ({ page }) => {
    await page.locator('[data-test="Espresso"]').click();
    await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $10.00');
});

test('User can complete a coffee order successfully', async ({ page }) => {
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('input[name="name"]').fill('Olia');
    await page.locator('input[name="email"]').fill('olia@ol.ua');
    await page.locator('input[name="promotion"]').check();
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.snackbar.success')).toContainText(
        'Thanks for your purchase. Please check your email for payment.'
    );
});

test('Discounted Mocha is added after accepting the promo offer', async ({ page }) => {
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="Espresso_Macchiato"]').click();
    await page.locator('[data-test="Cappuccino"]').click();
    await page.getByText('It\'s your lucky day! Get an').click();
    await expect(
        page.locator('span:has-text("It\'s your lucky day! Get an extra cup of Mocha for $4.")')
    ).toBeVisible();
    await page.locator('.yes').click();
    await page.locator('a[href="/cart"]').click();
    await expect(
        page.locator('li.list-item:has-text("(Discounted) Mocha"):has-text("$4.00")')
    ).toBeVisible();
});

test('Should remove one Espresso from cart', async ({ page }) => {
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('a[href="/cart"]').click();
    await expect(page.locator('li.list-item:has-text("Espresso"):has-text("$10.00")')).toBeVisible();
    await page.locator('button.delete[aria-label="Remove all Espresso"]').click();
    await expect(page.locator('p')).toHaveText('No coffee, go add some.');
});