# Architecture Technique - Mini Site Generator

## Vue d'ensemble

Le Mini Site Generator est une application Next.js 14 qui génère automatiquement des sites web professionnels pour artisans en utilisant l'IA Claude d'Anthropic.

## Architecture système

```
┌─────────────────────────────────────────────────────────────┐
│                    Client (Browser)                          │
│                                                              │
│  ┌──────────────┐      ┌─────────────┐    ┌──────────────┐ │
│  │ FormGenerator│ ───▶ │  API Routes │◀──▶│Preview Pages │ │
│  └──────────────┘      └─────────────┘    └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Server (Next.js)                          │
│                                                              │
│  ┌─────────────┐      ┌──────────────┐    ┌──────────────┐ │
│  │  Generator  │◀────▶│  Claude API  │    │  ZIP Utils   │ │
│  └─────────────┘      └──────────────┘    └──────────────┘ │
│         │                                         │          │
│         │              ┌──────────────┐          │          │
│         └─────────────▶│  Templates   │          │          │
│                        └──────────────┘          │          │
│         │              ┌──────────────┐          │          │
│         └─────────────▶│  SEO Utils   │          │          │
│                        └──────────────┘          │          │
│         │                                        │          │
│         ▼                                        ▼          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              File System Storage                      │  │
│  │  app/generated/[clientId]/   public/downloads/       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              Services Externes (Optionnel)                   │
│                                                              │
│  ┌──────────────┐      ┌──────────────┐                    │
│  │   Vercel     │      │   Cleanup    │                    │
│  │  Deployment  │      │  Cron Jobs   │                    │
│  └──────────────┘      └──────────────┘                    │
└─────────────────────────────────────────────────────────────┘
```

## Structure des modules

### 1. Frontend (Client-Side)

#### `components/FormGenerator.tsx`
- **Responsabilité**: Interface utilisateur pour la saisie des données
- **État**: Gère formData, loading, result, error
- **Interactions**: POST vers `/api/generate-site`
- **Affichage**: Loading overlay, success card, error messages

#### `app/page.tsx`
- **Responsabilité**: Page d'accueil avec hero section
- **Composants**: FormGenerator
- **Style**: Tailwind CSS avec gradients

#### `app/preview/[clientId]/page.tsx`
- **Responsabilité**: Prévisualisation des sites générés
- **Type**: Server Component (SSR)
- **Fonctions**: getSiteData (lecture fichiers)
- **Affichage**: iframe avec sandbox

### 2. Backend (Server-Side)

#### `app/api/generate-site/route.ts`
- **Responsabilité**: Point d'entrée principal pour la génération
- **Méthodes**: POST, GET
- **Flux**:
  1. Validation des données
  2. Génération via `generateSite()`
  3. Sauvegarde via `saveSiteFiles()`
  4. Création ZIP via `createZipFromDirectory()`
  5. Déploiement Vercel (optionnel)
  6. Nettoyage automatique (async)
- **Runtime**: Node.js
- **Timeout**: 60 secondes

### 3. Core Logic

#### `lib/generator.ts`
- **Fonctions principales**:
  - `generateClientId()`: Génère ID unique (site-{timestamp}-{random})
  - `generateSite()`: Orchestre la génération complète
  - `saveSiteFiles()`: Sauvegarde avec vérification et placeholders
  - `getSiteById()`: Récupère un site généré
  - `listAllSites()`: Liste tous les sites
  - `deleteSite()`: Supprime un site
  - `generatePlaceholderPage()`: Crée placeholder pour pages manquantes

#### `lib/claude-api.ts`
- **Responsabilité**: Communication avec l'API Claude
- **Fonctions**:
  - `generateSiteContent()`: Génère contenu IA
  - `generateImagePrompts()`: Génère prompts images
  - `generateFallbackContent()`: Contenu de secours
- **Configuration**: ANTHROPIC_API_KEY
- **Modèle**: claude-3-5-sonnet-20241022
- **Prompt**: JSON structuré (home, about, services, pricing, testimonials, seo)

