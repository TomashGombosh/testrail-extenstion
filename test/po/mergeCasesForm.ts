import { Page, Locator } from "@playwright/test";

export class MergeCasesForm {
  readonly page: Page;
  readonly header: Locator;
  readonly selectMergeType: Locator;
  readonly buttonsContainer: Locator;
  readonly back: Locator;
  readonly next: Locator;

  constructor (page: Page) {
    this.page = page;
    this.header = this.page.locator("[data-testid='select-cases-to-merge']");
    this.selectMergeType = this.page.locator("[id=select-type-of-merge]");
    this.buttonsContainer = this.page.locator("[id=buttons]");
    this.back = this.buttonsContainer.locator("[data-testid='back']");
    this.next = this.buttonsContainer.locator("[data-testid='merge']");
  }
}
