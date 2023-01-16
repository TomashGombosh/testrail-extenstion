import { Page, Locator } from "@playwright/test";

export class RegisterForm {
  readonly page: Page;
  readonly header: Locator;
  readonly emailInput: Locator;
  readonly registerButton: Locator;
  readonly backButton: Locator;

  constructor (page: Page) {
    this.page = page;
    this.header = this.page.locator("[data-testid='main-menu']");
    this.emailInput = this.page.locator("[data-testid='email']").locator("input");
    this.registerButton = this.page.locator("[data-testid='register']");
    this.backButton = this.page.locator("[data-testid='back']");
  }
}
