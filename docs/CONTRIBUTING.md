# Contributing to Mini Site Generator

Merci de votre intérêt pour contribuer au Mini Site Generator! Ce document contient toutes les informations nécessaires pour contribuer efficacement au projet.

## Table des matières

1. [Code de conduite](#code-de-conduite)
2. [Comment contribuer](#comment-contribuer)
3. [Workflow Git](#workflow-git)
4. [Standards de code](#standards-de-code)
5. [Pull Requests](#pull-requests)
6. [Revue de code](#revue-de-code)
7. [Issues](#issues)
8. [Communication](#communication)

## Code de conduite

### Nos engagements

Nous nous engageons à faire de la participation à ce projet une expérience exempte de harcèlement pour tout le monde, quel que soit:
- L'âge
- La taille corporelle
- Le handicap
- L'ethnicité
- L'identité et l'expression de genre
- Le niveau d'expérience
- La nationalité
- L'apparence personnelle
- La race
- La religion
- L'identité et l'orientation sexuelles

### Comportements attendus

- Utiliser un langage accueillant et inclusif
- Respecter les différents points de vue et expériences
- Accepter gracieusement les critiques constructives
- Se concentrer sur ce qui est le mieux pour la communauté
- Faire preuve d'empathie envers les autres membres de la communauté

### Comportements inacceptables

- L'utilisation de langage ou d'images sexualisés
- Les commentaires trolls, insultants ou dérogatoires
- Le harcèlement public ou privé
- La publication d'informations privées sans permission
- Toute autre conduite qui pourrait raisonnablement être considérée comme inappropriée

## Comment contribuer

### Types de contributions

Nous acceptons les contributions suivantes:

1. **Code**
   - Nouvelles fonctionnalités
   - Corrections de bugs
   - Améliorations de performance
   - Refactorisation

2. **Documentation**
   - Amélioration de la documentation existante
   - Traductions
   - Tutoriels et guides
   - Corrections de typos

3. **Tests**
   - Tests unitaires
   - Tests d'intégration
   - Tests E2E
   - Amélioration de la couverture

4. **Design**
   - Améliorations UI/UX
   - Accessibilité
   - Responsive design

5. **Infrastructure**
   - CI/CD
   - Scripts d'automatisation
   - Configuration

### Avant de commencer

1. **Chercher une issue existante**
   - Vérifier si quelqu'un travaille déjà dessus
   - Éviter les duplications de travail

2. **Créer une issue** (si nécessaire)
   - Décrire clairement le problème ou la fonctionnalité
   - Attendre validation avant de commencer à coder

3. **Fork le repository**
   - Créer votre propre fork
   - Travailler sur votre fork

## Workflow Git

### 1. Fork et Clone

```bash
# Fork sur GitHub (bouton "Fork")
# Puis cloner votre fork
git clone https://github.com/VOTRE-USERNAME/mini-site-generator.git
cd mini-site-generator

# Ajouter le repo upstream
git remote add upstream https://github.com/TechNatool/mini-site-generator.git
```

### 2. Créer une branche

```bash
# Mettre à jour votre main
git checkout main
git pull upstream main

# Créer une branche
git checkout -b type/description-courte
```

**Convention de nommage des branches:**

- `feature/nom-fonctionnalite`: Nouvelle fonctionnalité
- `fix/description-bug`: Correction de bug
- `refactor/description`: Refactorisation
- `docs/description`: Documentation
- `test/description`: Tests
- `chore/description`: Maintenance

**Exemples:**
```bash
git checkout -b feature/add-pdf-export
git checkout -b fix/zip-creation-error
git checkout -b docs/improve-readme
```

### 3. Développer

```bash
# Installer les dépendances
npm install

# Lancer le serveur de dev
npm run dev

# Faire vos modifications
# ...

# Vérifier régulièrement
npm run type-check
npm run lint
npm run test
```

### 4. Commits

Utiliser **Conventional Commits**:

```bash
git commit -m "type(scope): description courte

Description détaillée (optionnel)

Fixes #123
"
```

**Types de commit:**

- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation seulement
- `style`: Formatage (pas de changement de code)
- `refactor`: Refactorisation
- `perf`: Amélioration de performance
- `test`: Ajout/modification de tests
- `build`: Changements du système de build
- `ci`: Changements de CI/CD
- `chore`: Autres changements (maintenance)

**Scopes (optionnel):**

- `generator`: Générateur de sites
- `api`: Routes API
- `ui`: Interface utilisateur
- `templates`: Templates de pages
- `cleanup`: Nettoyage
- `zip`: Création ZIP
- `claude`: API Claude
- `seo`: SEO

**Exemples de commits:**

```bash
# Nouvelle fonctionnalité
git commit -m "feat(generator): add PDF export support"

# Correction de bug
git commit -m "fix(zip): handle special characters in filenames"

# Documentation
git commit -m "docs: update installation guide"

# Refactorisation
git commit -m "refactor(api): extract validation logic"

# Tests
git commit -m "test(generator): add unit tests for generateClientId"

# Breaking change
git commit -m "feat(api)!: change response format

BREAKING CHANGE: API response now returns { data, meta } instead of flat object
"
```

### 5. Sync avec upstream

```bash
# Avant de push, sync avec upstream
git fetch upstream
git rebase upstream/main

# Résoudre les conflits si nécessaire
# Puis continuer
git rebase --continue
```

### 6. Push

```bash
git push origin feature/ma-branche

# Si rebase, force push (avec précaution!)
git push --force-with-lease origin feature/ma-branche
```

## Standards de code

### TypeScript

```typescript
// ✅ Bon
interface User {
  id: string;
  name: string;
  email: string;
}

function createUser(data: User): Promise<User> {
  // Implementation
}

// ❌ Mauvais
function createUser(data: any): any {
  // Implementation
}
```

### Naming Conventions

```typescript
// Variables et fonctions: camelCase
const userName = 'John';
function getUserData() { }

// Types et interfaces: PascalCase
type UserType = string;
interface UserData { }

// Constantes: UPPER_SNAKE_CASE
const MAX_RETRIES = 3;
const API_ENDPOINT = '/api/users';

// Composants React: PascalCase
function UserProfile() { }

// Fichiers:
// - Composants: PascalCase.tsx
// - Utilitaires: kebab-case.ts
// - Types: kebab-case.ts
```

### Imports

```typescript
// Order: externe > interne > types
import { useState } from 'react';
import { NextRequest } from 'next/server';

import { generateSite } from '@/lib/generator';
import { cleanupOldFiles } from '@/lib/utils/cleanup';

import type { FormData } from '@/types/generator';
import type { GenerateSiteResponse } from '@/types/api';
```

### Logging

```typescript
// Utiliser les préfixes standardisés
console.log('[Module] Message informatif');
console.warn('[Module] ⚠ Avertissement');
console.error('[Module] ✗ Erreur:', error);

// Symbols
// ✓ : Succès
// ⚠ : Warning
// ✗ : Erreur
```

### Error Handling

```typescript
// Toujours wrapper dans try/catch
try {
  const result = await riskyOperation();
  console.log('[Module] ✓ Opération réussie');
  return result;
} catch (error) {
  console.error('[Module] ✗ Erreur:', error);
  throw new Error('Message utilisateur clair');
}
```

### React Components

```typescript
// Interface pour les props
interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

// Fonction export default
export default function Button({ onClick, disabled, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 bg-primary-600 text-white rounded-lg"
    >
      {children}
    </button>
  );
}
```

### CSS (Tailwind)

```tsx
// ✅ Bon: classes organisées
<div className="
  flex items-center justify-between
  px-6 py-4
  bg-white rounded-lg shadow-md
  hover:shadow-lg transition-shadow
">

// ❌ Mauvais: classes désorganisées
<div className="hover:shadow-lg flex bg-white px-6 items-center shadow-md py-4 rounded-lg justify-between transition-shadow">
```

### Tests

```typescript
// Structure AAA: Arrange, Act, Assert
import { describe, it, expect, beforeEach } from 'vitest';

describe('Module Name', () => {
  // Arrange
  beforeEach(() => {
    // Setup
  });

  it('should do something specific', () => {
    // Arrange
    const input = 'test';

    // Act
    const result = functionToTest(input);

    // Assert
    expect(result).toBe('expected');
  });

  it('should handle errors', () => {
    expect(() => functionToTest(null)).toThrow();
  });
});
```

## Pull Requests

### Avant de créer une PR

1. **Tests passent**
   ```bash
   npm run test
   npm run test:coverage
   ```

2. **Lint et format**
   ```bash
   npm run lint
   npm run format
   npm run type-check
   ```

3. **Build réussit**
   ```bash
   npm run build
   ```

4. **Commits bien formatés**
   - Conventional Commits
   - Messages clairs

5. **Branche à jour**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

### Créer la PR

1. **Push votre branche**
   ```bash
   git push origin feature/ma-branche
   ```

2. **Ouvrir la PR sur GitHub**
   - Aller sur le repository
   - Cliquer "New Pull Request"
   - Sélectionner votre branche

3. **Remplir le template**

```markdown
## Description

Brève description des changements.

## Type de changement

- [ ] Bug fix (non-breaking)
- [ ] Nouvelle fonctionnalité (non-breaking)
- [ ] Breaking change
- [ ] Documentation

## Checklist

- [ ] Mon code suit les conventions du projet
- [ ] J'ai fait une self-review
- [ ] J'ai commenté le code complexe
- [ ] J'ai mis à jour la documentation
- [ ] Mes changements ne génèrent pas de warnings
- [ ] J'ai ajouté des tests
- [ ] Les tests passent en local
- [ ] Les changements dépendants ont été mergés

## Tests

Décrire comment tester les changements.

## Screenshots (si applicable)

Ajouter des screenshots pour les changements UI.

## Notes additionnelles

Toute information supplémentaire pour les reviewers.

## Related Issues

Closes #123
Fixes #456
```

### Title de la PR

Format:
```
type(scope): description courte
```

Exemples:
```
feat(generator): add PDF export support
fix(api): handle missing fields in request
docs: update contributing guide
refactor(cleanup): improve performance
```

### Draft PR

Pour les WIP (Work In Progress):
```bash
# Créer une draft PR sur GitHub
# Permet d'avoir des feedbacks tôt
```

## Revue de code

### Pour les reviewers

1. **Vérifier**
   - Le code suit les conventions
   - Les tests passent
   - La fonctionnalité fonctionne
   - Pas de régression
   - Performance
   - Sécurité

2. **Commenter**
   - Être constructif
   - Expliquer le "pourquoi"
   - Proposer des alternatives
   - Approuver si OK

3. **Types de commentaires**
   - **MUST**: Changement obligatoire
   - **SHOULD**: Suggestion forte
   - **COULD**: Suggestion optionnelle
   - **QUESTION**: Demande de clarification
   - **NIT**: Détail mineur (nitpick)

Exemples:
```
MUST: Ce code a une faille de sécurité XSS
SHOULD: Considérer l'extraction de cette logique en fonction
COULD: On pourrait utiliser `useMemo` ici pour la performance
QUESTION: Pourquoi utiliser cette approche plutôt que X ?
NIT: Typo dans le commentaire
```

### Pour les auteurs

1. **Répondre aux commentaires**
   - Tous les commentaires
   - Expliquer vos choix
   - Faire les changements demandés

2. **Push des updates**
   ```bash
   # Faire les changements
   git add .
   git commit -m "fix: address review comments"
   git push origin feature/ma-branche
   ```

3. **Request re-review**
   - Marquer les conversations comme resolved
   - Re-request review

## Issues

### Créer une issue

1. **Chercher si existe déjà**
   - Éviter les doublons

2. **Choisir le bon template**
   - Bug Report
   - Feature Request
   - Documentation
   - Question

3. **Bug Report Template**

```markdown
## Description du bug

Description claire et concise.

## Reproduction

Steps pour reproduire:
1. Aller sur '...'
2. Cliquer sur '...'
3. Voir l'erreur

## Comportement attendu

Ce qui devrait se passer.

## Comportement actuel

Ce qui se passe réellement.

## Screenshots

Si applicable.

## Environnement

- OS: [e.g. macOS 14]
- Browser: [e.g. Chrome 120]
- Node version: [e.g. 18.17.0]
- Version du projet: [e.g. 1.0.0]

## Logs

```
Coller les logs ici
```

## Context additionnel

Toute autre information pertinente.
```

4. **Feature Request Template**

```markdown
## Fonctionnalité demandée

Description claire de la fonctionnalité.

## Problème résolu

Quel problème cette fonctionnalité résout-elle?

## Solution proposée

Comment devrait-elle fonctionner?

## Alternatives considérées

Quelles autres solutions avez-vous envisagées?

## Context additionnel

Screenshots, mockups, exemples de code, etc.
```

### Labels

Les issues utilisent ces labels:
- `bug`: Quelque chose ne fonctionne pas
- `enhancement`: Nouvelle fonctionnalité
- `documentation`: Amélioration de la doc
- `good first issue`: Bon pour les débutants
- `help wanted`: Besoin d'aide
- `duplicate`: Issue dupliquée
- `invalid`: Issue invalide
- `wontfix`: Ne sera pas corrigé
- `priority-high`: Priorité haute
- `priority-low`: Priorité basse

## Communication

### Canaux

- **GitHub Issues**: Bugs, features, questions
- **GitHub Discussions**: Discussions générales
- **Pull Requests**: Code reviews
- **Email**: contact@example.com (pour les questions privées)

### Temps de réponse

- Issues: 48-72h
- PR reviews: 72-96h
- Questions: 24-48h

### Langues

- Anglais: Préféré pour le code et les PR
- Français: Accepté pour les issues et discussions

## Reconnaissance des contributeurs

Tous les contributeurs sont ajoutés dans:
- README.md (section Contributors)
- Package.json (contributors field)
- CHANGELOG.md (pour chaque release)

Merci de contribuer! 🎉
