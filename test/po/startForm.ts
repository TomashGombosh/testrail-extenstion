import { Page, Locator } from "@playwright/test";

export class StartForm {
  readonly page: Page;
  readonly header: Locator;
  readonly copyCasesButton: Locator;
  readonly mergeCasesButton: Locator;
  readonly logout: Locator;

  constructor (page: Page) {
    this.page = page;
    this.header = this.page.locator("[data-testid='main-menu']");
    this.copyCasesButton = this.page.locator("[data-testid='copy-cases']");
    this.mergeCasesButton = this.page.locator("[data-testid='merge-cases']");
    this.logout = this.page.locator("[data-testid='logout']");
  }
}
