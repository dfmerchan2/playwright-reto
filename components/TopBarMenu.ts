import {Locator, Page} from "@playwright/test";
import {MenuOptions, SubMenuOptions} from "../enums/TopBarMenuOptions";

export class TopBarMenu {

    readonly page: Page
    readonly menu: Locator
    readonly subMenu: Locator

    constructor(page: Page) {
        this.page = page;
        this.menu = page.getByRole('navigation', {name: 'Topbar Menu'})
        this.subMenu = page.getByRole('menuitem')
    }

    async clickOnMenuTopBar(option: MenuOptions) {
        await this.menu.getByText(option).click()
    }

    async clickOnSubMenuTopBar(option: SubMenuOptions) {
        await this.subMenu.getByText(option).click()
    }
}