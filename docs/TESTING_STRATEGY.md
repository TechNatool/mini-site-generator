# Testing Strategy - Mini Site Generator

## Overview

Notre stratégie de test vise une couverture de 90-100% avec une pyramide de tests équilibrée.

## Test Pyramid

```
         /\
        /  \  E2E (10%)
       /____\
      /      \  Integration (30%)
     /________\
    /          \  Unit (60%)
   /__________\
```

## Tools

- **Vitest**: Tests unitaires et d'intégration
- **Playwright**: Tests E2E
- **Testing Library**: Tests de composants React
- **MSW**: Mock Service Worker pour API
- **Istanbul**: Coverage reporting

## Test Structure

```
tests/
├── unit/                    # Tests unitaires
│   ├── lib/
│   │   ├── generator.test.ts
│   │   ├── claude-api.test.ts
│   │   ├── seo.test.ts
│   │   └── utils/
│   │       ├── zip.test.ts
│   │       └── cleanup.test.ts
│   └── components/
│       └── FormGenerator.test.tsx
│
├── integration/             # Tests d'intégration
│   ├── api/
│   │   └── generate-site.test.ts
│   └── workflows/
│       └── full-generation.test.ts
│
├── e2e/                     # Tests E2E
│   ├── generation.spec.ts
│   ├── preview.spec.ts
│   └── download.spec.ts
│
├── regression/              # Tests de non-régression
│   ├── snapshots/
│   └── visual/
│
├── security/                # Tests de sécurité
│   ├── xss.test.ts
│   ├── sql-injection.test.ts
│   └── auth.test.ts
│
└── fixtures/                # Données de test
    ├── form-data.ts
    ├── ai-content.ts
    └── mock-responses.ts
```

## Unit Tests

### Example: lib/generator.test.ts

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateClientId, generateSite, saveSiteFiles } from '@/lib/generator';
import type { FormData } from '@/types/generator';

describe('Generator', () => {
  describe('generateClientId', () => {
    it('should generate unique ID with correct format', () => {
      const id = generateClientId();
      expect(id).toMatch(/^site-\d+-[a-z0-9]+$/);
    });

    it('should generate different IDs on each call', () => {
      const id1 = generateClientId();
      const id2 = generateClientId();
      expect(id1).not.toBe(id2);
    });
  });

  describe('generateSite', () => {
    const mockFormData: FormData = {
      name: 'Test Plombier',
      activity: 'plombier',
      city: 'Paris',
      services: ['Dépannage', 'Installation'],
      colors: { primary: '#3B82F6', secondary: '#10B981' },
      style: 'modern',
      languages: ['fr'],
      contact: {
        phone: '0123456789',
        email: 'test@example.com',
      },
    };

    it('should generate complete site', async () => {
      const site = await generateSite(mockFormData);

      expect(site.clientId).toBeDefined();
      expect(site.pages.home).toContain('Test Plombier');
      expect(site.pages.about).toBeDefined();
      expect(site.files).toHaveLength(8); // 6 HTML + sitemap + robots
    });

    it('should handle missing optional fields', async () => {
      const minimalData = {
        ...mockFormData,
        photos: undefined,
        logo: undefined,
      };

      const site = await generateSite(minimalData);
      expect(site).toBeDefined();
    });
  });

  describe('saveSiteFiles', () => {
    it('should create all required files', async () => {
      // Test implementation
    });

    it('should create placeholders for missing pages', async () => {
      // Test implementation
    });
  });
});
```

### Example: lib/utils/cleanup.test.ts

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { cleanOldGeneratedSites, getStorageStats } from '@/lib/utils/cleanup';
import fs from 'fs/promises';
import path from 'path';

describe('Cleanup Utils', () => {
  const testDir = path.join(process.cwd(), 'tests', 'fixtures', 'generated');

  beforeEach(async () => {
    await fs.mkdir(testDir, { recursive: true });
  });

  afterEach(async () => {
    await fs.rm(testDir, { recursive: true, force: true });
  });

  it('should delete sites older than threshold', async () => {
    // Create old site
    const oldSite = path.join(testDir, 'site-old');
    await fs.mkdir(oldSite);

    // Set old modification time
    const oldTime = Date.now() - (25 * 60 * 60 * 1000); // 25 hours ago
    await fs.utimes(oldSite, new Date(oldTime), new Date(oldTime));

    const deleted = await cleanOldGeneratedSites(24);
    expect(deleted).toBe(1);
  });
});
```

## Integration Tests

### Example: api/generate-site.test.ts

```typescript
import { describe, it, expect } from 'vitest';
import { POST } from '@/app/api/generate-site/route';

describe('POST /api/generate-site', () => {
  it('should generate site with valid data', async () => {
    const request = new Request('http://localhost:3000/api/generate-site', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formData: {
          name: 'Test Plombier',
          activity: 'plombier',
          city: 'Paris',
          services: ['Dépannage'],
          contact: {
            phone: '0123456789',
            email: 'test@example.com',
          },
        },
        options: {
          generateImages: false,
          autoDeployVercel: false,
        },
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.clientId).toMatch(/^site-/);
    expect(data.zipUrl).toBeDefined();
    expect(data.previewUrl).toBeDefined();
  });

  it('should return 400 for missing required fields', async () => {
    const request = new Request('http://localhost:3000/api/generate-site', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formData: {
          name: 'Test',
          // Missing activity and city
        },
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
```

