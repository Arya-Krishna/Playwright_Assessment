import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager'

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')
})

test('Select products and checkout', async ({page}) => {
    try {
        const pm = new PageManager(page)
        await pm.navigateToLoginPage().submitFormWithCredentials("standard_user", "secret_sauce")
        await pm.inEcommercePage().selectProductsAndCheckout()
    } catch (error) {
        console.error('Error occurred during test execution:', error)
        await page.screenshot({path: 'screenshots/ecommerceFailure.png'})
        throw new Error('Test failed')
    }
  })
