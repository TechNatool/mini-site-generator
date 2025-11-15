# Maintenance Guide - Mini Site Generator

## Daily Tasks

### Automated (via cron/GitHub Actions)

- ✓ Cleanup old sites (> 24h)
- ✓ Cleanup old ZIPs (> 24h)
- ✓ Security audit (npm audit)
- ✓ Health checks
- ✓ Log rotation

### Manual Checks

- Monitor error rates
- Check disk space
- Review failed generations
- Check Claude API usage

## Weekly Tasks

- Review analytics
- Update dependencies
- Check backup integrity
- Review security logs
- Performance review

## Monthly Tasks

- Full security audit
- Dependency updates
- Documentation review
- Cost optimization review
- User feedback analysis

## Automated Cleanup

### Current Implementation

```typescript
// lib/utils/cleanup.ts - Already implemented
cleanupOldFiles(24); // Runs after each generation
```

### Cron Job (Recommended)

```bash
# /etc/cron.d/site-generator-cleanup
# Run cleanup every hour
0 * * * * node /path/to/scripts/cleanup-cron.js >> /var/log/cleanup.log 2>&1
```

```javascript
// scripts/cleanup-cron.js
const { cleanupOldFiles, getStorageStats } = require('../lib/utils/cleanup');

async function main() {
  console.log('[Cron] Starting cleanup...');

  const stats = getStorageStats();
  console.log('[Cron] Storage before:', stats);

  const result = await cleanupOldFiles(24);
  console.log('[Cron] Deleted:', result);

  const statsAfter = getStorageStats();
  console.log('[Cron] Storage after:', statsAfter);
}

main().catch(console.error);
```

## Log Management

### Log Rotation

```bash
# /etc/logrotate.d/site-generator
/var/log/site-generator/*.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 0640 www-data www-data
}
```

### Log Monitoring

```bash
# Check for errors
tail -f /var/log/site-generator/error.log | grep ERROR

# Count errors per hour
grep ERROR /var/log/site-generator/error.log | \
  awk '{print $1" "$2}' | cut -c1-13 | uniq -c
```

## Backup Procedures

### Metadata Backup

```bash
#!/bin/bash
# scripts/backup-metadata.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/metadata/$DATE"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Copy all metadata.json files
find app/generated -name "metadata.json" -exec cp {} "$BACKUP_DIR/" \;

# Compress
tar -czf "/backups/metadata-$DATE.tar.gz" "$BACKUP_DIR"

# Upload to S3
aws s3 cp "/backups/metadata-$DATE.tar.gz" \
  "s3://your-backup-bucket/metadata/"

# Cleanup local backup
rm -rf "$BACKUP_DIR"
rm "/backups/metadata-$DATE.tar.gz"

# Keep only last 90 days on S3
aws s3 ls "s3://your-backup-bucket/metadata/" | \
  awk '{print $4}' | \
  head -n -90 | \
  xargs -I {} aws s3 rm "s3://your-backup-bucket/metadata/{}"

echo "Backup completed: metadata-$DATE.tar.gz"
```

### Database Backup (if using PostgreSQL)

```bash
#!/bin/bash
# scripts/backup-database.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="/backups/db-$DATE.sql.gz"

# Dump database
pg_dump $DATABASE_URL | gzip > "$BACKUP_FILE"

# Upload to S3
aws s3 cp "$BACKUP_FILE" "s3://your-backup-bucket/database/"

# Keep only 30 days
find /backups -name "db-*.sql.gz" -mtime +30 -delete

echo "Database backup completed: $BACKUP_FILE"
```

## Dependency Management

### Update Dependencies

```bash
# Check outdated
npm outdated

# Update non-breaking
npm update

# Update with breaking changes (careful!)
npm install <package>@latest

# Audit security
npm audit
npm audit fix

# Test after updates
npm run test
npm run build
```

### Automated Updates (Dependabot)

Already configured in `.github/dependabot.yml`

## Performance Monitoring

### Metrics to Track

```typescript
// scripts/collect-metrics.ts
import { getStorageStats } from '../lib/utils/cleanup';

async function collectMetrics() {
  const stats = getStorageStats();

  const metrics = {
    timestamp: new Date().toISOString(),
    generatedSites: stats.generatedSitesCount,
    zipFiles: stats.zipFilesCount,
    totalSize: stats.totalSizeBytes,
    totalSizeMB: (stats.totalSizeBytes / 1024 / 1024).toFixed(2),
  };

  console.log(JSON.stringify(metrics));

  // Send to monitoring service
  // await sendToDatadog(metrics);
  // await sendToPrometheus(metrics);
}

collectMetrics();
```

