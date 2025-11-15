# Scalability Guide - Mini Site Generator

## Current Limitations

- **Filesystem Storage**: ~10,000 sites max
- **Synchronous Generation**: No queue system
- **Single Instance**: No horizontal scaling
- **Manual Cleanup**: Requires cron job

## Target Scale

- **10K generations/day**: Medium scale
- **100K generations/day**: Large scale
- **1M generations/day**: Enterprise scale

## Architecture Evolution

### Current (v1.0)

```
[Client] → [Next.js API] → [Claude API] → [Filesystem]
```

Limits:
- 100-500 concurrent requests
- ~10GB storage
- Single region

### Medium Scale (10K/day)

```
[LB] → [Next.js × 3] → [Queue] → [Workers × 5] → [S3]
      ↓                                  ↓
   [Redis Cache]                    [PostgreSQL]
```

Changes needed:
1. **Queue System** (Bull/BullMQ)
2. **Worker Pool** (5-10 workers)
3. **Redis** (caching + queue)
4. **PostgreSQL** (metadata)
5. **S3/R2** (storage)
6. **Load Balancer**

### Large Scale (100K/day)

```
[CDN] → [LB] → [Next.js × 10] → [Queue Cluster] → [Workers × 50]
                ↓                        ↓                ↓
          [Redis Cluster]         [Event Bus]      [Object Storage]
                                       ↓
                                [PostgreSQL HA]
```

Additional:
- **Auto-scaling** (AWS ECS/K8s)
- **Multi-region**
- **Message Queue** (RabbitMQ/Kafka)
- **Database Replication**
- **CDN** (CloudFront/Cloudflare)

## Implementation Roadmap

### Phase 1: Queue System

```typescript
// lib/queue/generator-queue.ts
import { Queue, Worker } from 'bullmq';
import Redis from 'ioredis';

const connection = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379'),
  maxRetriesPerRequest: null,
});

export const generatorQueue = new Queue('site-generation', { connection });

// Add job
export async function queueGeneration(formData: FormData, options: GenerationOptions) {
  const job = await generatorQueue.add('generate', {
    formData,
    options,
  }, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
  });

  return job.id;
}

// Worker
const worker = new Worker('site-generation', async (job) => {
  const { formData, options } = job.data;

  // Update progress
  await job.updateProgress(10);

  // Generate site
  const site = await generateSite(formData, options);
  await job.updateProgress(50);

  // Save files
  await saveSiteFiles(site);
  await job.updateProgress(80);

  // Create ZIP
  await createZip(site.clientId);
  await job.updateProgress(100);

  return { clientId: site.clientId };
}, { connection });
```

### Phase 2: Caching

```typescript
// lib/cache/redis-cache.ts
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function getCachedContent(
  formData: FormData
): Promise<AIGeneratedContent | null> {
  const key = `content:${hashFormData(formData)}`;
  const cached = await redis.get(key);

  if (cached) {
    return JSON.parse(cached);
  }

  return null;
}

export async function setCachedContent(
  formData: FormData,
  content: AIGeneratedContent
) {
  const key = `content:${hashFormData(formData)}`;
  await redis.setex(key, 3600, JSON.stringify(content)); // 1 hour
}

function hashFormData(data: FormData): string {
  const crypto = require('crypto');
  return crypto
    .createHash('sha256')
    .update(JSON.stringify(data))
    .digest('hex');
}
```

### Phase 3: Database

```typescript
// lib/db/schema.sql
CREATE TABLE sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  activity VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  form_data JSONB NOT NULL,
  storage_path VARCHAR(500) NOT NULL,
  zip_url VARCHAR(500),
  preview_url VARCHAR(500),
  vercel_url VARCHAR(500),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

CREATE INDEX idx_sites_client_id ON sites(client_id);
CREATE INDEX idx_sites_created_at ON sites(created_at);
CREATE INDEX idx_sites_status ON sites(status);

// lib/db/queries.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function saveSiteMetadata(site: GeneratedSite) {
  const query = `
    INSERT INTO sites (client_id, name, activity, city, form_data, storage_path)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id
  `;

  const values = [
    site.clientId,
    site.formData.name,
    site.formData.activity,
    site.formData.city,
    site.formData,
    site.storagePath,
  ];

  const result = await pool.query(query, values);
  return result.rows[0].id;
}
```

### Phase 4: Object Storage