#### `lib/seo.ts`
- **Fonctions**:
  - `generateSEOMetadata()`: Métadonnées SEO par page
  - `generateLocalBusinessSchema()`: Schema.org LocalBusiness
  - `generateServiceSchema()`: Schema.org Service
  - `generateSitemap()`: sitemap.xml
  - `generateRobotsTxt()`: robots.txt
  - `generateMetaTags()`: Balises meta HTML
  - `generateStructuredDataScript()`: Script JSON-LD

### 4. Templates

#### `lib/templates/base.ts`
- **Responsabilité**: Structure HTML commune
- **Fonctions**: generateBaseHTML, generateHeader, generateFooter
- **Configuration**: Tailwind CDN, couleurs dynamiques

#### Pages Templates
- `lib/templates/home.ts`: Page d'accueil
- `lib/templates/about.ts`: À propos
- `lib/templates/services.ts`: Services
- `lib/templates/pricing.ts`: Tarifs
- `lib/templates/contact.ts`: Contact
- `lib/templates/legal.ts`: Mentions légales

Chaque template implémente:
```typescript
interface PageTemplate {
  generateContent(data: FormData, aiContent: AIGeneratedContent): string;
  getSEO(data: FormData, aiContent?: AIGeneratedContent): SEOMetadata;
  getStructuredData(data: FormData): StructuredData;
}
```

### 5. Utilities

#### `lib/utils/zip.ts`
- **Fonctions**:
  - `createZipFromDirectory()`: Crée ZIP depuis dossier
  - `createZipFromFiles()`: Crée ZIP depuis liste fichiers
  - `getZipSize()`: Taille en MB
  - `cleanOldZips()`: Nettoyage ancien ZIPs
- **Bibliothèque**: archiver
- **Compression**: niveau 9 (maximum)
- **Destination**: public/downloads/

#### `lib/utils/cleanup.ts`
- **Fonctions**:
  - `cleanOldGeneratedSites()`: Supprime sites > X heures
  - `cleanOldZipFiles()`: Supprime ZIPs > X heures
  - `cleanupOldFiles()`: Nettoyage combiné
  - `cleanupSpecificSite()`: Supprime site spécifique
  - `getStorageStats()`: Statistiques de stockage
- **Critère**: Modification time (mtimeMs)
- **Par défaut**: 24 heures

#### `lib/utils/vercel.ts`
- **Fonctions**:
  - `deployToVercel()`: Déploie sur Vercel
  - `generateVercelProjectName()`: Génère nom projet
- **Optionnel**: Activé via options.autoDeployVercel

## Flux de données

### Génération complète d'un site

```
1. User Input (FormGenerator)
   │
   ├─▶ name: string
   ├─▶ activity: ActivityType
   ├─▶ city: string
   ├─▶ services: string[]
   ├─▶ colors: ColorScheme
   ├─▶ contact: ContactInfo
   │
2. POST /api/generate-site
   │
   ├─▶ Validation
   │
   ├─▶ generateSite(formData, options)
   │   │
   │   ├─▶ generateClientId()
   │   │   └─▶ site-{timestamp}-{random}
   │   │
   │   ├─▶ generateSiteContent(formData)
   │   │   │
   │   │   ├─▶ Claude API Request
   │   │   │   ├─▶ Prompt structuré JSON
   │   │   │   └─▶ Response: AIGeneratedContent
   │   │   │
   │   │   └─▶ Fallback si erreur
   │   │
   │   ├─▶ Template Generation
   │   │   ├─▶ homeTemplate.generateContent()
   │   │   ├─▶ aboutTemplate.generateContent()
   │   │   ├─▶ servicesTemplate.generateContent()
   │   │   ├─▶ pricingTemplate.generateContent()
   │   │   ├─▶ contactTemplate.generateContent()
   │   │   └─▶ legalTemplate.generateContent()
   │   │
   │   └─▶ SEO Generation
   │       ├─▶ generateSitemap()
   │       └─▶ generateRobotsTxt()
   │
   ├─▶ saveSiteFiles(site)
   │   │
   │   ├─▶ Vérification pages requises
   │   ├─▶ Création placeholders si manquant
   │   ├─▶ index.html depuis home.html
   │   ├─▶ metadata.json enrichi
   │   │   ├─▶ clientId
   │   │   ├─▶ name, activity, city
   │   │   ├─▶ formData
   │   │   ├─▶ createdAt
   │   │   ├─▶ generatedPages
   │   │   ├─▶ missingPages
   │   │   └─▶ status (complete/incomplete)
   │   │
   │   └─▶ app/generated/{clientId}/
   │
   ├─▶ createZipFromDirectory()
   │   │
   │   ├─▶ Auto-create public/downloads/
   │   ├─▶ Compression niveau 9
   │   └─▶ {clientId}.zip
   │
   ├─▶ deployToVercel() [optionnel]
   │   └─▶ vercelUrl
   │
   ├─▶ cleanupOldFiles(24) [async]
   │   ├─▶ Supprime sites > 24h
   │   └─▶ Supprime ZIPs > 24h
   │
   └─▶ Response JSON
       ├─▶ success: true
       ├─▶ clientId
       ├─▶ zipUrl: /downloads/{clientId}.zip
       ├─▶ previewUrl: /preview/{clientId}
       ├─▶ vercelUrl [optionnel]
       └─▶ pages

3. User Actions
   │
   ├─▶ Download ZIP
   ├─▶ Preview Site
   └─▶ Deploy Vercel
```

