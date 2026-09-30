import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  fullyParallel: false,
  retries: 1,
  reporter: 'html',
  use: {
    // Local by default would hide the real target of these tests; they were written
    // against production, so production stays the default ON PURPOSE — pass
    // BASE_URL=http://localhost:3000 to point them at the dev server instead.
    // Note: the production homepage is covered by MaintenanceOverlay for anonymous
    // visitors, so the logged-out specs only pass against a local stack.
    baseURL: process.env.BASE_URL ?? 'https://aluguenahora.com.br',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
})
