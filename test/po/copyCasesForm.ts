import { Page, Locator } from "@playwright/test";

export class CopyCasesForm {
  readonly page: Page;
  readonly header: Locator;
  readonly casesIdsInput: Locator;
  readonly buttonsContainer: Locator;
  readonly back: Locator;
  readonly next: Locator;

  constructor (page: Page) {
    this.page = page;
    this.header = this.page.locator("[data-testid='create-section-to-copy-cases']");
    this.casesIdsInput = this.page.locator("[data-testid='create-section']").locator("input");
    this.buttonsContainer = this.page.locator("[id=buttons]");
    this.back = this.buttonsContainer.locator("[data-testid='back']");
    this.next = this.buttonsContainer.locator("[data-testid='next']");
  }
}