```typescript
// lib/storage/s3.ts
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToS3(
  key: string,
  body: Buffer,
  contentType: string
) {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
  });

  await s3.send(command);

  return `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${key}`;
}

export async function uploadSiteToS3(clientId: string, sitePath: string) {
  // Read all files
  const files = await getAllFiles(sitePath);

  // Upload each file
  for (const file of files) {
    const relativePath = path.relative(sitePath, file);
    const key = `sites/${clientId}/${relativePath}`;
    const body = await fs.readFile(file);
    const contentType = getContentType(file);

    await uploadToS3(key, body, contentType);
  }
}
```

## Performance Optimization

### 1. Claude API Optimization

```typescript
// Batch similar requests
const batchQueue: FormData[] = [];

setInterval(async () => {
  if (batchQueue.length > 0) {
    const batch = batchQueue.splice(0, 10);
    await Promise.all(batch.map(generateSiteContent));
  }
}, 1000);

// Request coalescing
const pendingRequests = new Map<string, Promise<AIGeneratedContent>>();

export async function generateSiteContent(formData: FormData) {
  const key = hashFormData(formData);

  if (pendingRequests.has(key)) {
    return pendingRequests.get(key)!;
  }

  const promise = actuallyGenerate(formData);
  pendingRequests.set(key, promise);

  try {
    return await promise;
  } finally {
    pendingRequests.delete(key);
  }
}
```

### 2. ZIP Creation Optimization

```typescript
// Stream ZIP creation
import archiver from 'archiver';

export async function createZipStream(clientId: string) {
  const archive = archiver('zip', { zlib: { level: 6 } }); // Reduce from 9

  // Stream directly to S3
  const pass = new PassThrough();
  archive.pipe(pass);

  // Upload stream to S3
  const upload = uploadStreamToS3(pass, `zips/${clientId}.zip`);

  // Add files
  archive.directory(sitePath, false);
  archive.finalize();

  return upload;
}
```

### 3. Parallel Processing

```typescript
// Generate pages in parallel
const pages = await Promise.all([
  homeTemplate.generateContent(formData, aiContent),
  aboutTemplate.generateContent(formData, aiContent),
  servicesTemplate.generateContent(formData, aiContent),
  pricingTemplate.generateContent(formData, aiContent),
  contactTemplate.generateContent(formData, aiContent),
  legalTemplate.generateContent(formData, aiContent),
]);
```

## Resource Planning

### 10K generations/day

- **API Servers**: 3-5 instances (2 CPU, 4GB RAM)
- **Workers**: 5-10 instances (2 CPU, 4GB RAM)
- **Redis**: 1 instance (2GB RAM)
- **PostgreSQL**: 1 instance (2 CPU, 4GB RAM)
- **Storage**: 500GB S3
- **Cost**: ~$300-500/month

### 100K generations/day

- **API Servers**: 10-20 instances
- **Workers**: 50-100 instances
- **Redis**: Cluster (3 nodes, 8GB each)
- **PostgreSQL**: HA setup (primary + replica)
- **Storage**: 5TB S3
- **CDN**: CloudFront/Cloudflare
- **Cost**: ~$3,000-5,000/month

## Monitoring Metrics

```typescript
// lib/metrics.ts
export const metrics = {
  generationsPerSecond: new Counter('generations_per_second'),
  generationDuration: new Histogram('generation_duration_ms'),
  queueSize: new Gauge('queue_size'),
  activeWorkers: new Gauge('active_workers'),
  claudeApiLatency: new Histogram('claude_api_latency_ms'),
  errorRate: new Counter('error_rate'),
  storageUsed: new Gauge('storage_used_bytes'),
};
```

## Auto-Scaling Rules

```yaml
# kubernetes/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: site-generator-workers
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: site-generator-workers
  minReplicas: 5
  maxReplicas: 100
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Pods
    pods:
      metric:
        name: queue_size
      target:
        type: AverageValue
        averageValue: "100"
```

## Cost Optimization

1. **Cache aggressively**: Reduce Claude API costs
2. **Lifecycle policies**: Delete old files automatically
3. **Compress before storage**: Reduce S3 costs
4. **Use spot instances**: 70% cheaper for workers
5. **Multi-region replication**: Only for critical data

## Testing at Scale

```bash
# Load testing with k6
k6 run --vus 100 --duration 30s loadtest.js
```

```javascript
// loadtest.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const payload = JSON.stringify({
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
  });

  const res = http.post('http://localhost:3000/api/generate-site', payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 5s': (r) => r.timings.duration < 5000,
  });

  sleep(1);
}
```
