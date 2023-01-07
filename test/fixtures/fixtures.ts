/* eslint-disable no-empty-pattern */
import { test as base, request as baseRequest, chromium, type BrowserContext, APIRequestContext } from "@playwright/test";
import path from "path";
import { LoginForm,
  StartForm,
  MergeCasesForm,
  CopyCasesForm,
  ChagePasswordForm } from "../po/index";
import { API_BASE_URL, API_TIMEOUT } from "../constants/index";

type Fixtures = {
  context: BrowserContext;
  extensionId: string;
  loginForm: LoginForm;
  startFrom: StartForm;
  copyCasesForm: CopyCasesForm;
  mergeCasesForm: MergeCasesForm;
  changePasswordForm: ChagePasswordForm;
  api: APIRequestContext;
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
  changePasswordForm: async ({ page }, use) => {
    const changePasswordForm = new ChagePasswordForm(page);
    await use(changePasswordForm);
  },
  api: async ({ }, use) => {
    await use(await baseRequest.newContext({
      baseURL: API_BASE_URL,
      extraHTTPHeaders: {
        "Content-Type": "application/json",
      },
      timeout: API_TIMEOUT,
    }));
  },
});
export const expect = test.expect;