## E2E Tests

### Example: generation.spec.ts

```typescript
import { test, expect } from '@playwright/test';

test.describe('Site Generation Flow', () => {
  test('should generate site end-to-end', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Fill form
    await page.fill('[name="name"]', 'Test Plombier');
    await page.selectOption('[name="activity"]', 'plombier');
    await page.fill('[name="city"]', 'Paris');
    await page.fill('[name="services"]', 'Dépannage,Installation');
    await page.fill('[name="phone"]', '0123456789');
    await page.fill('[name="email"]', 'test@example.com');

    // Submit
    await page.click('button[type="submit"]');

    // Wait for generation
    await expect(page.locator('text=Génération du site en cours')).toBeVisible();

    // Check success
    await expect(page.locator('text=Site généré avec succès')).toBeVisible({
      timeout: 60000,
    });

    // Check download button
    const downloadLink = page.locator('a:has-text("Télécharger mon site")');
    await expect(downloadLink).toBeVisible();

    // Check preview link
    const previewLink = page.locator('a:has-text("Prévisualiser")');
    await expect(previewLink).toBeVisible();
  });

  test('should display error for invalid data', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Submit without filling
    await page.click('button[type="submit"]');

    // Check error
    await expect(page.locator('text=requis')).toBeVisible();
  });
});
```

## Regression Tests

### Snapshot Testing

```typescript
import { describe, it, expect } from 'vitest';
import { homeTemplate } from '@/lib/templates/home';

describe('Home Template Snapshots', () => {
  it('should match snapshot', () => {
    const html = homeTemplate.generateContent(mockFormData, mockAIContent);
    expect(html).toMatchSnapshot();
  });
});
```

### Visual Regression (Playwright)

```typescript
import { test, expect } from '@playwright/test';

test('homepage visual regression', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveScreenshot('homepage.png');
});
```

## Security Tests

### XSS Testing

```typescript
import { describe, it, expect } from 'vitest';
import { homeTemplate } from '@/lib/templates/home';

describe('XSS Prevention', () => {
  it('should escape HTML in user input', () => {
    const maliciousData = {
      name: '<script>alert("XSS")</script>',
      activity: 'plombier',
      city: 'Paris',
      // ...
    };

    const html = homeTemplate.generateContent(maliciousData, mockAIContent);

    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });
});
```

## Coverage Requirements

### Minimum Coverage

- **Overall**: 90%
- **Statements**: 90%
- **Branches**: 85%
- **Functions**: 90%
- **Lines**: 90%

### Coverage Reports

```bash
# Generate coverage
npm run test:coverage

# View HTML report
open coverage/index.html
```

### Coverage Config (vitest.config.ts)

```typescript
export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/dist/**',
      ],
      thresholds: {
        statements: 90,
        branches: 85,
        functions: 90,
        lines: 90,
      },
    },
  },
});
```

## Test Commands

```bash
# Run all tests
npm run test

# Run specific test suite
npm run test:unit
npm run test:integration
npm run test:e2e

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# Update snapshots
npm run test:update-snapshots

# Run specific file
npm run test tests/unit/generator.test.ts

# Debug mode
npm run test:debug
```

## CI Integration

Tests run automatically on:
- Every PR
- Every commit to main
- Nightly builds

### GitHub Actions

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3
```

## Mocking

### Mock Claude API

```typescript
import { vi } from 'vitest';

vi.mock('@/lib/claude-api', () => ({
  generateSiteContent: vi.fn().mockResolvedValue({
    home: {
      h1: 'Test Title',
      tagline: 'Test Tagline',
      // ...
    },
    // ...
  }),
}));
```

### Mock File System

```typescript
import { vi } from 'vitest';
import fs from 'fs/promises';

vi.mock('fs/promises', () => ({
  default: {
    mkdir: vi.fn(),
    writeFile: vi.fn(),
    readFile: vi.fn(),
  },
}));
```

## Best Practices

1. **Test Naming**: Descriptive and follows pattern: `should {expected behavior} when {condition}`
2. **AAA Pattern**: Arrange, Act, Assert
3. **Isolation**: Each test is independent
4. **Deterministic**: Tests always produce same result
5. **Fast**: Unit tests < 100ms, Integration < 1s, E2E < 30s
6. **Maintainable**: Easy to understand and update
7. **Coverage**: Focus on critical paths, not 100% at all costs

## Continuous Improvement

- Review flaky tests weekly
- Update snapshots with intentional changes
- Add tests for every bug fix
- Refactor tests when refactoring code
- Monitor test execution time
