# Development Guide - Mini Site Generator

## Table des matières

1. [Prérequis](#prérequis)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Développement local](#développement-local)
5. [Structure du projet](#structure-du-projet)
6. [Workflow de développement](#workflow-de-développement)
7. [Tests](#tests)
8. [Debugging](#debugging)
9. [Bonnes pratiques](#bonnes-pratiques)
10. [FAQ](#faq)

## Prérequis

### Logiciels requis

- **Node.js**: v18.17 ou supérieur
- **npm**: v9.0 ou supérieur
- **Git**: v2.30 ou supérieur
- **TypeScript**: v5.0 ou supérieur (installé avec le projet)

### Comptes nécessaires

- **Anthropic**: Pour l'API Claude
  - Créer un compte sur https://console.anthropic.com
  - Générer une clé API
  - Ajouter des crédits

- **Vercel** (optionnel): Pour le déploiement automatique
  - Compte sur https://vercel.com
  - Token d'API

### Connaissances recommandées

- TypeScript et JavaScript moderne (ES6+)
- React 18 et Next.js 14
- Tailwind CSS
- Node.js et API REST
- Git et GitHub

## Installation

### 1. Cloner le repository

```bash
git clone https://github.com/TechNatool/mini-site-generator.git
cd mini-site-generator
```

### 2. Installer les dépendances

```bash
npm install
```

Cela installe:
- Next.js 14
- React 18
- TypeScript 5
- Anthropic SDK
- Archiver (ZIP)
- Tailwind CSS
- Et toutes les devDependencies

### 3. Configurer les variables d'environnement

```bash
cp .env.example .env.local
```

Éditer `.env.local`:

```bash
# REQUIS - API Claude
ANTHROPIC_API_KEY=sk-ant-api03-...

# OPTIONNEL - URL de l'app
NEXT_PUBLIC_APP_URL=http://localhost:3000

# OPTIONNEL - Vercel
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
```

### 4. Vérifier l'installation

```bash
npm run type-check
npm run lint
```

### 5. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrir http://localhost:3000

## Configuration

### TypeScript

Le projet utilise TypeScript strict mode:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### Tailwind CSS

Configuration dans `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: { ... },
      secondary: { ... }
    },
    fontFamily: {
      sans: ['Inter', ...],
      heading: ['Poppins', ...]
    }
  }
}
```

### Next.js

Configuration dans `next.config.mjs`:

```javascript
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};
```

### ESLint

Configuration dans `.eslintrc.json`:

```json
{
  "extends": "next/core-web-vitals",
  "rules": {
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "prefer-const": "error"
  }
}
```

## Développement local

### Scripts disponibles

```bash
# Développement
npm run dev              # Lance le serveur dev (port 3000)
npm run build            # Build de production
npm run start            # Démarre le build de production
npm run lint             # Linter ESLint
npm run type-check       # Vérification TypeScript
npm run format           # Formattage avec Prettier

# Tests
npm run test             # Lance tous les tests
npm run test:unit        # Tests unitaires seulement
npm run test:integration # Tests d'intégration
npm run test:e2e         # Tests E2E
npm run test:coverage    # Coverage report

# Scripts utilitaires
npm run create-zip       # Créer un ZIP manuellement
npm run deploy-vercel    # Déployer sur Vercel
npm run cleanup          # Nettoyage manuel

# Documentation
npm run docs:generate    # Générer la documentation API
```

### Hot reload

Le serveur dev utilise Fast Refresh:
- Modifications TypeScript/React: Reload automatique
- Modifications Tailwind: Rebuild CSS automatique
- Modifications .env: Redémarrage manuel requis

### Ports utilisés

- **3000**: Next.js dev server
- **3001**: Alternative (si 3000 occupé)

## Structure du projet

```
mini-site-generator/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Layout racine
│   ├── page.tsx                  # Page d'accueil
│   ├── api/                      # API Routes
│   │   └── generate-site/
│   │       └── route.ts          # POST /api/generate-site
│   ├── preview/                  # Pages de prévisualisation
│   │   └── [clientId]/
│   │       └── page.tsx          # Server Component
│   └── generated/                # Sites générés (gitignored)
│       └── site-xxx/             # Dossier par site
│
├── components/                   # Composants React
│   └── FormGenerator.tsx         # Formulaire principal
│
├── lib/                          # Logique métier
│   ├── generator.ts              # Orchestrateur principal
│   ├── claude-api.ts             # Client API Claude
│   ├── seo.ts                    # Utilitaires SEO
│   ├── templates/                # Templates de pages
│   │   ├── base.ts               # Template HTML de base
│   │   ├── home.ts               # Page d'accueil
│   │   ├── about.ts              # À propos
│   │   ├── services.ts           # Services
│   │   ├── pricing.ts            # Tarifs
│   │   ├── contact.ts            # Contact
│   │   ├── legal.ts              # Mentions légales
│   │   └── index.ts              # Exports
│   └── utils/                    # Utilitaires
│       ├── zip.ts                # Création ZIP
│       ├── cleanup.ts            # Nettoyage automatique
│       └── vercel.ts             # Déploiement Vercel
│
├── types/                        # Définitions TypeScript
│   ├── generator.ts              # Types génération
│   ├── templates.ts              # Types templates
│   └── api.ts                    # Types API
│
├── public/                       # Fichiers statiques
│   └── downloads/                # ZIPs téléchargeables (gitignored)
│
├── docs/                         # Documentation
├── tests/                        # Tests
├── scripts/                      # Scripts CLI
└── infra/                        # Infrastructure
```

### Fichiers importants

- `package.json`: Dépendances et scripts
- `tsconfig.json`: Configuration TypeScript
- `tailwind.config.ts`: Configuration Tailwind
- `next.config.mjs`: Configuration Next.js
- `.env.local`: Variables d'environnement (gitignored)
- `.eslintrc.json`: Configuration ESLint
- `.prettierrc`: Configuration Prettier
- `.gitignore`: Fichiers ignorés par Git

## Workflow de développement

### 1. Créer une nouvelle branche

```bash
git checkout -b feature/ma-nouvelle-fonctionnalite
```

Convention de nommage:
- `feature/`: Nouvelle fonctionnalité
- `fix/`: Correction de bug
- `refactor/`: Refactorisation
- `docs/`: Documentation
- `test/`: Tests

### 2. Développer la fonctionnalité

#### Ajouter un nouveau template

1. Créer `lib/templates/ma-page.ts`:

```typescript
import { PageTemplate } from '@/types/templates';
import { FormData, AIGeneratedContent } from '@/types/generator';
import { generateBaseHTML } from './base';

export const maPageTemplate: PageTemplate = {
  generateContent(data: FormData, aiContent: AIGeneratedContent): string {
    const content = `
      <div class="container mx-auto px-4 py-16">
        <h1>${data.name}</h1>
        <!-- Votre contenu -->
      </div>
    `;

    const seo = this.getSEO(data, aiContent);
    const structuredData = this.getStructuredData(data);

    return generateBaseHTML({
      title: seo.title,
      seo,
      structuredData,
      content,
      formData: data,
      currentPage: 'ma-page',
    });
  },

  getSEO(data: FormData, aiContent?: AIGeneratedContent) {
    return {
      title: `Ma Page - ${data.name}`,
      description: `Description de ma page`,
      keywords: ['keyword1', 'keyword2'],
    };
  },

  getStructuredData(data: FormData) {
    return {};
  },
};
```

2. Exporter dans `lib/templates/index.ts`:

```typescript
export { maPageTemplate } from './ma-page';
```

3. Ajouter dans `lib/generator.ts`:

```typescript
import { maPageTemplate } from './templates';

const pages = {
  // ...
  maPage: maPageTemplate.generateContent(formData, aiContent),
};
```

#### Ajouter une nouvelle API route

1. Créer `app/api/mon-endpoint/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    // Logique
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[API] Erreur:', error);
    return NextResponse.json(
      { success: false, error: 'Message' },
      { status: 500 }
    );
  }
}
```

#### Ajouter un nouveau composant

1. Créer `components/MonComposant.tsx`:

```typescript
'use client';

import { useState } from 'react';

interface MonComposantProps {
  data: string;
}

export default function MonComposant({ data }: MonComposantProps) {
  const [state, setState] = useState('');

  return (
    <div className="p-4">
      {data}
    </div>
  );
}
```

### 3. Écrire des tests

```bash
# Créer le fichier de test
touch tests/unit/mon-module.test.ts
```

```typescript
import { describe, it, expect } from 'vitest';
import { maFonction } from '@/lib/mon-module';

describe('Mon Module', () => {
  it('devrait faire quelque chose', () => {
    const result = maFonction('input');
    expect(result).toBe('expected');
  });
});
```

### 4. Vérifier avant commit

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Tests
npm run test

# Format
npm run format
```

### 5. Commiter

Utiliser Conventional Commits:

```bash
git add .
git commit -m "feat: ajoute nouvelle fonctionnalité X"
```

Types de commit:
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage
- `refactor:` Refactorisation
- `test:` Tests
- `chore:` Maintenance

### 6. Push et Pull Request

```bash
git push -u origin feature/ma-nouvelle-fonctionnalite
```

Créer une PR sur GitHub avec:
- Titre clair
- Description détaillée
- Captures d'écran si UI
- Tests passent
- Review requise

## Tests

### Tests unitaires

Tester les fonctions isolées:

```typescript
// tests/unit/generator.test.ts
import { describe, it, expect } from 'vitest';
import { generateClientId } from '@/lib/generator';

describe('generateClientId', () => {
  it('génère un ID unique', () => {
    const id = generateClientId();
    expect(id).toMatch(/^site-\d+-[a-z0-9]+$/);
  });

  it('génère des IDs différents', () => {
    const id1 = generateClientId();
    const id2 = generateClientId();
    expect(id1).not.toBe(id2);
  });
});
```

### Tests d'intégration

Tester les API routes:

```typescript
// tests/integration/api.test.ts
import { describe, it, expect } from 'vitest';
import { POST } from '@/app/api/generate-site/route';

describe('POST /api/generate-site', () => {
  it('génère un site complet', async () => {
    const request = new Request('http://localhost:3000/api/generate-site', {
      method: 'POST',
      body: JSON.stringify({
        formData: { /* ... */ },
        options: {}
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.clientId).toBeDefined();
  });
});
```

### Tests E2E

Tester le flux complet:

```typescript
// tests/e2e/generation.test.ts
import { test, expect } from '@playwright/test';

test('génère un site complet', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.fill('[name="name"]', 'Test Plombier');
  await page.fill('[name="city"]', 'Paris');
  await page.selectOption('[name="activity"]', 'plombier');

  await page.click('button[type="submit"]');

  await expect(page.locator('text=Site généré avec succès')).toBeVisible();
});
```

## Debugging

### Console logs

Utiliser les préfixes standardisés:

```typescript
console.log('[Generator] Message normal');
console.warn('[Generator] ⚠ Warning');
console.error('[Generator] ✗ Erreur:', error);
```

### VS Code debugger

Créer `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "serverReadyAction": {
        "pattern": "started server on .+, url: (https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    }
  ]
}
```

### Debugging Claude API

Activer le mode verbose:

```typescript
const response = await anthropic.messages.create({
  // ...
  stream: false,
  metadata: {
    user_id: 'debug',
  },
});

console.log('[Claude API] Request:', {
  model,
  messages,
  maxTokens,
});

console.log('[Claude API] Response:', response);
```

### Network debugging

Dans Next.js dev mode:
- Ouvrir DevTools
- Onglet Network
- Filtrer XHR/Fetch
- Inspecter les requêtes vers `/api/generate-site`

## Bonnes pratiques

### TypeScript

```typescript
// ✅ Bon: types explicites
function generateSite(formData: FormData): Promise<GeneratedSite> {
  // ...
}

// ❌ Mauvais: any
function generateSite(formData: any): any {
  // ...
}
```

### React Components

```typescript
// ✅ Bon: Props typées
interface Props {
  data: string;
  onClick: () => void;
}

export default function Component({ data, onClick }: Props) {
  // ...
}

// ❌ Mauvais: Props non typées
export default function Component(props) {
  // ...
}
```

### Async/Await

```typescript
// ✅ Bon: gestion d'erreur
try {
  const result = await asyncFunction();
  return result;
} catch (error) {
  console.error('[Module] Erreur:', error);
  throw new Error('Message utilisateur');
}

// ❌ Mauvais: pas de gestion d'erreur
const result = await asyncFunction();
return result;
```

### Imports

```typescript
// ✅ Bon: imports groupés
import { NextRequest, NextResponse } from 'next/server';
import { generateSite } from '@/lib/generator';
import type { FormData } from '@/types/generator';

// ❌ Mauvais: imports désorganisés
import { NextRequest } from 'next/server';
import type { FormData } from '@/types/generator';
import { NextResponse } from 'next/server';
import { generateSite } from '@/lib/generator';
```

### Composants

```typescript
// ✅ Bon: composant simple et réutilisable
function Button({ onClick, children }: ButtonProps) {
  return (
    <button onClick={onClick} className="px-4 py-2 bg-primary-600">
      {children}
    </button>
  );
}

// ❌ Mauvais: composant trop complexe
function MegaComponent() {
  // 500 lignes de code
}
```

## FAQ

### Comment ajouter une nouvelle activité?

Modifier `types/generator.ts`:

```typescript
export type ActivityType =
  | 'plombier'
  | 'électricien'
  | 'ma-nouvelle-activite'  // Ajouter ici
  | 'autre';
```

### Comment modifier le style des pages générées?

Modifier `lib/templates/base.ts` pour le CSS global, ou modifier chaque template individuellement.

### Comment augmenter le timeout?

Modifier `app/api/generate-site/route.ts`:

```typescript
export const maxDuration = 120; // 120 secondes
```

### Comment désactiver le nettoyage automatique?

Commenter dans `app/api/generate-site/route.ts`:

```typescript
// cleanupOldFiles(24).catch(...);
```

### Comment générer plus de contenu avec Claude?

Modifier le prompt dans `lib/claude-api.ts` et augmenter `max_tokens`.

### Comment déployer en production?

Voir [DEPLOYMENT.md](./DEPLOYMENT.md).

### Où trouver les logs?

- Dev mode: Console du terminal
- Production Vercel: Vercel Dashboard > Logs
- Production autre: Selon votre plateforme

### Comment contribuer?

Voir [CONTRIBUTING.md](./CONTRIBUTING.md).
