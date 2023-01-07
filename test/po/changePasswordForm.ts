import { Page, Locator } from "@playwright/test";

export class ChagePasswordForm {
  readonly page: Page;
  readonly header: Locator;

  readonly oldPasswordContainer: Locator;
  readonly oldPassword: Locator;
  readonly oldPasswordShowPassword: Locator;
  readonly oldPasswordErrorText: Locator;

  readonly newPasswordContainer: Locator;
  readonly newPassword: Locator;
  readonly newPasswordShowPassword: Locator;
  readonly newPasswordErrorText: Locator;

  readonly confirmPasswordContainer: Locator;
  readonly confirmPassword: Locator;
  readonly confirmPasswordErrorText: Locator;
  readonly buttonsContainer: Locator;

  readonly back: Locator;
  readonly change: Locator;

  constructor (page: Page) {
    this.page = page;
    this.header = this.page.locator("[data-testid='change-your-current-password']");

    this.oldPasswordContainer = this.page.locator("[data-testid='old-password']");
    this.oldPassword = this.oldPasswordContainer.locator("input");
    this.oldPasswordShowPassword = this.oldPasswordContainer.locator("button");
    this.oldPasswordErrorText = this.oldPasswordContainer.locator("p");

    this.newPasswordContainer = this.page.locator("[data-testid='new-password']");
    this.newPassword = this.newPasswordContainer.locator("input");
    this.newPasswordShowPassword = this.newPasswordContainer.locator("button");
    this.newPasswordErrorText = this.newPasswordContainer.locator("p");

    this.confirmPasswordContainer = this.page.locator("[data-testid='confirm-password']");
    this.confirmPassword = this.confirmPasswordContainer.locator("input");
    this.confirmPasswordErrorText = this.confirmPasswordContainer.locator("p");

    this.buttonsContainer = this.page.locator("[id=buttons]");
    this.back = this.buttonsContainer.locator("[data-testid='back']");
    this.change = this.buttonsContainer.locator("[data-testid='change']");
  }
}
