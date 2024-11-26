import { Page, expect } from "@playwright/test";

export class LoginPage {

    readonly page: Page

   constructor(page: Page) {
        this.page= page
    }

    async submitFormWithCredentials(username: string, password: string) {
        const loginForm = this.page.locator('#login_button_container')
        await loginForm.getByRole('textbox', {name: "Username"}).fill(username)
        await loginForm.getByRole('textbox', {name: "Password"}).fill(password)
        await loginForm.getByRole('button').click()
    }

    async logout() {
        const productsListPage = this.page.locator('.header_label')
        await expect(productsListPage).toHaveText('Swag Labs')
        await this.page.locator('#react-burger-menu-btn').click()
        const expandedMenu = this.page.locator('#logout_sidebar_link')
        await expect(expandedMenu).toHaveText('Logout')
        await expandedMenu.click()
        const loginForm = this.page.locator('.login_logo')
        await expect(loginForm).toHaveText('Swag Labs')
    }



}
