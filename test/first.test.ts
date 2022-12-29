import { test, expect } from "./fixtures/fixtures";

test("Open extention", async ({ page, extensionId }) => {
  await page.goto(`chrome-extension://${extensionId}/popup.html`);
  await expect(page.locator("[data-testid=login]")).toBeVisible();
});
