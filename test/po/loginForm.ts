import { Locator, Page } from "@playwright/test";

export class LoginForm {
  readonly page: Page;
  readonly header: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly showPasswordIcon: Locator;
  readonly loginButton: Locator;

  constructor (page: Page) {
    this.page = page;
    this.header = page.locator("[data-testid='login']").first();
    this.usernameInput = page.locator("[data-testid='email']").locator("input");
    this.passwordInput = page.locator("[data-testid='password']").locator("input");
    this.showPasswordIcon = page.locator("[data-testid='password']").locator("button");
    this.loginButton = page.locator("[data-testid='login']").last();
  }
}
