import { test, expect } from "./fixtures/fixtures";
import { getRandomEmail } from "./helpers/index";

const USERNAME = process.env.USER_NAME ? process.env.USER_NAME : "";
const PASSWORD = process.env.USER_KEY ? process.env.USER_KEY : "";
const API_KEY = process.env.API_KEY ? process.env.API_KEY : "";

test("Check the first login flow", async ({ context, page,
  extensionId,
  loginForm,
  startFrom,
  changePasswordForm,
  api }) => {
  let password:string;
  const email:string = getRandomEmail();
  const newPassword:string = "Test123$";
  await test.step("Create new user via API", async () => {
    const loginResponse = await api.post("/login", {
      data: {
        email: USERNAME,
        password: PASSWORD,
      },
    });
    const token = (await loginResponse.json()).token;
    const registrationResponse = await api.patch("/users/registration", {
      data: {
        email: email,
        apiKey: API_KEY,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    password = (await registrationResponse.json()).password;
  });
  await test.step("Login to the application", async () => {
    await page.goto(`chrome-extension://${extensionId}/index.html`);
    await expect(loginForm.loginButton).toBeVisible();
    await loginForm.usernameInput.fill(email);
    await loginForm.passwordInput.fill(password);
    await loginForm.loginButton.click();
    await expect(changePasswordForm.header).toBeVisible();
  });
  await test.step("Validate the old password field", async () => {
    await changePasswordForm.oldPassword.type("2");
    await changePasswordForm.oldPassword.clear();
    await expect(changePasswordForm.oldPasswordErrorText).toHaveText("This field is required");
    await expect(changePasswordForm.newPassword).toBeDisabled();
    await expect(changePasswordForm.confirmPassword).toBeDisabled();
    await expect(changePasswordForm.change).toBeDisabled();
  });
  await test.step("Validate the new password field", async () => {
    await changePasswordForm.oldPassword.clear();
    await changePasswordForm.oldPassword.type(password);
    await changePasswordForm.newPassword.type("Test", {delay: 100});
    await expect(changePasswordForm.newPasswordErrorText).toHaveText("Password too easy. Please use uppercase, lowercase and numbers");
    await expect(changePasswordForm.confirmPassword).toBeDisabled();
    await expect(changePasswordForm.change).toBeDisabled();
  });
  await test.step("Validate the confirm password field", async () => {
    await changePasswordForm.newPassword.clear();
    await changePasswordForm.newPassword.type(newPassword, {delay: 100});
    await changePasswordForm.confirmPassword.type("Test123", {delay: 100});
    await expect(changePasswordForm.confirmPasswordErrorText).toHaveText("Password is not the same");
    await expect(changePasswordForm.change).toBeDisabled();
  });
  await test.step("Check the text icon", async () => {
    await changePasswordForm.confirmPassword.clear();
    await changePasswordForm.confirmPassword.type(newPassword, {delay: 100});
    await changePasswordForm.oldPasswordShowPassword.click();
    await expect(changePasswordForm.oldPassword).toHaveAttribute("type", "text");
    await changePasswordForm.newPasswordShowPassword.click();
    await expect(changePasswordForm.newPassword).toHaveAttribute("type", "text");
  });
  await test.step("Change password of the user", async () => {
    await changePasswordForm.change.click();
    await expect(startFrom.header).toBeVisible();
  });
  await test.step("Check if the password changed", async () => {
    await startFrom.logout.click();
    await loginForm.usernameInput.fill(email);
    await loginForm.passwordInput.fill(newPassword);
    await loginForm.loginButton.click();
    await expect(startFrom.header).toBeVisible();
  });
});
