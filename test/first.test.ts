import { test, expect } from "./fixtures/fixtures";

test.skip("Open extention", async ({ page, extensionId }) => {
  await page.goto(`chrome-extension://${extensionId}/popup.html`);
  await expect(page.locator("body")).toHaveText("my-extension popup");
});
