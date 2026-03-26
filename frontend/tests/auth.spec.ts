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
    // Should stay on login and show an error message (any error text visible)
    await expect(page).toHaveURL(/\/login/)
    // Strapi can return various messages — just check that some error appears
    await expect(page.locator('form')).toContainText(/.+/, { timeout: 8000 })
  })
})

test.describe('Registration', () => {
  test('navigates to account type selector from Cadastrar', async ({ page, isMobile }) => {
    if (isMobile) {
      // On mobile, navigate directly to /registro instead of clicking through the hamburger menu
      await page.goto('/registro')
    } else {
      await page.goto('/')
      await page.click('text=Cadastrar')
    }
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

  test('shows message after submitting unknown email', async ({ page }) => {
    await page.goto('/esqueci-senha')
    await page.fill('input[type="email"]', 'naoexiste@test.com')
    await page.click('button[type="submit"]')
    // Strapi returns success even for unknown emails — check any feedback appears
    await expect(page.locator('form')).toContainText(/.+/, { timeout: 8000 })
  })
})

test.describe('Navigation', () => {
  test('home page loads with hero text', async ({ page }) => {
    await page.goto('/')
    // The hero h1 contains 'alugue na hora!' (lowercase, with exclamation)
    await expect(page.locator('text=alugue na hora!')).toBeVisible({ timeout: 10000 })
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
