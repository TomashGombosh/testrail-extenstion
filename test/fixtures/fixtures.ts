/* eslint-disable no-empty-pattern */
import { test as base, chromium, type BrowserContext } from "@playwright/test";
import path from "path";
import { LoginForm, StartForm, MergeCasesForm, CopyCasesForm } from "../po/index";

type Fixtures = {
  context: BrowserContext;
  extensionId: string;
  loginForm: LoginForm;
  startFrom: StartForm;
  copyCasesForm: CopyCasesForm;
  mergeCasesForm: MergeCasesForm;
}

export const test = base.extend<Fixtures>({
  context: async ({ }, use) => {
    const pathToExtension = path.join(__dirname, "../../build");
    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });
    await use(context);
    await context.close();
  },
  extensionId: async ({ context }, use) => {
    let [background] = context.serviceWorkers();
    if (!background) { background = await context.waitForEvent("serviceworker"); }

    const extensionId = background.url().split("/")[2];
    await use(extensionId);
  },
  loginForm: async ({ page }, use) => {
    const loginForm = new LoginForm(page);
    await use(loginForm);
  },
  startFrom: async ({ page }, use) => {
    const startForm = new StartForm(page);
    await use(startForm);
  },
  copyCasesForm: async ({ page }, use) => {
    const copyCasesForm = new CopyCasesForm(page);
    await use(copyCasesForm);
  },
  mergeCasesForm: async ({ page }, use) => {
    const mergeCasesForm = new MergeCasesForm(page);
    await use(mergeCasesForm);
  },
});
export const expect = test.expect;
