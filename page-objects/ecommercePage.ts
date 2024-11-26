import { Page, expect } from "@playwright/test";
import { faker } from '@faker-js/faker'
import exp from "constants";

export class EcommercePage {

    readonly page: Page

   constructor(page: Page) {
        this.page= page
    }

    async selectProductsAndCheckout() {
        
        const sortingOption = 'hilo';
        
        if (sortingOption === 'hilo') {

            //Sort products with price High to Low 
            await this.page.selectOption('select.product_sort_container', { value: 'hilo' });
            const selectedOption = await this.page.locator('select.product_sort_container option:checked').textContent();
            expect(selectedOption).toBe('Price (high to low)');

            //Selected product Sauce Labs Fleece Jacket
            const fleeJacketCartButton = this.page.locator('#add-to-cart-sauce-labs-fleece-jacket')
            await fleeJacketCartButton.click()
            const fleeJacketCartButtonAfterAddingToCart = this.page.locator('#remove-sauce-labs-fleece-jacket')
            await expect(fleeJacketCartButtonAfterAddingToCart).toHaveText("Remove")

            //Selected product Sauce Labs Onesie
            const OnesieCartButton = this.page.locator('#add-to-cart-sauce-labs-onesie')
            await OnesieCartButton.click()
            const OnesieCartButtonAfterAddingToCart = this.page.locator('#remove-sauce-labs-onesie')
            await expect(OnesieCartButtonAfterAddingToCart).toHaveText("Remove")

        } else if (sortingOption === 'az') {

            await this.page.selectOption('select.product_sort_container', { value: 'az' });
            console.log('Selected: Name (A to Z)');

        } else if (sortingOption === 'za') {

            await this.page.selectOption('select.product_sort_container', { value: 'za' });
            console.log('Selected: Name (Z to A)');

        } else if (sortingOption === 'lohi') {

            await this.page.selectOption('select.product_sort_container', { value: 'lohi' });
            console.log('Selected: Price (low to high)');

        } else {

            console.log('Invalid sorting option');

        }

        //Select Cart button and navigate to cart
        await this.page.locator('.shopping_cart_link').click()
        const yourCartPage = this.page.locator('.title', {hasText: "Your Cart"})
        await expect(yourCartPage).toHaveText("Your Cart")

        //Compare the added product with item in cart
        const inventoryItem1 = await this.page.locator('.inventory_item_name').nth(0).innerText()
        console.log(inventoryItem1)
        const inventoryItem2 = await this.page.locator('.inventory_item_name').nth(1).innerText()
        console.log(inventoryItem2)
        expect(inventoryItem1).toContain('Fleece Jacket')
        expect(inventoryItem2).toContain('Onesie')

        //Remove one item and add a new item to cart
        await this.page.locator('#remove-sauce-labs-onesie').click()
        await this.page.locator('#continue-shopping').click()
        const BackpackCartButton = this.page.locator('#add-to-cart-sauce-labs-backpack')
        await BackpackCartButton.click()
        const BackpacCartButtonAfterAddingToCart = this.page.locator('#remove-sauce-labs-backpack')
        await expect(BackpacCartButtonAfterAddingToCart).toHaveText("Remove")
        await this.page.locator('.shopping_cart_link').click()
        const inCartPage = this.page.locator('.title', {hasText: "Your Cart"})
        await expect(inCartPage).toHaveText("Your Cart")
        const inventoryItemB = await this.page.locator('.inventory_item_name').nth(1).innerText()
        console.log(inventoryItemB)
        expect(inventoryItemB).toContain('Backpack')

        //Checkout the items added
        await this.page.getByRole('button', {name: "Checkout"}).click()

        //Navigate to Your Information page
        const yourInfoPage = this.page.locator('.title', {hasText: "Checkout: Your Information"})
        await expect(yourInfoPage).toHaveText("Checkout: Your Information")

        //Fill checkout Information and continue
        const randomFirstName = faker.person.firstName()
        const randomLastName = faker.person.lastName()
        await this.page.getByRole('textbox', {name: "First Name"}).fill(randomFirstName)
        await this.page.getByRole('textbox', {name: "Last Name"}).fill(randomLastName)
        await this.page.getByRole('textbox', {name: "Zip/Postal Code"}).fill("663377")
        await this.page.getByRole('button', {name: "continue"}).click()

        //Navigate to Checkout overview page
        const yoverviewPage = this.page.locator('.title', {hasText: "Checkout: Overview"})
        await expect(yoverviewPage).toHaveText("Checkout: Overview")
        console.log("---Checkout Information---")
        console.log("Item A: " + await this.page.locator('.inventory_item_name').nth(0).innerText())
        console.log("Item B: " + await this.page.locator('.inventory_item_name').nth(1).innerText())
        console.log("Payment Information:: " + await this.page.locator('.summary_value_label').nth(0).innerText())
        console.log("Shipping Information: " + await this.page.locator('.summary_value_label').nth(1).innerText())
        console.log("Price Total: " + await this.page.locator('.summary_subtotal_label').innerText())
        console.log(await this.page.locator('.summary_tax_label').innerText())
        console.log(await this.page.locator('.summary_total_label').innerText())
        await this.page.getByRole('button', {name: "Finish"}).click()

        //Navigate to success page
        const successPage = this.page.locator('.complete-header', {hasText: "Thank you for your order!"})
        await expect(successPage).toHaveText("Thank you for your order!")
        await this.page.getByRole('button', {name: "Back Home"}).click()

        //Navigate back to home page
        const productsListPage = this.page.locator('.header_label')
        await expect(productsListPage).toHaveText('Swag Labs')
    }


}