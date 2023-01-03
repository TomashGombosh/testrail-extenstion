import { test, expect } from "./fixtures/fixtures";

test("Open extention", async ({ page, extensionId, loginForm }) => {
  await page.goto(`chrome-extension://${extensionId}/index.html`);
  await expect(loginForm.loginButton).toBeVisible();
});
