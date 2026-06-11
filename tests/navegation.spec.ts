import {expect, test} from "@playwright/test";

const URL_PAGE: string = "https://opensource-demo.orangehrmlive.com/";

test('Check left menu options', async ({page}) => {
    await page.goto(URL_PAGE)
    await page.getByRole('textbox', {name: 'username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'password'}).fill('admin123')
    await page.getByRole('button', {name: 'Login'}).click()

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
