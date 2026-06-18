import {expect, test} from "@playwright/test";
import {LoginPage} from "../pageobject/LoginPage";

test('Check left menu options', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

    const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')
    const currentMenuItemCount = await leftMenuItems.count()

    console.log('Current menu items count', currentMenuItemCount)

    const currentMenuItems: string[] = []

    for (let i = 0; i < currentMenuItemCount; i++) {
        const menuText = await leftMenuItems.nth(i).innerText()
        currentMenuItems.push(menuText)
    }

    console.log(currentMenuItems)

    const expectedMenuItems = ['Admin', 'PIM', 'Leave', 'Time', 'Recruitment', 'My Info',
        'Performance', 'Dashboard', 'Directory', 'Maintenance', 'Claim', 'Buzz']

    expect(currentMenuItems).toEqual(expectedMenuItems)
    expect(currentMenuItems[0]).toEqual(expectedMenuItems[0])
})

test('Navigation through the left panel', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

    const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')
    const currentMenuItemCount = await leftMenuItems.count()

    for (let i = 0; i < currentMenuItemCount; i++) {
        const menuItem = leftMenuItems.nth(i)
        const menuText = await menuItem.innerText()

        console.log('Current menu item', menuText)
        await menuItem.click()

        if (menuText == 'Maintenance') {
            await page.goBack();
        }
    }
})

test('Check all the qualification links', async ({page}) => {

    const expectedPages = [
        {menu: 'Skills', url: '/web/index.php/admin/viewSkills'},
        {menu: 'Education', url: '/web/index.php/admin/viewEducation'},
        {menu: 'Licenses', url: '/web/index.php/admin/viewLicenses'},
        {menu: 'Languages', url: '/web/index.php/admin/viewLanguages'},
        {menu: 'Memberships', url: '/web/index.php/admin/membership'},
    ]

    const loginPage = new LoginPage(page);
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

    await page.getByRole('link', {name: 'Admin'}).click()

    await page.getByRole('navigation', {name: 'Topbar Menu'}).getByText('Qualifications').click()

    const qualificationOptions = page.getByRole('menu').locator('li')

    for (let expectedPage of expectedPages) {
        const menuOptions = qualificationOptions.filter({hasText: expectedPage.menu})
        await menuOptions.click()
        await expect(page).toHaveURL(new RegExp(expectedPage.url))

        await page.getByRole('navigation', {name: 'Topbar Menu'}).getByText('Qualifications').click()
    }
})

test('Check all the configuration links', async ({page}) => {

    const expectedPages = [
        {menu: 'Email Configuration', url: '/web/index.php/admin/listMailConfiguration'},
        {menu: 'Email Subscriptions', url: '/web/index.php/admin/viewEmailNotification'},
        {menu: 'Localization', url: '/web/index.php/admin/localization'},
        {menu: 'Language Packages', url: '/web/index.php/admin/languagePackage'},
        {menu: 'Modules', url: '/web/index.php/admin/viewModules'},
        {menu: 'Social Media Authentication', url: '/web/index.php/admin/openIdProvider'},
        {menu: 'Register OAuth Client', url: '/web/index.php/admin/registerOAuthClient'},
        {menu: 'LDAP Configuration', url: '/web/index.php/admin/ldapConfiguration'}
    ]

    const loginPage = new LoginPage(page);
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

    await page.getByRole('link', {name: 'Admin'}).click()

    await page.getByRole('navigation', {name: 'Topbar Menu'}).getByText('Configuration').click()

    const qualificationOptions = page.getByRole('menu').locator('li')

    for (let expectedPage of expectedPages) {
        const menuOptions = qualificationOptions.filter({hasText: expectedPage.menu})
        await menuOptions.click()
        await expect(page).toHaveURL(new RegExp(expectedPage.url))

        await page.getByRole('navigation', {name: 'Topbar Menu'}).getByText('Configuration').click()
    }
})


