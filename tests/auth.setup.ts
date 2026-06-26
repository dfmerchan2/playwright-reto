import {test as setup, expect} from "@playwright/test";
import {LoginPage} from "../pageobject/LoginPage";

// @ts-ignore
setup('authentication as admin', async ({page})=>{
    console.log('Authenticated iniciada usando setup');

    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

    await page.context().storageState({path: '.auth/admin.json'})

    console.log('Authenticated completa usando setup');

})

// @ts-ignore
setup('authentication as as employee', async ({page})=>{

    await page.context().storageState({path: '.auth/employe.json'})

})
