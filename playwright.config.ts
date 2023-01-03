import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./test",
  expect: {
    timeout: 5000,
  },
  timeout: 120000,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 1,
  reporter: "html",
  use: {
    actionTimeout: 0,
    trace: "on-first-retry",
    video: "on",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
    },
  ],

  outputDir: "test/results/",

};

export default config;