## Stockage des fichiers

### Structure générée

```
app/generated/{clientId}/
├── index.html          # Copie de home.html
├── home.html           # Page d'accueil
├── about.html          # À propos
├── services.html       # Services
├── pricing.html        # Tarifs
├── contact.html        # Contact
├── legal.html          # Mentions légales
├── sitemap.xml         # Plan du site
├── robots.txt          # Robots d'indexation
└── metadata.json       # Métadonnées enrichies

public/downloads/
└── {clientId}.zip      # Archive téléchargeable
```

### Metadata.json

```json
{
  "clientId": "site-1731715200000-abc123",
  "name": "Dupont Plomberie",
  "activity": "plombier",
  "city": "Paris",
  "formData": { ... },
  "createdAt": "2025-11-15T10:00:00.000Z",
  "generatedPages": [
    "home.html",
    "about.html",
    "services.html",
    "pricing.html",
    "contact.html",
    "legal.html"
  ],
  "missingPages": 0,
  "status": "complete"
}
```

## Types TypeScript

### Types principaux

```typescript
// types/generator.ts
export interface FormData {
  name: string;
  activity: ActivityType | string;
  city: string;
  services: string[];
  colors: ColorScheme;
  style: SiteStyle;
  languages: Language[];
  contact: ContactInfo;
  photos?: File[] | string[];
  logo?: File | string;
}

export interface AIGeneratedContent {
  home: {
    h1: string;
    tagline: string;
    introduction: string;
    cta: string;
  };
  about: {
    h1: string;
    introduction: string;
    expertise: string[];
    values: string[];
    certifications: string[];
  };
  servicesContent: Array<{
    name: string;
    description: string;
    benefits: string[];
  }>;
  pricing: {
    h1: string;
    introduction: string;
    priceRanges: string[];
  };
  testimonials: Array<{
    name: string;
    text: string;
    rating: number;
  }>;
  seo: {
    metaDescription: string;
    keywords: string[];
    ogDescription: string;
  };
}

export interface GeneratedSite {
  clientId: string;
  formData: FormData;
  content: AIGeneratedContent;
  pages: {
    home: string;
    about: string;
    services: string;
    pricing: string;
    contact: string;
    legal: string;
  };
  files: Array<{ path: string; content: string }>;
  createdAt: Date;
}
```

## Configuration

### Variables d'environnement

```bash
# API Claude (REQUIS)
ANTHROPIC_API_KEY=sk-ant-...

# App URL (optionnel)
NEXT_PUBLIC_APP_URL=https://example.com

# Vercel (optionnel)
VERCEL_TOKEN=...
VERCEL_ORG_ID=...
```

### Next.js Config

