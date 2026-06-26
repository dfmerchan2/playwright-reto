import {Locator, Page} from "@playwright/test";

export class UserPage {

    private readonly page: Page;
    private readonly optionsDropdown: Locator
    private readonly searchButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.optionsDropdown = page.getByRole('listbox').getByRole("option")
        this.searchButton = page.getByRole('button', {name: 'Search'})

    }

    async clickOnFilterSystemUsers(option: string) {
        const selectDropDownOption = this.page.locator(`//label [text()='${option}']/parent::div/following-sibling::div`)
        await selectDropDownOption.click();
    }

    async clickOnOptionFilter(option: string) {
        await this.page.getByRole('listbox').getByRole('option', {name: option}).click()
    }

    async getAllDropdownOptions(): Promise<string[]> {
        return await this.optionsDropdown.allInnerTexts()
    }

    async clickOnSearch() {
        await this.searchButton.click()
    }

}


