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

### Créer un ZIP manuellement

```bash
npm run create-zip <clientId>
```

### Déployer sur Vercel manuellement

```bash
npm run deploy-vercel <clientId>
```

### Type checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

### Formatage

```bash
npm run format
```

## Structure du projet

```
mini-site-generator/
├── app/
│   ├── api/
│   │   ├── generate-site/      # API de génération
│   │   └── generate-images/    # API images
│   ├── generated/              # Sites générés (non versionné)
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── FormGenerator.tsx       # Formulaire principal
├── lib/
│   ├── claude-api.ts          # Intégration Claude
│   ├── generator.ts           # Orchestrateur
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
│       ├── zip.ts            # Création ZIP
│       └── vercel.ts         # Déploiement Vercel
├── scripts/
│   ├── create-zip.ts
│   └── deploy-vercel.ts
├── types/
│   ├── generator.ts
│   ├── templates.ts
│   └── api.ts
├── context.md                # Documentation architecture
└── README.md
```

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

### Workflow

1. Fork le projet
2. Créer une branche (`git checkout -b feature/ma-fonctionnalite`)
3. Commit (`git commit -m 'Ajout de ma fonctionnalité'`)
4. Push (`git push origin feature/ma-fonctionnalite`)
5. Ouvrir une Pull Request

### Conventions de code

- TypeScript strict
- Utiliser Prettier pour le formatage
- Commenter les fonctions complexes
- Suivre les conventions définies dans `context.md`

## Licence

MIT

## Support

Pour toute question :
- Consulter `context.md` pour l'architecture
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement

---

**Dernière mise à jour** : 2025-11-14
**Version** : 1.0.0
