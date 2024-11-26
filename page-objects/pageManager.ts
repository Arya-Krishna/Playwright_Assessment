import { Page } from "@playwright/test";
import { LoginPage } from '../page-objects/loginPage'
import { EcommercePage } from "./ecommercePage";

export class PageManager {

    private readonly page: Page
    private readonly loginPage: LoginPage
    private readonly ecommercePage: EcommercePage

    constructor(page: Page) {
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.ecommercePage = new EcommercePage(this.page)
    }

    navigateToLoginPage() {
        return this.loginPage
    }

    inEcommercePage() {
        return this.ecommercePage
    }


}