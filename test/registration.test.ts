import { test, expect } from "./fixtures/fixtures";
import { getRandomEmail } from "./helpers/index";
import { CREATED } from "../src/constants/statusCodes";
import { IS_ADMIN_LOGGED_IN } from "../src/constants/index";

const USERNAME = process.env.USER_NAME ? process.env.USER_NAME : "";
const PASSWORD = process.env.USER_KEY ? process.env.USER_KEY : "";

test("Check the first login flow", async ({ page,
  extensionId,
  loginForm,
  startFrom,
  registerForm,
  changePasswordForm }) => {
  let password:string;
  const email:string = getRandomEmail();
  await test.step("Login to the application", async () => {
    await page.goto(`chrome-extension://${extensionId}/index.html`);
    await page.evaluate((key) => {
      window.localStorage.setItem(key, "true");
    }, IS_ADMIN_LOGGED_IN);
    await expect(loginForm.loginButton).toBeVisible();
    await loginForm.usernameInput.fill(USERNAME);
    await loginForm.passwordInput.fill(PASSWORD);
    await loginForm.loginButton.click();
    await expect(startFrom.header).toBeVisible();
  });
  await test.step("Go to admin section", async () => {
    await startFrom.adminSection.click();
  });
  await test.step("Register new user", async () => {
    await registerForm.emailInput.fill(email);
    await registerForm.registerButton.click();
    const responseBody = await page
      .waitForResponse((response) => response.url().includes("/users/registration") && response.status() === CREATED);
    password = (await responseBody.json()).password;
    expect(password).toBeDefined();
  });
  await test.step("Logout as admin", async () => {
    await startFrom.logout.click();
  });
  await test.step("Login as new user", async () => {
    await expect(loginForm.loginButton).toBeVisible();
    await loginForm.usernameInput.fill(email);
    await loginForm.passwordInput.fill(password);
    await loginForm.loginButton.click();
    await expect(changePasswordForm.header).toBeVisible();
  });
});
