import { expect, test } from "@playwright/test";

const URL_PAGE: string = "https://opensource-demo.orangehrmlive.com/";

test('Login Successful to HRM', async ({ page }) => {
    await page.goto(URL_PAGE)
    await page.getByRole('textbox', { name: 'username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()
})

test('Login with empty credentials', async ({ page }) => {
    await page.goto(URL_PAGE)
    await page.getByRole('textbox', { name: 'username' }).fill(' ')
    await page.getByRole('textbox', { name: 'password' }).fill(' ')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.locator('xpath=(//span[text() ="Required"])[1]')).toBeVisible()
    await expect(page.locator('xpath=(//span[text() ="Required"])[2]')).toBeVisible()
})

test('Login with invalid credentials', async ({ page }) => {
    await page.goto(URL_PAGE)
    await page.getByRole('textbox', { name: 'username' }).fill('Admin1')
    await page.getByRole('textbox', { name: 'password' }).fill('admin1234')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.locator('//p[text() ="Invalid credentials"]')).toBeVisible()
})