import { test, expect } from "./fixtures/fixtures";
const USERNAME = process.env.USER_NAME ? process.env.USER_NAME : "";
const PASSWORD = process.env.USER_KEY ? process.env.USER_KEY : "";

test("Open extention", async ({ page, extensionId, loginForm, startFrom }) => {
  await test.step("Open login form", async () => {
    await page.goto(`chrome-extension://${extensionId}/index.html`);
    await expect(loginForm.loginButton).toBeVisible();
  });

  await test.step("Check the password icon", async () => {
    await loginForm.showPasswordIcon.click();
    await expect(loginForm.passwordInput).toHaveAttribute("type", "text");
  });

  await test.step("Check enter works for login", async () => {
    await loginForm.usernameInput.fill(USERNAME);
    await loginForm.passwordInput.fill(PASSWORD);
    await loginForm.passwordInput.press("Enter");
    await expect(startFrom.header).toBeVisible();
  });
});
