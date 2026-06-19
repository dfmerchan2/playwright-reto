import {expect, Locator, Page} from "@playwright/test";
import {SideMenuOption} from "../enums/SideMenuOption";

export class SidePanel {
    readonly page: Page
    readonly textbox: Locator

    constructor(page: Page) {
        this.page = page;
        this.textbox = page.getByRole('textbox', {name: 'Search'})
    }

    async clickOnMenu(options: SideMenuOption) {
        await this.page.getByRole('link', {name: options}).click()
    }

    async searchOption(options: SideMenuOption) {
        await this.textbox.fill(options)
    }
}