```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  webpack: (config) => {
    config.externals = [...config.externals, 'archiver'];
    return config;
  },
};
```

## Patterns et conventions

### Logging

Tous les logs utilisent des préfixes standardisés:
- `[API]`: Routes API
- `[Generator]`: Logique de génération
- `[ZIP]`: Opérations ZIP
- `[CLEANUP]`: Nettoyage
- `[Script]`: Scripts CLI
- Symboles: `✓` (succès), `⚠` (warning), `✗` (erreur)

### Gestion d'erreurs

```typescript
try {
  // Opération
} catch (error) {
  console.error('[Module] Erreur:', error);
  throw new Error('Message utilisateur');
}
```

### Paths

Tous les paths utilisent `process.cwd()` pour la portabilité:

```typescript
const sitePath = path.join(process.cwd(), 'app', 'generated', clientId);
```

## Performance

### Optimisations actuelles

1. **Génération asynchrone**: Claude API + sauvegarde fichiers
2. **Nettoyage non-bloquant**: `.catch()` pour ne pas ralentir la réponse
3. **Compression ZIP niveau 9**: Taille minimale
4. **Server Components**: Preview page en SSR
5. **Streaming**: Pas encore implémenté

### Points d'amélioration

1. **Queue système**: Bull/BullMQ pour traiter les générations en arrière-plan
2. **Cache**: Redis pour mettre en cache les réponses Claude similaires
3. **CDN**: CloudFront pour servir les ZIPs
4. **Streaming**: Réponses progressives pour UX
5. **Database**: PostgreSQL pour métadonnées au lieu de fichiers JSON
6. **Object Storage**: S3 pour sites générés au lieu de filesystem

## Sécurité

### Mesures actuelles

1. **Validation input**: Zod schemas pour FormData
2. **Sandbox iframe**: `allow-same-origin allow-scripts`
3. **Timeout API**: 60 secondes max
4. **Process.cwd()**: Pas de path traversal
5. **HTTPS**: Recommandé en production

### À améliorer

1. **Rate limiting**: Limiter les générations par IP
2. **CAPTCHA**: Prévenir les bots
3. **Secret scanning**: Détecter les secrets dans le code
4. **Dependency audit**: Automatiser `npm audit`
5. **CSP headers**: Content Security Policy
6. **Input sanitization**: Nettoyer les inputs HTML

## Scalabilité

### Limites actuelles

- Filesystem storage: ~10,000 sites max
- Pas de queue: génération synchrone
- Pas de réplication: single instance
- Nettoyage manuel: cron job externe requis

### Architecture scalable (future)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Load       │────▶│  Next.js    │────▶│   Queue     │
│  Balancer   │     │  Instances  │     │  (Bull)     │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                                              ▼
                    ┌─────────────┐     ┌─────────────┐
                    │  Redis      │◀────│  Workers    │
                    │  Cache      │     │  Pool       │
                    └─────────────┘     └─────────────┘
                                              │
                    ┌─────────────┐           │
                    │ PostgreSQL  │◀──────────┘
                    │ Metadata    │
                    └─────────────┘
                                              │
                    ┌─────────────┐           │
                    │  S3/R2      │◀──────────┘
                    │  Storage    │
                    └─────────────┘
```

## Monitoring et observabilité

### À implémenter

1. **Logs structurés**: Winston/Pino avec JSON
2. **Metrics**: Prometheus + Grafana
3. **Tracing**: OpenTelemetry
4. **Alerting**: PagerDuty/Opsgenie
5. **Uptime**: Pingdom/UptimeRobot
6. **Error tracking**: Sentry

## Maintenance

### Routines automatiques

1. **Nettoyage quotidien**: Supprimer fichiers > 24h
2. **Backup**: Exporter métadonnées importantes
3. **Audit dépendances**: npm audit hebdomadaire
4. **Rotation logs**: Garder 30 jours max
5. **Health checks**: Endpoint `/api/health`

### Métriques à surveiller

- Nombre de sites générés / jour
- Taux d'erreur génération
- Temps moyen de génération
- Taille moyenne des sites
- Espace disque utilisé
- Coût API Claude
