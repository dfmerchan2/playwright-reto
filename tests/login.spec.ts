import {expect, test} from "@playwright/test";
import {LoginPage} from "../pageobject/LoginPage";
import {SidePanel} from "../components/SidePanel";
import {SideMenuOption} from "../enums/SideMenuOption";

test('Login Successful to HRM', async ({page}) => {
    const loginPage = new LoginPage(page);
    const sidePanel = new SidePanel(page);

    await loginPage.doLogin('Admin', 'admin123')
    await sidePanel.clickOnMenu(SideMenuOption.ADMIN)

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()
    await sidePanel.searchOption(SideMenuOption.MAINTENANCE);
})

test('Login with empty credentials', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.doLogin(' ', ' ')

    await expect(page.locator('xpath=(//span[text() ="Required"])[1]')).toBeVisible()
    await expect(page.locator('xpath=(//span[text() ="Required"])[2]')).toBeVisible()
})

test('Login with invalid credentials', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.doLogin('Admin1', 'admin1234')

    await expect(page.locator('//p[text() ="Invalid credentials"]')).toBeVisible()
})