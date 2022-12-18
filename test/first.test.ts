import { test, expect } from "./fixtures/fixtures";

test("popup page", async ({ page, extensionId }) => {
  await page.goto(`chrome-extension://${extensionId}/popup.html`);
  await expect(page.locator("body")).toHaveText("my-extension popup");
});
