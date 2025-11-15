# AI Handover Guide - Mini Site Generator

**Pour: Claude Code AI et futurs assistants IA**
**Objectif**: Permettre à une IA de reprendre et maintenir ce projet efficacement

## 📋 Vue d'ensemble du projet

### Qu'est-ce que ce projet?

Le Mini Site Generator est une application Next.js 14 qui génère automatiquement des sites web professionnels pour artisans en utilisant l'API Claude d'Anthropic.

**Flux principal:**
```
User Input → API Claude → Template Generation → HTML Files → ZIP Export
```

**Technologies:**
- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- Anthropic Claude API
- Archiver (ZIP)

### Fichiers critiques

**TOUJOURS lire ces fichiers en premier:**
1. `context.md` - Architecture complète
2. `package.json` - Dépendances et scripts
3. `lib/generator.ts` - Logique principale
4. `app/api/generate-site/route.ts` - API principale

## 🎯 Comment analyser ce projet

### Étape 1: Lecture du contexte

```typescript
// Commencer TOUJOURS par:
1. Lire context.md (architecture)
2. Lire docs/ARCHITECTURE.md (technique)
3. Lire README.md (introduction)
4. Lire docs/DEVELOPMENT_GUIDE.md (développement)
```

### Étape 2: Comprendre la structure

```
Modules principaux:
├── lib/generator.ts          → Orchestrateur principal
├── lib/claude-api.ts         → Communication Claude API
├── lib/templates/            → Templates HTML
├── lib/utils/               → Utilitaires (zip, cleanup)
└── app/api/generate-site/   → API endpoint principal
```

### Étape 3: Identifier les dépendances

```typescript
// Dépendances critiques
const criticalDeps = {
  'next': 'Framework',
  '@anthropic-ai/sdk': 'API Claude',
  'archiver': 'Création ZIP',
  'react': 'UI',
};

// Ne JAMAIS supprimer ces dépendances
```

## 🛠️ Comment contribuer efficacement

### Pattern de développement

```typescript
// 1. TOUJOURS lire le fichier avant de modifier
await readFile(path);

// 2. Comprendre le contexte
const context = analyzeFunction();

// 3. Faire les modifications
const newCode = improveCode(oldCode);

// 4. Vérifier la cohérence
checkConsistency(newCode);

// 5. Écrire le fichier
await writeFile(path, newCode);
```

### Commits

**Format obligatoire: Conventional Commits**

```bash
# Types valides
feat: Nouvelle fonctionnalité
fix: Correction de bug
docs: Documentation
style: Formatage
refactor: Refactorisation
test: Tests
chore: Maintenance

# Exemple
git commit -m "feat(generator): add PDF export support"
```

### Tests

**TOUJOURS écrire des tests pour:**
- Nouvelles fonctionnalités
- Corrections de bugs
- Refactorisations importantes

```typescript
// Pattern de test
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

## 📐 Conventions strictes

### TypeScript

```typescript
// ✅ BON
function generateSite(formData: FormData): Promise<GeneratedSite> {
  // Type explicite
}

// ❌ MAUVAIS
function generateSite(formData: any): any {
  // Pas de types
}
```

### Nommage

```typescript
// Variables: camelCase
const userName = 'John';

// Fonctions: camelCase
function getUserData() {}

// Types/Interfaces: PascalCase
interface UserData {}

// Constantes: UPPER_SNAKE_CASE
const MAX_RETRIES = 3;

// Composants React: PascalCase
function UserProfile() {}
```

### Logging

```typescript
// Préfixes standardisés
console.log('[Module] Message');
console.warn('[Module] ⚠ Warning');
console.error('[Module] ✗ Erreur');

// Symboles
// ✓ Succès
// ⚠ Warning
// ✗ Erreur
```

### Imports

```typescript
// Ordre strict
import { external } from 'external-package';

import { internal } from '@/lib/internal';

