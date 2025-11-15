# Security Policy - Mini Site Generator

## Reporting Security Issues

**DO NOT** open public issues for security vulnerabilities.

Instead, email security@example.com with:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will respond within 48 hours.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Security Measures

### Input Validation

```typescript
// All user inputs are validated with Zod
import { z } from 'zod';

const FormDataSchema = z.object({
  name: z.string().min(2).max(100),
  activity: z.string(),
  city: z.string().min(2).max(100),
  services: z.array(z.string()).min(1).max(20),
  contact: z.object({
    phone: z.string().regex(/^\+?[\d\s-()]+$/),
    email: z.string().email(),
  }),
});
```

### XSS Prevention

All user content is escaped before rendering:

```typescript
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
```

### SQL Injection

Not applicable - we use filesystem storage, no SQL database.

### Path Traversal

```typescript
// Always use process.cwd() and path.join()
const safePath = path.join(process.cwd(), 'app', 'generated', clientId);

// Never use user input directly in paths
// ❌ BAD: fs.readFile(userInput)
// ✅ GOOD: fs.readFile(path.join(basePath, sanitized))
```

### CSRF Protection

Next.js provides built-in CSRF protection for Server Actions and API routes.

### Rate Limiting

TODO: Implement rate limiting
```typescript
// Suggested: use @upstash/ratelimit
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});
```

### Environment Variables

```bash
# NEVER commit .env files
# Use .env.example for templates

# Sensitive variables
ANTHROPIC_API_KEY=sk-ant-...  # NEVER expose to client
VERCEL_TOKEN=...              # NEVER expose to client

# Public variables (NEXT_PUBLIC_*)
NEXT_PUBLIC_APP_URL=https://... # OK to expose
```

### Dependencies

#### Automated Audits

```bash
# Run npm audit
npm audit

# Fix vulnerabilities
npm audit fix

# Check for outdated packages
npm outdated
```

#### Dependabot

GitHub Dependabot automatically creates PRs for security updates.

### API Security

#### Claude API Key

```typescript
// ✅ GOOD: Server-side only
// app/api/route.ts
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // Server-side only
});

// ❌ BAD: Client-side
// components/Component.tsx
const apiKey = process.env.ANTHROPIC_API_KEY; // Will be exposed!
```

#### Request Timeout

```typescript
// app/api/generate-site/route.ts
export const maxDuration = 60; // 60 seconds max

// Prevent long-running requests
```

### File Upload (Future)

When implementing file uploads:

```typescript
// Validate file type
const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
if (!allowedTypes.includes(file.type)) {
  throw new Error('Invalid file type');
}

// Validate file size
const maxSize = 5 * 1024 * 1024; // 5MB
if (file.size > maxSize) {
  throw new Error('File too large');
}

// Generate random filename
import { randomUUID } from 'crypto';
const filename = `${randomUUID()}.${extension}`;

// Scan for malware (use ClamAV or similar)
await scanFile(file);
```

### iframe Sandbox

```tsx
// app/preview/[clientId]/page.tsx
<iframe
  srcDoc={htmlContent}
  sandbox="allow-same-origin allow-scripts"
  // Restricts iframe capabilities
/>
```

### Content Security Policy

TODO: Add CSP headers

```typescript
// next.config.mjs
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' cdn.tailwindcss.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' api.anthropic.com",
    ].join('; '),
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

## Security Checklist

### Development

- [ ] Never commit secrets (.env files)
- [ ] Use environment variables for API keys
- [ ] Validate all user inputs
- [ ] Escape HTML output
- [ ] Use HTTPS in production
- [ ] Enable CORS only for trusted origins
- [ ] Implement rate limiting
- [ ] Log security events

### Deployment

- [ ] Set NODE_ENV=production
- [ ] Use secure headers (CSP, HSTS, etc.)
- [ ] Enable HTTPS/TLS
- [ ] Rotate API keys regularly
- [ ] Monitor for suspicious activity
- [ ] Keep dependencies updated
- [ ] Regular security audits

### Code Review

- [ ] No hardcoded secrets
- [ ] Input validation present
- [ ] Error messages don't leak sensitive info
- [ ] SQL injection not possible
- [ ] XSS prevented
- [ ] CSRF tokens used
- [ ] Authentication checked
- [ ] Authorization verified

## Security Testing

### Automated Scans

```bash
# npm audit
npm audit --audit-level=moderate

# Snyk
npx snyk test

# OWASP Dependency Check
npm run security:check
```

### Manual Testing

```bash
# Test XSS
curl -X POST http://localhost:3000/api/generate-site \
  -H "Content-Type: application/json" \
  -d '{"formData":{"name":"<script>alert(1)</script>"}}'

# Test SQL Injection (not applicable but good practice)
# Test Path Traversal
# Test Authentication bypass
# Test Authorization bypass
```

### Penetration Testing

Conduct penetration testing before major releases.

## Incident Response

### 1. Detection

Monitor for:
- Failed authentication attempts
- Unusual API usage patterns
- Error rate spikes
- Suspicious file operations

### 2. Containment

- Rotate compromised API keys immediately
- Block suspicious IP addresses
- Disable affected features

### 3. Investigation

- Review logs
- Identify attack vector
- Assess impact
- Document findings

### 4. Recovery

- Fix vulnerability
- Deploy patch
- Verify fix
- Monitor for recurrence

### 5. Post-Incident

- Update security measures
- Notify affected users
- Document lessons learned
- Update security documentation

## Compliance

### GDPR (if applicable)

- User data minimization
- Right to deletion
- Data encryption
- Privacy policy

### Data Retention

- Generated sites: 24 hours (auto-cleanup)
- ZIP files: 24 hours (auto-cleanup)
- Logs: 30 days max
- Backups: 90 days max

## Security Updates

Subscribe to security advisories:
- GitHub Security Advisories
- npm Security Advisories
- Next.js Security Updates
- Anthropic API Updates

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Anthropic Security](https://docs.anthropic.com/claude/docs/security)

## Contact

Security Team: security@example.com
Response Time: 48 hours
PGP Key: [Link to public key]
