# Deployment Guide - Mini Site Generator

## Quick Start

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Docker

```bash
# Build
docker build -t mini-site-generator .

# Run
docker run -p 3000:3000 \
  -e ANTHROPIC_API_KEY=your_key \
  mini-site-generator
```

### Manual

```bash
# Build
npm run build

# Start
NODE_ENV=production npm start
```

## Environment Setup

### Required Variables

```bash
ANTHROPIC_API_KEY=sk-ant-...
NODE_ENV=production
```

### Optional Variables

```bash
NEXT_PUBLIC_APP_URL=https://your-domain.com
VERCEL_TOKEN=...
VERCEL_ORG_ID=...
```

## Vercel Deployment

### Step 1: Connect Repository

1. Go to vercel.com
2. New Project
3. Import Git Repository
4. Select mini-site-generator

### Step 2: Configure

```javascript
// vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["cdg1"], // Paris
  "env": {
    "ANTHROPIC_API_KEY": "@anthropic-api-key"
  }
}
```

### Step 3: Environment Variables

Add in Vercel Dashboard:
- ANTHROPIC_API_KEY (Secret)
- NEXT_PUBLIC_APP_URL

### Step 4: Deploy

```bash
git push origin main
# Vercel auto-deploys
```

## Docker Deployment

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Dependencies
COPY package*.json ./
RUN npm ci --only=production

# Application
COPY . .
RUN npm run build

# Runtime
EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000

CMD ["npm", "start"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - NODE_ENV=production
    volumes:
      - ./app/generated:/app/app/generated
      - ./public/downloads:/app/public/downloads
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### Deploy

```bash
docker-compose up -d
```

## AWS Deployment

### EC2

```bash
# SSH to instance
ssh ubuntu@your-ec2-instance

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and deploy
git clone https://github.com/TechNatool/mini-site-generator.git
cd mini-site-generator
npm install
npm run build

# PM2 for process management
sudo npm install -g pm2
pm2 start npm --name "site-generator" -- start
pm2 save
pm2 startup
```

### ECS (Elastic Container Service)

1. Build Docker image
2. Push to ECR
3. Create ECS Task Definition
4. Create ECS Service
5. Configure Load Balancer

## Environment-Specific Config

### Development

```bash
NODE_ENV=development
npm run dev
```

### Staging

```bash
NODE_ENV=staging
NEXT_PUBLIC_APP_URL=https://staging.example.com
npm run build && npm start
```

### Production

```bash
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://example.com
npm run build && npm start
```

## Health Checks

### Create Health Endpoint

```typescript
// app/api/health/route.ts
export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  };

  return Response.json(health, { status: 200 });
}
```

### Monitor

```bash
curl http://localhost:3000/api/health
```

## Logging

### Production Logging

```typescript
// lib/logger.ts
import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
```

## Monitoring

### Vercel Analytics

Enable in Vercel Dashboard.

### Custom Monitoring

```typescript
// lib/metrics.ts
export function trackGeneration(clientId: string, duration: number) {
  // Send to monitoring service
  fetch('https://your-metrics-endpoint.com/track', {
    method: 'POST',
    body: JSON.stringify({
      event: 'site_generated',
      clientId,
      duration,
      timestamp: Date.now(),
    }),
  });
}
```

## Scaling

### Horizontal Scaling

```yaml
# kubernetes deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: site-generator
spec:
  replicas: 3
  selector:
    matchLabels:
      app: site-generator
  template:
    metadata:
      labels:
        app: site-generator
    spec:
      containers:
      - name: app
        image: site-generator:latest
        ports:
        - containerPort: 3000
        env:
        - name: ANTHROPIC_API_KEY
          valueFrom:
            secretKeyRef:
              name: api-secrets
              key: anthropic-key
```

### Load Balancing

Use:
- Vercel Edge Network (automatic)
- AWS ALB
- Nginx
- Cloudflare

## Backup Strategy

### Automated Backups

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/$DATE"

# Backup generated sites metadata
mkdir -p "$BACKUP_DIR"
cp -r app/generated/*.json "$BACKUP_DIR/"

# Upload to S3
aws s3 sync "$BACKUP_DIR" "s3://your-bucket/backups/$DATE"

# Keep only 30 days
find /backups -type d -mtime +30 -exec rm -rf {} \;
```

### Schedule with cron

```bash
# Edit crontab
crontab -e

# Daily backup at 2 AM
0 2 * * * /path/to/backup.sh
```

## Rollback Strategy

### Vercel

```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback
```

### Docker

```bash
# Tag images with versions
docker build -t site-generator:v1.2.3 .

# Rollback
docker-compose down
docker-compose up -d site-generator:v1.2.2
```

## Performance Optimization

### Caching

```typescript
// next.config.mjs
module.exports = {
  async headers() {
    return [
      {
        source: '/downloads/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600',
          },
        ],
      },
    ];
  },
};
```

### CDN

Use Cloudflare or Vercel Edge Network for:
- Static assets
- Generated ZIPs
- Preview pages

## Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Runtime Errors

Check logs:
```bash
# Vercel
vercel logs

# Docker
docker-compose logs -f

# PM2
pm2 logs
```

### Out of Memory

Increase Node.js memory:
```bash
NODE_OPTIONS="--max-old-space-size=4096" npm start
```

## Checklist

### Pre-Deployment

- [ ] All tests pass
- [ ] Build succeeds locally
- [ ] Environment variables set
- [ ] Secrets configured
- [ ] Database migrations (if applicable)
- [ ] Dependencies updated
- [ ] Security audit clean

### Post-Deployment

- [ ] Health check passes
- [ ] Smoke tests pass
- [ ] Monitoring active
- [ ] Logs flowing
- [ ] Backups configured
- [ ] Rollback plan ready
- [ ] Team notified

## CI/CD Pipeline

See `.github/workflows/deploy.yml` for automated deployment.

## Support

Deployment issues: devops@example.com
