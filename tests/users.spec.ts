import {expect, test} from "@playwright/test";
import {LoginPage} from "../pageobject/LoginPage";


test('Get all the username registered', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.doLogin('Admin', 'admin123')

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
    await loginPage.doLogin('Admin', 'admin123')

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
    await loginPage.doLogin('Admin', 'admin123')

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
    await loginPage.doLogin('Admin', 'admin123')

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