import type { Type } from '@/types';
```

## 🚨 Points d'attention critiques

### Sécurité

```typescript
// ⚠️ CRITIQUE: Ne JAMAIS exposer les secrets côté client
// ✅ BON: Server-side only
const apiKey = process.env.ANTHROPIC_API_KEY;

// ❌ MAUVAIS: Exposé au client
const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
```

### Paths

```typescript
// ✅ BON: Utiliser process.cwd()
const path = path.join(process.cwd(), 'app', 'generated', clientId);

// ❌ MAUVAIS: Chemins relatifs
const path = '../generated/' + clientId;
```

### Validation

```typescript
// ✅ BON: Toujours valider les inputs
if (!formData || !formData.name || !formData.city) {
  throw new Error('Données manquantes');
}

// ❌ MAUVAIS: Pas de validation
const site = generateSite(formData);
```

## 🔄 Workflow de modification

### Scénario 1: Ajouter une nouvelle fonctionnalité

```typescript
/*
1. Lire DEVELOPMENT_GUIDE.md
2. Créer une branche: feature/nom-fonctionnalite
3. Écrire les tests d'abord (TDD)
4. Implémenter la fonctionnalité
5. Vérifier: npm run type-check && npm run lint && npm run test
6. Commiter avec Conventional Commits
7. Créer une PR avec le template
*/
```

### Scénario 2: Corriger un bug

```typescript
/*
1. Reproduire le bug
2. Créer un test qui échoue
3. Corriger le bug
4. Vérifier que le test passe
5. Vérifier la non-régression
6. Commiter: fix(module): description
*/
```

### Scénario 3: Refactoriser

```typescript
/*
1. S'assurer que tous les tests passent
2. Faire la refactorisation
3. Vérifier que tous les tests passent encore
4. Vérifier les performances
5. Commiter: refactor(module): description
*/
```

## 🧪 Tests obligatoires

### Avant chaque modification

```bash
# 1. Type checking
npm run type-check

# 2. Linting
npm run lint

# 3. Tests
npm run test

# 4. Build
npm run build
```

### Couverture minimale

```typescript
const coverage = {
  statements: 90,
  branches: 85,
  functions: 90,
  lines: 90,
};
```

## 📝 Documentation obligatoire

### Fonctions complexes

```typescript
/**
 * Génère un site complet pour un artisan
 *
 * @param formData - Données du formulaire utilisateur
 * @param options - Options de génération (images, déploiement)
 * @returns Site généré avec ID, pages, et fichiers
 *
 * @throws Error si les données sont invalides
 * @throws Error si l'API Claude échoue
 *
 * @example
 * ```typescript
 * const site = await generateSite(formData, { generateImages: true });
 * ```
 */
export async function generateSite(
  formData: FormData,
  options?: GenerationOptions
): Promise<GeneratedSite> {
  // Implementation
}
```

## 🎓 Connaissances contextuelles

### Next.js 14 App Router

```typescript
// Server Components par défaut
// Client Components: 'use client'

// API Routes: app/api/*/route.ts
export async function POST(request: NextRequest) {}

// Dynamic Routes: app/[param]/page.tsx
export default async function Page({ params }: { params: { id: string } }) {}
```

### Claude API

```typescript
// Utilisation
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const response = await client.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 4096,
  messages: [{
    role: 'user',
    content: 'Prompt structuré JSON',
  }],
});
```

### Tailwind CSS

```tsx
// Classes organisées par catégorie
<div className="
  flex items-center justify-between
  px-6 py-4
  bg-white rounded-lg shadow-md
  hover:shadow-lg transition-shadow
">
```

## ⚠️ Erreurs courantes à éviter

### 1. Oublier le type checking

```typescript
// ❌ MAUVAIS
const data = getData(); // any type
data.doSomething(); // Pas d'autocomplete

// ✅ BON
const data: SiteData = getData();
data.clientId; // Autocomplete!
```

### 2. Ne pas gérer les erreurs

```typescript
// ❌ MAUVAIS
const result = await riskyOperation();

