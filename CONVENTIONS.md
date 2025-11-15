# Conventions de Code - Mini Site Generator

## Commits (Conventional Commits)

### Format
```
type(scope): subject

body (optional)

footer (optional)
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Refactoring
- `perf`: Performance
- `test`: Tests
- `build`: Build system
- `ci`: CI/CD
- `chore`: Maintenance

### Scopes
- `generator`: Site generation
- `api`: API routes
- `ui`: User interface
- `templates`: Page templates
- `cleanup`: File cleanup
- `zip`: ZIP creation
- `claude`: Claude API
- `seo`: SEO utilities

### Examples
```bash
feat(generator): add PDF export
fix(api): handle missing fields
docs: update README
refactor(cleanup): improve performance
test(generator): add unit tests
```

## Naming Conventions

### Files
- Components: `PascalCase.tsx`
- Utilities: `kebab-case.ts`
- Types: `kebab-case.ts`
- Tests: `*.test.ts` or `*.test.tsx`

### Variables & Functions
```typescript
// camelCase
const userName = 'John';
function getUserData() {}

// PascalCase for types/interfaces/components
interface UserData {}
function UserProfile() {}

// UPPER_SNAKE_CASE for constants
const MAX_RETRIES = 3;
const API_ENDPOINT = '/api/users';
```

## Directory Structure
```
src/
├── app/          # Next.js App Router
├── components/   # React components
├── lib/          # Business logic
├── types/        # TypeScript types
├── tests/        # All tests
└── docs/         # Documentation
```

## TypeScript Rules
- Strict mode enabled
- No `any` type
- Explicit return types for functions
- Use interfaces over types when possible

## React Components
```typescript
// Props interface
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

// Component
export default function Button({ onClick, children, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 bg-primary-600"
    >
      {children}
    </button>
  );
}
```

## Imports Order
1. External packages
2. Internal modules
3. Types

```typescript
import { useState } from 'react';
import { NextRequest } from 'next/server';

import { generateSite } from '@/lib/generator';
import { cleanupOldFiles } from '@/lib/utils/cleanup';

import type { FormData } from '@/types/generator';
```

## Error Handling
```typescript
try {
  const result = await riskyOperation();
  console.log('[Module] ✓ Success');
  return result;
} catch (error) {
  console.error('[Module] ✗ Error:', error);
  throw new Error('User-friendly message');
}
```

## Logging
```typescript
// Prefixes
console.log('[Module] Info');
console.warn('[Module] ⚠ Warning');
console.error('[Module] ✗ Error');

// Symbols
// ✓ Success
// ⚠ Warning
// ✗ Error
```

## CSS (Tailwind)
```tsx
// Organized classes
<div className="
  flex items-center justify-between
  px-6 py-4
  bg-white rounded-lg shadow-md
  hover:shadow-lg transition-shadow
">
```

## Tests
```typescript
describe('Module Name', () => {
  it('should do something specific', () => {
    // Arrange
    const input = createInput();

    // Act
    const result = moduleFunction(input);

    // Assert
    expect(result).toBe(expected);
  });
});
```

## Git Branches
- `main`: Production
- `develop`: Development
- `feature/*`: New features
- `fix/*`: Bug fixes
- `docs/*`: Documentation
- `refactor/*`: Refactoring

## PR Requirements
- Descriptive title with type
- All tests pass
- Coverage >= 90%
- Code reviewed
- Documentation updated
