# Générateur de Mini-Sites pour Artisans

Générateur automatisé de sites web professionnels pour artisans, propulsé par l'IA Claude d'Anthropic.

## Table des matières

- [À propos](#à-propos)
- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [API](#api)
- [Scripts](#scripts)
- [Structure du projet](#structure-du-projet)
- [Développement](#développement)
- [Déploiement](#déploiement)
- [Contribution](#contribution)

## À propos

Ce projet permet de générer automatiquement des sites web complets pour artisans (plombiers, électriciens, maçons, etc.) en quelques clics. L'utilisateur remplit un simple formulaire et l'IA génère :

- Un site de 6 pages (Accueil, À propos, Services, Tarifs, Contact, Mentions légales)
- Du contenu SEO optimisé et personnalisé
- Des métadonnées et données structurées (schema.org)
- Un fichier ZIP téléchargeable
- Option de déploiement automatique sur Vercel

## Fonctionnalités

### MVP (Version actuelle)

- ✅ Formulaire de génération simple et intuitif
- ✅ Génération de contenu via Claude API
- ✅ Templates de pages modernes et responsives
- ✅ SEO optimisé (meta tags, structured data, sitemap)
- ✅ Export ZIP du site complet
- ✅ Personnalisation des couleurs
- ✅ 10+ activités d'artisans supportées

### À venir (V1)

- ⏳ Génération d'images par IA
- ⏳ Déploiement Vercel automatique
- ⏳ Dashboard de gestion des sites
- ⏳ Édition du contenu généré
- ⏳ Preview en temps réel

## Technologies

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **IA** : Claude API (Anthropic)
- **Archivage** : Archiver
- **Déploiement** : Vercel

## Installation

### Prérequis

- Node.js 18+
- npm, yarn ou pnpm
- Clé API Anthropic (Claude)

### Étapes

1. Cloner le projet :

```bash
git clone <url-du-repo>
cd mini-site-generator
```

2. Installer les dépendances :

```bash
npm install
# ou
pnpm install
# ou
yarn install
```

3. Configurer les variables d'environnement :

```bash
cp .env.example .env
```

Éditer `.env` et ajouter votre clé API Anthropic :

```env
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

4. Lancer le serveur de développement :

```bash
npm run dev
```

5. Ouvrir [http://localhost:3000](http://localhost:3000)

## Configuration

### Variables d'environnement

Créer un fichier `.env` à la racine du projet :

```env
# Claude API (REQUIS)
ANTHROPIC_API_KEY=sk-ant-xxxxx
CLAUDE_MODEL=claude-3-5-sonnet-20241022

# Vercel (Optionnel)
VERCEL_TOKEN=your_token

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Limites (Optionnel)
MAX_SITES_PER_DAY=100
```

## Mode NO_AI (pour tests et développement)

Le mode NO_AI permet d'exécuter le générateur sans appeler l'API Anthropic. Utile pour :
- **Tests E2E** : Aucun crédit API consommé
- **Développement hors ligne** : Pas besoin de clé API
- **CI/CD** : Tests automatisés sans coûts

### Activation

Définir la variable d'environnement `NO_AI=true` :

```bash
# En ligne de commande
NO_AI=true npm run dev

# Dans .env
NO_AI=true
```

### Comportement

Quand `NO_AI=true` :
- ✅ **Aucun appel à Anthropic** : Pas de requêtes API
- ✅ **Contenu de fallback** : Contenu générique mais professionnel
- ✅ **Site complet** : Toutes les pages sont générées
- ✅ **Export ZIP** : Fonctionne normalement
- ✅ **Preview** : Fonctionne normalement
- ⚠️ **Contenu moins personnalisé** : Textes génériques

### Exemples d'utilisation

```bash
# Développement sans API
NO_AI=true npm run dev

# Tests E2E sans consommer de crédits
NO_AI=true npm run test:e2e

# Build de production en mode NO_AI
NO_AI=true npm run build
```

### Logs

En mode NO_AI, des logs clairs indiquent que le mode est activé :

```
[API] 🚫 Mode NO_AI activé → aucune requête Anthropic envoyée
[Generator] 🚫 Mode NO_AI activé → génération sans appel à Anthropic
[Claude API] 🚫 Mode NO_AI activé → contenu de fallback utilisé (aucune requête Anthropic)
```

### Contenu de fallback

Le contenu généré en mode NO_AI est :
- Basé sur les données du formulaire (nom, activité, ville)
- Professionnel et cohérent
- Adapté aux services sélectionnés
- SEO-friendly avec métadonnées appropriées
- Inclut des témoignages génériques

### Tests

Pour vérifier que le mode NO_AI fonctionne :

```bash
npm run test:unit -- tests/unit/lib/no-ai-mode.test.ts
```

Les tests vérifient que :
- Aucun appel API n'est effectué quand `NO_AI=true`
- Le contenu de fallback est correctement généré
- Toutes les pages sont créées avec du contenu valide
- Les données du formulaire sont utilisées dans le contenu

### Personnalisation

#### Ajouter une nouvelle activité

1. Modifier `types/generator.ts` :

```typescript
export type ActivityType =
  | 'plombier'
  | 'votre-nouvelle-activité'
  | ...
```

2. Ajouter les services suggérés dans `components/FormGenerator.tsx` :

```typescript
const COMMON_SERVICES: Record<ActivityType, string[]> = {
  'votre-nouvelle-activité': ['Service 1', 'Service 2', ...],
  ...
}
```

#### Modifier les templates

Les templates se trouvent dans `lib/templates/`. Chaque template exporte un objet `PageTemplate` avec :

- `generateContent()` : génère le HTML de la page
- `getSEO()` : génère les métadonnées SEO
- `getStructuredData()` : génère les données structurées

Exemple :

```typescript
// lib/templates/ma-page.ts
export const maPageTemplate: PageTemplate = {
  generateContent(data, aiContent) {
    // Votre HTML ici
  },
  getSEO(data, aiContent) {
    // Vos métadonnées
  },
  getStructuredData(data) {
    // Vos structured data
  }
};
```

## Utilisation

### Interface web

1. Accéder à [http://localhost:3000](http://localhost:3000)
2. Remplir le formulaire :
   - Informations de base (nom, activité, ville)
   - Services proposés
   - Coordonnées de contact
   - Personnalisation (couleurs, style)
3. Cliquer sur "Générer mon site web"
4. Télécharger le ZIP ou prévisualiser

### API

#### POST /api/generate-site

Génère un site complet.

**Requête** :

```json
{
  "formData": {
    "name": "Jean Dupont",
    "activity": "plombier",
    "city": "Paris",
    "services": ["Dépannage", "Installation"],
    "contact": {
      "phone": "06 12 34 56 78",
      "email": "contact@example.com"
    },
    "colors": {
      "primary": "#0ea5e9",
      "secondary": "#d946ef"
    },
    "style": "modern"
  },
  "options": {
    "generateImages": false,
    "autoDeployVercel": false
  }
}
```

**Réponse** :

```json
{
  "success": true,
  "clientId": "site-1234567890-abc123",
  "zipUrl": "/downloads/site-1234567890-abc123.zip",
  "previewUrl": "/generated/site-1234567890-abc123/index.html",
  "vercelUrl": "https://mon-site.vercel.app"
}
```

#### POST /api/generate-images

Génère des suggestions d'images (à venir).

## Scripts

### Développement

```bash
npm run dev              # Lancer le serveur de développement
npm run build            # Build de production
npm run start            # Lancer le serveur de production
npm run type-check       # Vérification TypeScript
npm run lint             # Linter ESLint
npm run format           # Formatage avec Prettier
```

### Tests

```bash
npm run test             # Lancer tous les tests (mode watch)
npm run test:unit        # Tests unitaires uniquement
npm run test:integration # Tests d'intégration uniquement
npm run test:e2e         # Tests End-to-End (Playwright)
npm run test:coverage    # Tests avec rapport de couverture
npm run test:watch       # Tests en mode watch
npm run test:ui          # Interface UI pour les tests
```

#### Tests Unitaires

Les tests unitaires testent les fonctions isolées:

```bash
npm run test:unit
```

Exemple de test:
```typescript
// tests/unit/lib/generator.test.ts
import { generateClientId } from '@/lib/generator';

it('should generate unique ID', () => {
  const id = generateClientId();
  expect(id).toMatch(/^site-\d+-[a-z0-9]+$/);
});
```

#### Tests d'Intégration

Les tests d'intégration testent les API routes:

```bash
npm run test:integration
```

#### Tests E2E

Les tests End-to-End testent le flux complet avec Playwright:

```bash
npm run test:e2e
```

Les tests E2E lancent automatiquement le serveur de développement.

Pour débugger les tests E2E:
```bash
npx playwright test --debug
npx playwright test --ui
```

#### Rapport de Couverture

Générer un rapport de couverture complet:

```bash
npm run test:coverage
```

Le rapport HTML est généré dans `coverage/index.html`.

**Seuils de couverture requis:**
- Statements: 90%
- Branches: 85%
- Functions: 90%
- Lines: 90%

Visualiser le rapport:
```bash
# Ouvrir le rapport HTML
open coverage/index.html  # macOS
xdg-open coverage/index.html  # Linux
start coverage/index.html  # Windows
```

### Documentation

#### Générer la Documentation API

La documentation est générée automatiquement depuis les commentaires JSDoc:

```bash
npm run docs:generate
```

La documentation générée se trouve dans `docs-autogen/`.

Visualiser la documentation:
```bash
cd docs-autogen
npx serve
```

#### Documentation Manuelle

La documentation complète se trouve dans `/docs`:

- **ARCHITECTURE.md** - Architecture technique détaillée
- **DEVELOPMENT_GUIDE.md** - Guide complet pour développeurs
- **CONTRIBUTING.md** - Guide de contribution
- **TESTING_STRATEGY.md** - Stratégie de tests
- **SECURITY.md** - Politique de sécurité
- **DEPLOYMENT.md** - Guide de déploiement
- **SCALABILITY.md** - Architecture scalable
- **MAINTENANCE.md** - Maintenance et opérations

### Utilitaires

```bash
npm run create-zip <clientId>       # Créer un ZIP manuellement
npm run deploy-vercel <clientId>    # Déployer sur Vercel manuellement
```

## Structure du projet

```
mini-site-generator/
├── app/                       # Next.js App Router
│   ├── api/
│   │   └── generate-site/     # API de génération
│   ├── preview/[clientId]/    # Page de prévisualisation
│   ├── generated/             # Sites générés (gitignored)
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── FormGenerator.tsx      # Formulaire principal
├── lib/                       # Logique métier
│   ├── claude-api.ts          # Intégration Claude
│   ├── generator.ts           # Orchestrateur principal
│   ├── seo.ts                 # Utilitaires SEO
│   ├── templates/             # Templates de pages
│   │   ├── base.ts
│   │   ├── home.ts
│   │   ├── about.ts
│   │   ├── services.ts
│   │   ├── pricing.ts
│   │   ├── contact.ts
│   │   └── legal.ts
│   └── utils/
│       ├── zip.ts             # Création ZIP
│       ├── cleanup.ts         # Nettoyage automatique
│       └── vercel.ts          # Déploiement Vercel
├── tests/                     # Tests professionnels
│   ├── unit/                  # Tests unitaires (60%)
│   │   ├── lib/
│   │   └── components/
│   ├── integration/           # Tests d'intégration (30%)
│   ├── e2e/                   # Tests E2E (10%)
│   ├── regression/            # Tests de non-régression
│   ├── security/              # Tests de sécurité
│   ├── fixtures/              # Données de test
│   └── setup.ts               # Configuration globale
├── docs/                      # Documentation complète
│   ├── ARCHITECTURE.md
│   ├── DEVELOPMENT_GUIDE.md
│   ├── CONTRIBUTING.md
│   ├── TESTING_STRATEGY.md
│   ├── SECURITY.md
│   ├── DEPLOYMENT.md
│   ├── SCALABILITY.md
│   └── MAINTENANCE.md
├── docs-autogen/              # Documentation générée (TypeDoc)
├── scripts/
│   ├── create-zip.ts
│   └── deploy-vercel.ts
├── types/                     # Types TypeScript
│   ├── generator.ts
│   ├── templates.ts
│   └── api.ts
├── .github/                   # CI/CD et templates
│   ├── workflows/
│   │   ├── ci.yml             # Tests automatiques
│   │   └── deploy.yml         # Déploiement
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── public/
│   └── downloads/             # ZIPs téléchargeables (gitignored)
├── coverage/                  # Rapports de couverture (gitignored)
├── vitest.config.ts           # Configuration Vitest
├── playwright.config.ts       # Configuration Playwright
├── typedoc.json              # Configuration TypeDoc
├── CONVENTIONS.md            # Conventions de code
├── AI_HANDOVER.md            # Guide pour Claude Code AI
├── context.md                # Architecture complète
└── README.md
```

## Qualité et CI/CD

### Standards de Qualité

Le projet suit des standards professionnels stricts:

- ✅ **TypeScript strict mode** : Type-safety complet
- ✅ **ESLint** : Linting automatique
- ✅ **Prettier** : Formatage cohérent
- ✅ **Tests** : Couverture >= 90%
- ✅ **Documentation** : Complète et à jour
- ✅ **Conventional Commits** : Messages normalisés

### CI/CD Automatique

Chaque Pull Request déclenche automatiquement:

1. **Type Checking** : Vérification TypeScript
2. **Linting** : ESLint sur tout le code
3. **Tests** : Tous les tests (unit + integration + E2E)
4. **Coverage** : Vérification >= 90%
5. **Build** : Compilation réussie
6. **Security** : npm audit + secret scanning

Les tests tournent sur Node.js 18 et 20 pour garantir la compatibilité.

### Badges de Qualité

[![Tests](https://github.com/TechNatool/mini-site-generator/actions/workflows/ci.yml/badge.svg)](https://github.com/TechNatool/mini-site-generator/actions/workflows/ci.yml)
[![Coverage](https://codecov.io/gh/TechNatool/mini-site-generator/branch/main/graph/badge.svg)](https://codecov.io/gh/TechNatool/mini-site-generator)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Développement

### Ajouter un nouveau template

1. Créer un fichier dans `lib/templates/`
2. Implémenter l'interface `PageTemplate`
3. Exporter dans `lib/templates/index.ts`
4. Utiliser dans `lib/generator.ts`

### Modifier le générateur de contenu IA

Le prompt de génération se trouve dans `lib/claude-api.ts` :

```typescript
function buildContentGenerationPrompt(formData: FormData): string {
  // Modifier le prompt ici
}
```

### Tester localement

```bash
# Développement
npm run dev

# Build de production
npm run build

# Lancer la version de production
npm run start
```

## Déploiement

### Vercel (recommandé)

1. Créer un compte sur [Vercel](https://vercel.com)
2. Importer le projet GitHub
3. Configurer les variables d'environnement :
   - `ANTHROPIC_API_KEY`
4. Déployer

### Autre plateforme

Le projet peut être déployé sur toute plateforme supportant Next.js :

- Netlify
- Railway
- Render
- AWS Amplify

## Contribution

Nous accueillons les contributions! Consultez [CONTRIBUTING.md](docs/CONTRIBUTING.md) pour le guide complet.

### Workflow

1. **Fork** le projet
2. **Clone** votre fork
3. **Branch** : `git checkout -b feature/ma-fonctionnalite`
4. **Develop** en suivant les conventions
5. **Test** : `npm run test && npm run test:coverage`
6. **Lint** : `npm run lint && npm run type-check`
7. **Commit** : Messages [Conventional Commits](https://www.conventionalcommits.org/)
8. **Push** : `git push origin feature/ma-fonctionnalite`
9. **PR** : Ouvrir une Pull Request avec le template

### Conventional Commits

Format obligatoire:
```
type(scope): description courte

feat: Nouvelle fonctionnalité
fix: Correction de bug
docs: Documentation
test: Tests
refactor: Refactorisation
chore: Maintenance
```

Exemples:
```bash
git commit -m "feat(generator): add PDF export support"
git commit -m "fix(api): handle missing contact fields"
git commit -m "docs: update installation guide"
```

### Checklist Avant PR

- [ ] Tests passent : `npm run test`
- [ ] Coverage >= 90% : `npm run test:coverage`
- [ ] Lint OK : `npm run lint`
- [ ] Type-check OK : `npm run type-check`
- [ ] Build OK : `npm run build`
- [ ] Documentation à jour
- [ ] Commit messages Conventional
- [ ] Pas de secrets dans le code

### Standards de Code

- **TypeScript** : Strict mode, pas de `any`
- **Nommage** : camelCase (variables), PascalCase (types/composants)
- **Imports** : Ordre: externe > interne > types
- **Tests** : TDD recommandé, AAA pattern
- **Documentation** : JSDoc pour les fonctions complexes

Voir [CONVENTIONS.md](CONVENTIONS.md) pour les détails complets.

## Licence

MIT

## Support

Pour toute question :
- Consulter `context.md` pour l'architecture
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement

---

**Dernière mise à jour** : 2025-11-15
**Version** : 1.0.0 (Industrialized)
**Status** : Production Ready ✅

**Stack Complète:**
- Tests: Vitest + Playwright
- Coverage: >= 90% requis
- CI/CD: GitHub Actions
- Documentation: TypeDoc + Markdown
- Quality: ESLint + Prettier + TypeScript strict