### Cron Schedule

```bash
# Collect metrics every 5 minutes
*/5 * * * * node /path/to/scripts/collect-metrics.ts >> /var/log/metrics.log
```

## Health Checks

### Manual Health Check

```bash
# Check API
curl http://localhost:3000/api/health

# Check disk space
df -h

# Check memory
free -h

# Check process
ps aux | grep node

# Check logs for errors
tail -n 100 /var/log/site-generator/error.log
```

### Automated Health Checks

```typescript
// scripts/health-check.ts
import fetch from 'node-fetch';

async function healthCheck() {
  try {
    // API health
    const apiHealth = await fetch('http://localhost:3000/api/health');
    if (!apiHealth.ok) {
      throw new Error('API unhealthy');
    }

    // Disk space
    const { execSync } = require('child_process');
    const diskUsage = execSync("df -h / | tail -1 | awk '{print $5}'")
      .toString()
      .trim()
      .replace('%', '');

    if (parseInt(diskUsage) > 80) {
      console.error('ALERT: Disk usage above 80%');
    }

    // Memory
    const used = process.memoryUsage();
    if (used.heapUsed > 1024 * 1024 * 1024) { // 1GB
      console.warn('WARNING: High memory usage');
    }

    console.log('✓ Health check passed');
  } catch (error) {
    console.error('✗ Health check failed:', error);
    process.exit(1);
  }
}

healthCheck();
```

## Troubleshooting

### High Disk Usage

```bash
# Find large files
du -sh app/generated/* | sort -rh | head -20

# Force cleanup
node scripts/force-cleanup.js

# Check for zombie files
find app/generated -type f -size +100M
```

### High Memory Usage

```bash
# Check Node.js processes
ps aux | grep node | awk '{print $2, $4, $11}'

# Restart if needed
pm2 restart site-generator

# Or with systemd
systemctl restart site-generator
```

### High Error Rate

```bash
# Check error logs
tail -f /var/log/site-generator/error.log

# Count error types
grep ERROR /var/log/site-generator/error.log | \
  awk -F'ERROR:' '{print $2}' | \
  sort | uniq -c | sort -rn

# Check Claude API status
curl https://status.anthropic.com/api/v2/summary.json
```

### Failed Generations

```bash
# Find incomplete sites
node scripts/find-incomplete-sites.js

# Retry failed
node scripts/retry-failed.js

# Clean up failures
node scripts/cleanup-failed.js
```

## Disaster Recovery

### Backup Restoration

```bash
# Download backup from S3
aws s3 cp "s3://your-backup-bucket/metadata/metadata-20250115.tar.gz" .

# Extract
tar -xzf metadata-20250115.tar.gz

# Restore
cp -r backup_dir/* app/generated/

# Verify
node scripts/verify-restored-sites.js
```

### Database Restoration

```bash
# Download backup
aws s3 cp "s3://your-backup-bucket/database/db-20250115.sql.gz" .

# Restore
gunzip < db-20250115.sql.gz | psql $DATABASE_URL
```

## Maintenance Windows

### Schedule

- **Minor updates**: Anytime (no downtime)
- **Major updates**: Sunday 2-4 AM UTC
- **Database migrations**: Sunday 2-4 AM UTC
- **Infrastructure changes**: Coordinated with team

### Notification

```bash
# Create maintenance banner
echo "MAINTENANCE MODE" > public/maintenance.txt

# Deploy maintenance page
# ...

# Perform maintenance
# ...

# Remove banner
rm public/maintenance.txt
```

## Documentation Updates

After each maintenance:

1. Update CHANGELOG.md
2. Update version in package.json
3. Tag release in Git
4. Update documentation if needed
5. Notify team

## Emergency Contacts

- **On-call Engineer**: +33 X XX XX XX XX
- **DevOps Team**: devops@example.com
- **Security Team**: security@example.com
- **Anthropic Support**: support@anthropic.com (Claude API issues)

## Runbooks

### Site Generation Failure

1. Check Claude API status
2. Check disk space
3. Check logs for errors
4. Try manual generation
5. If persists, check API key
6. Contact Anthropic if API issue

### High Load

1. Check current load: `uptime`
2. Check active processes: `pm2 list`
3. Check queue size (if implemented)
4. Scale horizontally if possible
5. Enable rate limiting if not enabled
6. Review and optimize slow endpoints

### Data Loss

1. Check backups availability
2. Estimate scope of loss
3. Restore from most recent backup
4. Verify restoration
5. Document incident
6. Update backup procedures
