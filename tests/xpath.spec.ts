import { test, expect } from '@playwright/test';

test('The sum of selected checkboxes is valid', async ({ page }) => {
    await page.goto('http://104.168.59.50/laboratory/interactions');
    const checkboxes = page.locator('//input[@type="checkbox"]');

    for (let i = 0; i < 4; i++) {
        await checkboxes.nth(i).isVisible();
        await checkboxes.nth(i).check();
    }
    await expect(
        page.locator('//span[@data-testid="interactions-selected-count"]')
    ).toHaveText('Вибрано: 4');
    await page.locator('//input[@data-testid="interactions-row-select-4"]').uncheck();
    await expect(
        page.locator('//span[@data-testid="interactions-selected-count"]')
    ).toHaveText('Вибрано: 3');
});

test('Sorting check', async ({ page }) => {
    await page.goto('http://104.168.59.50/laboratory/interactions');
    const defaultOrder = [
        'Авторизація',
        'Завантаження файлу',
        'Пошук за тегом',
        'Створення статті'
    ];
    const sortedOrder = [
        'Створення статті',
        'Авторизація',
        'Пошук за тегом',
        'Завантаження файлу'
    ];

    for (let i = 0; i < defaultOrder.length; i++) {
        await expect(
            page.locator(
                `(//input[@type='checkbox'][1]/../following-sibling::td[1])[${i + 1}]`
            )
        ).toHaveText(defaultOrder[i]);
    }
    await page.locator("//button[text()='Статус']").click();
    for (let i = 0; i < defaultOrder.length; i++) {
        await expect(
            page.locator(
                `(//input[@type='checkbox'][1]/../following-sibling::td[1])[${i + 1}]`
            )
        ).toHaveText(sortedOrder[i]);
    }
});

