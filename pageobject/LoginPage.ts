import {Locator, Page} from "@playwright/test";

export class LoginPage {

    readonly page: Page
    readonly userNameInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator

    constructor(page: Page) {
        this.page = page
        this.userNameInput = page.getByRole('textbox', {name: 'username'})
        this.passwordInput = page.getByRole('textbox', {name: 'password'})
        this.loginButton = page.getByRole('button', {name: 'login'})
    }

    async doLogin(username: string, password: string) {
        await this.page.goto('')
        await this.userNameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }
}