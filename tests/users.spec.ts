import {expect, test} from "@playwright/test";

const URL_PAGE: string = "https://opensource-demo.orangehrmlive.com/";

test('Get all the username registered', async ({page}) => {
    await page.goto(URL_PAGE)
    await page.getByRole('textbox', {name: 'username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'password'}).fill('admin123')
    await page.getByRole('button', {name: 'Login'}).click()

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
    await page.goto(URL_PAGE)
    await page.getByRole('textbox', {name: 'username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'password'}).fill('admin123')
    await page.getByRole('button', {name: 'Login'}).click()

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