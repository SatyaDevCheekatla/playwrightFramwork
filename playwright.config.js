// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['allure-playwright'],
  ],
  use: {
    headless: !process.env.CI,  // ← Run headless on CI, headed locally
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'on',
  },

  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});