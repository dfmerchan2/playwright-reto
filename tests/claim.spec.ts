import {expect, test} from "@playwright/test";
import {LoginPage} from "../pageobject/LoginPage";
import {SidePanel} from "../components/SidePanel";
import {SideMenuOption} from "../enums/SideMenuOption";
import {UserPage} from "../pageobject/UserPage";
import {LabelOptions} from "../enums/Enums";

test('Claim test', async ({page}) => {

    await page.goto('/web/index.php/claim/viewAssignClaim')
    const loginPage = new LoginPage(page);
    await loginPage.loginAsAdmin()

    const allBodyRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')
    const amounts: number[] = []

    const rowCount = await allBodyRows.count()
    console.log(rowCount)

    for (let i = 0; i < rowCount; i++) {
        const amountCell = allBodyRows.nth(i).getByRole('cell').nth(7)
        const amountText = await amountCell.textContent()

        console.log('This is the amount in text', amountText)

        if (amountText === null) {
            continue
        }

        const convertedNumber = parseFloat(amountText?.replace(/,/g, '').trim())
        amounts.push(convertedNumber)
    }

    console.log(amounts)


    let total = 0

    for (let amount of amounts) {
        total += amount
    }

    const maxAmount = Math.max(...amounts) !== -Infinity ? Math.max(...amounts) : 0;
    const minAmount = Math.max(...amounts) !== -Infinity ? Math.min(...amounts) : 0;

    console.log('Total is ', total)
    console.log('Value Max', maxAmount)
    console.log('Value Min', minAmount)
})