// ✅ BON
try {
  const result = await riskyOperation();
  console.log('[Module] ✓ Success');
} catch (error) {
  console.error('[Module] ✗ Error:', error);
  throw new Error('User-friendly message');
}
```

### 3. Ignorer les tests

```typescript
// ❌ MAUVAIS: Modifier sans tester

// ✅ BON
// 1. Écrire le test
it('should handle new case', () => {
  expect(fn(newCase)).toBe(expected);
});

// 2. Implémenter
// 3. Vérifier que ça passe
```

## 🔧 Debugging

### Logs structurés

```typescript
console.log('[Generator] Starting generation', {
  clientId,
  timestamp: Date.now(),
  formData: {
    name: formData.name,
    activity: formData.activity,
  },
});
```

### Vérifications système

```bash
# État du système
npm run type-check
npm run lint
npm run test

# Build
npm run build

# Logs
tail -f logs/error.log
```

## 📚 Ressources essentielles

### Documentation interne

- `docs/ARCHITECTURE.md` - Architecture technique
- `docs/DEVELOPMENT_GUIDE.md` - Guide développeur
- `docs/CONTRIBUTING.md` - Conventions et workflow
- `docs/TESTING_STRATEGY.md` - Stratégie de tests
- `docs/SECURITY.md` - Sécurité
- `docs/DEPLOYMENT.md` - Déploiement
- `docs/SCALABILITY.md` - Scalabilité
- `docs/MAINTENANCE.md` - Maintenance

### Documentation externe

- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Anthropic API Docs](https://docs.anthropic.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 🎯 Checklist avant commit

```bash
- [ ] Code type-safe (npm run type-check)
- [ ] Code linté (npm run lint)
- [ ] Tests passent (npm run test)
- [ ] Coverage >= 90% (npm run test:coverage)
- [ ] Build réussit (npm run build)
- [ ] Documentation à jour
- [ ] Commit message suit Conventional Commits
- [ ] Pas de secrets dans le code
- [ ] Changements testés manuellement
```

## 🚀 Prompts spécialisés pour IA

### Analyser le projet

```
Analyse complète du Mini Site Generator:
1. Lis context.md
2. Lis docs/ARCHITECTURE.md
3. Résume l'architecture en 5 points
4. Identifie les modules critiques
5. Liste les dépendances externes
```

### Ajouter une fonctionnalité

```
Ajoute [FEATURE] au Mini Site Generator:
1. Respecte TOUTES les conventions dans CONTRIBUTING.md
2. Suis le pattern dans DEVELOPMENT_GUIDE.md
3. Écris les tests d'abord (TDD)
4. Documente avec JSDoc
5. Utilise Conventional Commits
6. Vérifie type-check, lint, tests, build
```

### Debug un problème

```
Debug le problème [PROBLEM]:
1. Reproduis le problème
2. Identifie le module concerné
3. Lis le code du module
4. Ajoute des logs structurés
5. Crée un test qui échoue
6. Corrige et vérifie que le test passe
```

## 💡 Conseils finaux

1. **TOUJOURS lire avant d'écrire** - Comprendre le contexte
2. **Respecter les conventions** - Cohérence du code
3. **Tester systématiquement** - Fiabilité
4. **Documenter clairement** - Maintenabilité
5. **Commiter proprement** - Historique lisible
6. **Penser sécurité** - Pas de failles
7. **Optimiser avec raison** - Performance vs complexité
8. **Demander si incertain** - Mieux vaut clarifier

## 📧 Support

En cas de doute:
1. Relire ce guide
2. Consulter docs/
3. Vérifier les exemples dans le code
4. Créer une issue avec le template

---

**Note pour Claude Code AI**: Ce projet suit des standards professionnels stricts. Respecter TOUTES les conventions garantit la qualité et la maintenabilité du code. En cas de doute, toujours privilégier la cohérence avec l'existant.
