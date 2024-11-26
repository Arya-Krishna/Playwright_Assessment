import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager'

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.URL || 'https://www.saucedemo.com/')
})

test.describe('Swag Labs Login Scenario', () => {

  test('Login to SwagLabs with Valid Credentials', async ({page}) => {
    try {
        const pm = new PageManager(page)
        await pm.navigateToLoginPage().submitFormWithCredentials("standard_user", "secret_sauce")
        const productsListPage = page.locator('.header_label')
        await expect(productsListPage).toHaveText('Swag Labs')
    } catch (error) {
        console.error('Error occurred during test execution:', error)
        await page.screenshot({path: 'screenshots/validLoginFailure.png'})
        throw new Error('Test failed')
    }
  })

  test('Login to SwagLabs with Invalid Credentials', async ({page}) => {
    try {
        const pm = new PageManager(page)
        await pm.navigateToLoginPage().submitFormWithCredentials("Invalid_user", "Invalid_Password")
        const invalidLoginErrorMessage = page.locator('.error-message-container')
        await expect(invalidLoginErrorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')
    } catch (error) {
        console.error('Error occurred during test execution:', error)
        await page.screenshot({path: 'screenshots/invalidLoginFailue.png'})
        throw new Error('Test failed')
    }
  })

  test('Logout from SwagLabs', async ({page}) => {
    try {
        const pm = new PageManager(page)
        await pm.navigateToLoginPage().submitFormWithCredentials("standard_user", "secret_sauce")
        await pm.navigateToLoginPage().logout()
    } catch (error) {
        console.error('Error occurred during test execution:', error)
        await page.screenshot({path: 'screenshots/logoutFailure.png'})
        throw new Error('Test failed')
    }
  })

})