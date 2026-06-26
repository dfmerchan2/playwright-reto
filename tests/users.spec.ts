import {expect, test} from "@playwright/test";
import {LoginPage} from "../pageobject/LoginPage";
import {SidePanel} from "../components/SidePanel";
import {SideMenuOption} from "../enums/SideMenuOption";
import {UserPage} from "../pageobject/UserPage";
import {LabelOptions} from "../enums/Enums";
import {TopBarMenu} from "../components/TopBarMenu";
import {MenuOptions, SubMenuOptions} from "../enums/TopBarMenuOptions";


test('Get all the username registered', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAsAdmin()

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

    await page.getByRole('link', {name: 'Admin'}).click()
    await page.getByRole('navigation', {name: 'Topbar Menu'}).getByText('User Management ').click()
    await page.getByRole('menuitem', {name: 'Users'}).click()

    const rows = page.getByRole('table').getByRole('row')
    const usernames: string[] = []

    const rowCount = await rows.count()

    for (let i = 1; i < rowCount; i++) {
        const cell = rows.nth(i).getByRole('cell').nth(1)
        const username = await cell.textContent()

        if (username) {
            usernames.push(username)
        }
    }
    console.log(usernames)
})

test('Get all the Employee Name registered', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAsAdmin()

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

    await page.getByRole('link', {name: 'Admin'}).click()
    await page.getByRole('navigation', {name: 'Topbar Menu'}).getByText('User Management ').click()
    await page.getByRole('menuitem', {name: 'Users'}).click()

    const rows = page.getByRole('table').getByRole('row')
    const employeeNames: string[] = []

    const rowCount = await rows.count()

    for (let i = 1; i < rowCount; i++) {
        const cell = rows.nth(i).getByRole('cell').nth(3)
        const employeeName = await cell.textContent()

        if (employeeName) {
            employeeNames.push(employeeName)
        }
    }

    console.log(employeeNames)
})

test('Select specific user for edition', async ({page}) => {

    const userForEdit = 'hassan3011'
    const loginPage = new LoginPage(page);
    await loginPage.loginAsAdmin()

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

    await page.getByRole('link', {name: 'Admin'}).click()
    await page.getByRole('navigation', {name: 'Topbar Menu'}).getByText('User Management ').click()
    await page.getByRole('menuitem', {name: 'Users'}).click()

    const filterRows = page.getByRole('table')
        .getByRole('row')
        .filter({hasText: userForEdit})
        .locator('button')
        .filter({has: page.locator('i.bi-pencil-fill')})

    await filterRows.click()

    const currentUsername = await page.locator('//label[text()="Username"]/parent::div//following-sibling::div/input').inputValue()
    expect(currentUsername).toEqual(userForEdit)
})

test('Select random user for edition', async ({page}) => {

    const loginPage = new LoginPage(page);
    await loginPage.loginAsAdmin()

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

    await page.getByRole('link', {name: 'Admin'}).click()
    await page.getByRole('navigation', {name: 'Topbar Menu'}).getByText('User Management ').click()
    await page.getByRole('menuitem', {name: 'Users'}).click()

    const rows = page.getByRole('table').getByRole('row')
    const rowCount = await rows.count()
    const usernames: string[] = []

    for (let i = 1; i < rowCount; i++) {
        const username = await rows.nth(i).getByRole('cell').nth(1).textContent()

        if (username && username !== 'Admin') {
            usernames.push(username)
        }
    }

    const idUser = Math.floor(Math.random() * usernames.length);
    const userNameForEdit = usernames[idUser]
    console.log(userNameForEdit);

    const filterRows = page.getByRole('table')
        .getByRole('row')
        .filter({hasText: userNameForEdit})
        .locator('button')
        .filter({has: page.locator('i.bi-pencil-fill')})

    await filterRows.click()

    await expect(page.locator('//label[text()="Username"]/parent::div//following-sibling::div/input')).toHaveValue(userNameForEdit)
})


test('check user role options', async ({ page }) => {

    const expectedRoleOptions = [ '-- Select --', 'Admin', 'ESS' ]

    const loginPage = new LoginPage(page);
    await loginPage.loginAsAdmin();

    const sidePanel = new SidePanel(page);
    await sidePanel.clickOnMenu(SideMenuOption.ADMIN)

    const userPage = new UserPage(page);
    await userPage.clickOnFilterSystemUsers(LabelOptions.USER_ROLE)

    const currentRoleOptions = await userPage.getAllDropdownOptions()

    console.log(currentRoleOptions);

    expect(currentRoleOptions,'The options displayed in the User Role Dropdown do not match the expected option').toEqual(expectedRoleOptions);

})

test('check status options', async ({ page }) => {

    const expectedStatusOptions = [ '-- Select --', 'Enabled', 'Disabled' ]

    const loginPage = new LoginPage(page);
    await loginPage.loginAsAdmin();

    const sidePanel = new SidePanel(page);
    await sidePanel.clickOnMenu(SideMenuOption.ADMIN)

    const userPage = new UserPage(page);
    await userPage.clickOnFilterSystemUsers(LabelOptions.STATUS)

    const currentStatusOptions = await userPage.getAllDropdownOptions()

    console.log(currentStatusOptions);

    expect(currentStatusOptions,'The options displayed in the User Role Dropdown do not match the expected option').toEqual(expectedStatusOptions);

})

test('Navigation top bar menu', async ({page}) => {
    const loginPage = new LoginPage(page);
    const userPage = new UserPage(page);
    const sidePanel = new SidePanel(page);
    const topBarMenu = new TopBarMenu(page);

    await loginPage.loginAsAdmin()
    await sidePanel.clickOnMenu(SideMenuOption.ADMIN)
    await topBarMenu.clickOnMenuTopBar(MenuOptions.USER_MANAGEMENT)
    await topBarMenu.clickOnSubMenuTopBar(SubMenuOptions.USERS)

    const allBodyRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')

    const currentAllBodyRows = allBodyRows.filter({
        has: page.getByRole('cell').nth(2).getByText('Admin')
    })

    const  expectedAdminCount = await currentAllBodyRows.count()
    console.log('Admin user before filtering', expectedAdminCount)


    await userPage.clickOnFilterSystemUsers(LabelOptions.USER_ROLE)
    await userPage.clickOnOptionFilter('Admin')
    await userPage.clickOnSearch()

    console.log('Diego 2', allBodyRows.count())
    await expect(allBodyRows).toHaveCount(expectedAdminCount)

    for (let  i=0; i<expectedAdminCount; i++) {
        await expect(allBodyRows.nth(i).getByRole('cell').nth(2)).toContainText('Admin')
    }

})