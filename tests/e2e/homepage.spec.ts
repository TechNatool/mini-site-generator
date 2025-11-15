import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display homepage with form', async ({ page }) => {
    await page.goto('/');

    // Check title
    await expect(page).toHaveTitle(/Mini Site Generator/i);

    // Check hero section
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();

    // Check form is present
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });

  test('should show validation errors on empty submit', async ({ page }) => {
    await page.goto('/');

    // Try to submit empty form
    const submitButton = page.getByRole('button', { name: /générer/i });
    await submitButton.click();

    // Should show validation errors
    // Note: Adjust selectors based on actual implementation
    const errors = page.locator('[role="alert"], .error, .text-red-600');
    await expect(errors.first()).toBeVisible({ timeout: 5000 });
  });
});
