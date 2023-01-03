import { test, expect } from "./fixtures/fixtures";
import { MergeCasesForm } from "./po";
import { CopyCasesForm } from "./po/copyCasesForm";

const USERNAME = process.env.USER_NAME ? process.env.USER_NAME : "";
const PASSWORD = process.env.USER_KEY ? process.env.USER_KEY : "";

test("Check the route state Copy Cases Form after close the app", async ({ context, page,
  extensionId,
  loginForm,
  startFrom,
  copyCasesForm }) => {
  await test.step("Login to the application", async () => {
    await page.goto(`chrome-extension://${extensionId}/index.html`);
    await expect(loginForm.loginButton).toBeVisible();
    await loginForm.usernameInput.type(USERNAME, {delay: 100});
    await loginForm.passwordInput.type(PASSWORD, {delay: 100});
    await loginForm.loginButton.click();
    await expect(startFrom.header).toBeVisible();
  });
  await test.step("Go to the copy cases form", async () => {
    await startFrom.copyCasesButton.click();
    await expect(copyCasesForm.header).toBeVisible();
    await expect(copyCasesForm.casesIdsInput).toBeVisible();
    await expect(copyCasesForm.buttonsContainer).toBeVisible();
  });
  await test.step("Close the extension", async () => {
    await page.close();
  });
  await test.step("Open extension in the Copy Cases form", async () => {
    page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/index.html`);
    const newCopyCasesForm = new CopyCasesForm(page);
    await expect(newCopyCasesForm.header).toBeVisible();
    await expect(newCopyCasesForm.casesIdsInput).toBeVisible();
    await expect(newCopyCasesForm.buttonsContainer).toBeVisible();
  });
});

test("Check the route state Merge Cases Form after close the app", async ({ context, page,
  extensionId,
  loginForm,
  startFrom,
  mergeCasesForm}) => {
  await test.step("Login to the application", async () => {
    await page.goto(`chrome-extension://${extensionId}/index.html`);
    await expect(loginForm.loginButton).toBeVisible();
    await loginForm.usernameInput.type(USERNAME, {delay: 100});
    await loginForm.passwordInput.type(PASSWORD, {delay: 100});
    await loginForm.loginButton.click();
    await expect(startFrom.header).toBeVisible();
  });
  await test.step("Go to the copy cases form", async () => {
    await startFrom.mergeCasesButton.click();
    await expect(mergeCasesForm.header).toBeVisible();
    await expect(mergeCasesForm.selectMergeType).toBeVisible();
    await expect(mergeCasesForm.buttonsContainer).toBeVisible();
  });
  await test.step("Close the extension", async () => {
    await page.close();
  });
  await test.step("Open extension in the Copy Cases form", async () => {
    page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/index.html`);
    const newMergeCasesForm = new MergeCasesForm(page);
    await expect(newMergeCasesForm.header).toBeVisible();
    await expect(newMergeCasesForm.selectMergeType).toBeVisible();
    await expect(newMergeCasesForm.buttonsContainer).toBeVisible();
  });
});
