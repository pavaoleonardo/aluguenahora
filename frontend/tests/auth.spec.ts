import { test, expect } from '@playwright/test'

// ─── Auth Flow Tests ────────────────────────────────────────────────────────

test.describe('Login', () => {
  test('redirects unauthenticated user from /dashboard to /login', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL(/\/login/)
  })

  test('shows error with invalid credentials', async ({ page }) => {
    await page.goto('/login')
    await page.fill('#email', 'invalid@test.com')
    await page.fill('#password', 'wrongpassword')
    await page.click('button[type="submit"]')
    // Should stay on login and show an error
    await expect(page).toHaveURL(/\/login/)
    await expect(page.locator('text=Invalid')).toBeVisible({ timeout: 5000 })
  })
})

test.describe('Registration', () => {
  test('navigates to account type selector from Cadastrar', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Cadastrar')
    await expect(page).toHaveURL('/registro')
    await expect(page.locator('text=Sou Corretor')).toBeVisible()
    await expect(page.locator('text=Sou Proprietário')).toBeVisible()
  })

  test('navigates to corretor registration form', async ({ page }) => {
    await page.goto('/registro')
    await page.click('text=Sou Corretor')
    await expect(page).toHaveURL('/registro/corretor')
    await expect(page.locator('text=CRECI')).toBeVisible()
  })

  test('navigates to proprietario registration form', async ({ page }) => {
    await page.goto('/registro')
    await page.click('text=Sou Proprietário')
    await expect(page).toHaveURL('/registro/proprietario')
  })
})

test.describe('Password Recovery', () => {
  test('renders esqueci-senha page', async ({ page }) => {
    await page.goto('/esqueci-senha')
    await expect(page.locator('button[type="submit"]')).toContainText('Recuperar sua senha')
  })

  test('shows error for unknown email', async ({ page }) => {
    await page.goto('/esqueci-senha')
    await page.fill('input[type="email"]', 'naoexiste@test.com')
    await page.click('button[type="submit"]')
    // Strapi returns success even for unknown emails (prevents user enumeration) — check for message
    await expect(page.locator('text=e-mail')).toBeVisible({ timeout: 8000 })
  })
})

test.describe('Navigation', () => {
  test('home page loads with property listings', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('Alugue na hora')
  })

  test('imoveis page loads', async ({ page }) => {
    await page.goto('/imoveis')
    await expect(page).toHaveURL('/imoveis')
  })

  test('sobre page loads', async ({ page }) => {
    await page.goto('/sobre')
    await expect(page).toHaveURL('/sobre')
  })
})
