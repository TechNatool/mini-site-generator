# Context - Générateur de Mini-Sites pour Artisans

## 📋 Vue d'ensemble

### Description du produit

Le **Générateur de Mini-Sites pour Artisans** est une application web automatisée permettant de créer des sites web professionnels pour artisans en quelques clics. L'utilisateur remplit un formulaire simple avec ses informations (nom, activité, ville, services, couleurs préférées), et le système génère automatiquement :

- Un site web complet avec 6 pages (Home, À Propos, Services, Tarifs, Contact, Mentions légales)
- Du contenu SEO optimisé et personnalisé
- Des images générées par IA (optionnel)
- Un fichier ZIP téléchargeable contenant tout le site
- Une option de déploiement automatique sur Vercel

### Objectifs principaux

1. **Simplicité** : Un formulaire unique pour générer un site complet
2. **Professionnalisme** : Design moderne, responsive et optimisé SEO
3. **Automatisation** : Génération de contenu, images et déploiement sans intervention manuelle
4. **Modularité** : Code maintenable et extensible pour futures évolutions
5. **Export** : Possibilité de télécharger ou déployer le site généré

---

## 🏗️ Architecture technique

### Stack technologique

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **IA** : Claude API (Anthropic) pour génération de contenu et images
- **Déploiement** : Vercel
- **Package Management** : npm/pnpm

### Principes architecturaux

1. **Séparation des responsabilités** : Chaque module a un rôle précis
2. **Type-safety** : TypeScript strict sur tout le projet
3. **API-first** : Les API routes sont le cœur de la génération
4. **Templates modulaires** : Chaque page est un template réutilisable
5. **Génération statique** : Les sites générés sont des fichiers statiques

---

## 📁 Structure du projet

```
mini-site-generator/
├── app/
│   ├── api/
│   │   ├── generate-site/
│   │   │   └── route.ts          # API principale de génération
│   │   └── generate-images/
│   │       └── route.ts          # API génération d'images IA
│   ├── generated/
│   │   └── [clientId]/           # Sites générés (dynamique)
│   ├── layout.tsx                # Layout global
│   └── page.tsx                  # Page d'accueil avec formulaire
├── components/
│   ├── FormGenerator.tsx         # Formulaire principal
│   ├── PreviewSite.tsx           # Aperçu du site généré
│   └── ui/                       # Composants UI réutilisables
├── lib/
│   ├── generator.ts              # Orchestrateur de génération
│   ├── seo.ts                    # Utilitaires SEO
│   ├── claude-api.ts             # Intégration Claude API
│   ├── templates/
│   │   ├── home.ts               # Template page d'accueil
│   │   ├── about.ts              # Template à propos
│   │   ├── services.ts           # Template services
│   │   ├── pricing.ts            # Template tarifs
│   │   ├── contact.ts            # Template contact
│   │   └── legal.ts              # Template mentions légales
│   └── utils/
│       ├── zip.ts                # Création de ZIP
│       └── vercel.ts             # Intégration Vercel
├── scripts/
│   ├── create-zip.ts             # Script génération ZIP
│   └── deploy-vercel.ts          # Script déploiement Vercel
├── types/
│   ├── generator.ts              # Types pour la génération
│   ├── templates.ts              # Types pour les templates
│   └── api.ts                    # Types pour les API
├── public/
│   └── assets/                   # Assets statiques
├── styles/
│   └── globals.css               # Styles globaux
├── context.md                    # Ce fichier
├── README.md                     # Documentation utilisateur
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
└── .env.example
```

---

## 🔄 Flux utilisateur complet

### 1. Saisie des informations

L'utilisateur accède à la page d'accueil (`/`) et remplit le formulaire :

```typescript
interface FormData {
  name: string;              // Nom de l'artisan
  activity: string;          // Type d'activité (plombier, électricien, etc.)
  city: string;              // Ville d'exercice
  services: string[];        // Liste des services proposés
  colors: {
    primary: string;         // Couleur principale
    secondary: string;       // Couleur secondaire
  };
  style: 'modern' | 'classic' | 'minimal';  // Style visuel
  languages: string[];       // Langues du site (fr par défaut)
  photos?: File[];           // Photos optionnelles
  contact: {
    email: string;
    phone: string;
    address?: string;
  };
}
```

### 2. Génération du site

Au clic sur "Générer mon site", le flux suivant se déclenche :

1. **Validation des données** (frontend)
2. **Appel API** : `POST /api/generate-site`
3. **Génération du contenu** :
   - Appel Claude API pour générer les textes SEO
   - Génération des H1, H2, meta descriptions
   - Création du contenu personnalisé pour chaque page
4. **Génération des images** (optionnel) :
   - Appel `POST /api/generate-images`
   - Génération de visuels via Claude API
5. **Assemblage du site** :
   - Utilisation des templates
   - Injection du contenu généré
   - Application des couleurs personnalisées
6. **Création des fichiers** :
   - Génération de l'arborescence dans `/app/generated/[clientId]`
   - Création de tous les fichiers (HTML, CSS, config)
7. **Génération du ZIP** :
   - Compression du site généré
   - Stockage temporaire
8. **Réponse à l'utilisateur** :
   - Lien de téléchargement du ZIP
   - Lien de prévisualisation
   - Option de déploiement Vercel

### 3. Téléchargement ou déploiement

L'utilisateur peut :
- **Télécharger le ZIP** : Site complet prêt à déployer ailleurs
- **Déployer sur Vercel** : Déploiement automatique avec URL publique

---

## 🎨 Templates de pages

Chaque template suit cette structure :

```typescript
interface PageTemplate {
  generateContent(data: FormData, aiContent: AIGeneratedContent): string;
  getSEO(data: FormData): SEOMetadata;
  getStructuredData(data: FormData): object;  // Schema.org
}
```

### Template Home (`lib/templates/home.ts`)

**Sections** :
- Hero avec H1 + CTA
- Services en grille
- Témoignages (générés par IA)
- Zone de couverture
- CTA final

**SEO** :
- H1 : "[Activité] professionnel à [Ville]"
- Meta description personnalisée
- Schema.org : LocalBusiness

### Template About (`lib/templates/about.ts`)

**Sections** :
- Introduction de l'artisan
- Expertise et expérience
- Valeurs et engagement
- Certifications

**SEO** :
- H1 : "À propos de [Nom] - [Activité] à [Ville]"
- Schema.org : AboutPage

### Template Services (`lib/templates/services.ts`)

**Sections** :
- Liste détaillée des services
- Process de travail
- Zone d'intervention

**SEO** :
- H1 : "Nos services de [Activité]"
- Schema.org : Service (pour chaque service)

### Template Pricing (`lib/templates/pricing.ts`)

**Sections** :
- Grilles tarifaires (indicatives)
- Facteurs de prix
- Devis gratuit

**SEO** :
- H1 : "Tarifs [Activité] à [Ville]"

### Template Contact (`lib/templates/contact.ts`)

**Sections** :
- Formulaire de contact
- Coordonnées
- Horaires
- Carte (iframe Google Maps)

**SEO** :
- H1 : "Contactez [Nom] - [Activité]"
- Schema.org : ContactPage

### Template Legal (`lib/templates/legal.ts`)

**Sections** :
- Mentions légales
- RGPD
- CGV (si applicable)

---

## 🔌 API Endpoints

### `POST /api/generate-site`

**Input** :
```typescript
{
  formData: FormData,
  options?: {
    generateImages: boolean;
    autoDeployVercel: boolean;
  }
}
```

**Output** :
```typescript
{
  success: boolean;
  clientId: string;
  zipUrl: string;
  previewUrl: string;
  vercelUrl?: string;
  pages: {
    home: string;
    about: string;
    services: string;
    pricing: string;
    contact: string;
    legal: string;
  };
}
```

**Processus** :
1. Validation des données
2. Génération ID client unique
3. Appel Claude API pour contenu
4. Génération des pages avec templates
5. Création du dossier `/generated/[clientId]`
6. Génération du ZIP
7. Déploiement Vercel (si demandé)
8. Retour des URLs

### `POST /api/generate-images`

**Input** :
```typescript
{
  activity: string;
  style: string;
  count: number;
}
```

**Output** :
```typescript
{
  images: {
    hero: string;      // URL de l'image hero
    about: string;     // URL de l'image about
    services: string;  // URL de l'image services
  }
}
```

**Processus** :
1. Construction des prompts pour Claude API
2. Génération des images
3. Stockage dans `/public/generated/[clientId]/images`
4. Retour des URLs

---

## 🤖 Intégration Claude API

### Configuration

Variables d'environnement nécessaires :

```env
ANTHROPIC_API_KEY=sk-ant-xxxxx
CLAUDE_MODEL=claude-3-5-sonnet-20241022
```

### Utilisation pour génération de contenu

```typescript
// lib/claude-api.ts
async function generateSiteContent(formData: FormData): Promise<AIGeneratedContent> {
  const prompt = `
    Tu es un expert en copywriting pour sites web d'artisans.
    Génère du contenu SEO optimisé pour un ${formData.activity} à ${formData.city}.

    Informations :
    - Nom : ${formData.name}
    - Services : ${formData.services.join(', ')}

    Génère :
    1. H1 accrocheur pour la home
    2. Meta description (150-160 caractères)
    3. 3 paragraphes de présentation
    4. Descriptions pour chaque service
    5. 3 témoignages clients fictifs mais réalistes
  `;

  // Appel API Claude
  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4096,
    messages: [{
      role: 'user',
      content: prompt
    }]
  });

  return parseAIResponse(response);
}
```

### Utilisation pour génération d'images

Claude API peut générer des suggestions de visuels ou des descriptions pour d'autres services de génération d'images.

---

## ✅ Checklist de qualité

### Code

- [ ] TypeScript strict activé
- [ ] Tous les types exportés et documentés
- [ ] Commentaires sur les fonctions complexes
- [ ] Pas de `any` sauf justification
- [ ] ESLint sans erreurs
- [ ] Prettier appliqué

### Performance

- [ ] Images optimisées (WebP)
- [ ] Lazy loading des images
- [ ] Code splitting approprié
- [ ] Minification en production
- [ ] Cache HTTP configuré

### SEO

- [ ] Meta tags sur toutes les pages
- [ ] Structured data (schema.org)
- [ ] Sitemap.xml généré
- [ ] Robots.txt configuré
- [ ] URLs propres et SEO-friendly

### Accessibilité

- [ ] Labels sur tous les inputs
- [ ] ARIA attributes appropriés
- [ ] Contraste couleurs suffisant
- [ ] Navigation au clavier
- [ ] Alt text sur toutes les images

### Sécurité

- [ ] Validation des inputs
- [ ] Sanitization des données
- [ ] HTTPS obligatoire
- [ ] Rate limiting sur les API
- [ ] Pas de secrets en frontend

---

## 🛠️ Conventions de code

### Naming conventions

- **Composants** : PascalCase (`FormGenerator.tsx`)
- **Fonctions** : camelCase (`generateSite()`)
- **Types/Interfaces** : PascalCase (`FormData`, `PageTemplate`)
- **Constantes** : UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)
- **Fichiers** : kebab-case pour les utilitaires (`create-zip.ts`)

### Structure des composants

```typescript
// Imports
import { FC } from 'react';

// Types
interface Props {
  // ...
}

// Composant
export const ComponentName: FC<Props> = ({ prop1, prop2 }) => {
  // Hooks
  // States
  // Effects
  // Handlers

  // Render
  return (
    // JSX
  );
};
```

### Gestion des erreurs

```typescript
try {
  // Code
} catch (error) {
  console.error('[Module] Error description:', error);
  throw new Error('User-friendly error message');
}
```

---

## 🚀 Déploiement

### Environnements

1. **Development** : `npm run dev` (local)
2. **Staging** : Branche `staging` sur Vercel
3. **Production** : Branche `main` sur Vercel

### Variables d'environnement

```env
# .env.example
ANTHROPIC_API_KEY=
VERCEL_TOKEN=
NEXT_PUBLIC_APP_URL=
MAX_SITES_PER_DAY=100
ZIP_STORAGE_PATH=/tmp/generated-sites
```

### Process de déploiement

1. **Local** → Push vers GitHub
2. **GitHub** → Trigger Vercel deployment
3. **Vercel** → Build + Deploy
4. **Post-deploy** → Health checks

---

## 🗺️ Roadmap

### MVP (Phase 1) ✅

- [x] Formulaire de génération
- [x] Templates des 6 pages
- [x] Génération de contenu basique
- [x] Export ZIP
- [x] Intégration Claude API

### V1 (Phase 2)

- [ ] Génération d'images par IA
- [ ] Déploiement Vercel automatique
- [ ] Dashboard pour gérer les sites générés
- [ ] Édition du contenu généré
- [ ] Preview en temps réel

### V2 (Phase 3)

- [ ] Multi-langues
- [ ] Templates additionnels
- [ ] Intégration analytics
- [ ] Formulaires de contact fonctionnels
- [ ] Blog auto-généré
- [ ] Système de paiement

---

## 📚 Instructions pour futures sessions Claude Code

### Contexte à lire en priorité

1. Lire ce `context.md` en entier
2. Consulter le `README.md` pour les commandes
3. Vérifier la structure dans `/app` et `/lib`

### Conventions à respecter

- Toujours typer avec TypeScript
- Utiliser Tailwind pour le styling (pas de CSS modules)
- Commenter les fonctions complexes
- Suivre la structure de templates existante
- Tester les API routes avant de commit

### Ajout de nouvelles fonctionnalités

1. Créer un nouveau type dans `/types` si nécessaire
2. Ajouter la logique dans `/lib`
3. Créer l'API route si nécessaire
4. Mettre à jour les composants concernés
5. Documenter dans le README
6. Ajouter à la roadmap dans ce fichier

### Debugging

- Logs serveur : `console.log('[Module]', data)`
- Errors : Toujours catcher et logger
- Types : Vérifier avec `tsc --noEmit`

### Tests

- Tester chaque template individuellement
- Vérifier la génération du ZIP
- Tester l'API avec des données variées
- Valider le SEO avec Lighthouse

---

## 🧰 Outils et dépendances

### Dépendances principales

```json
{
  "next": "^14.0.0",
  "@anthropic-ai/sdk": "^0.27.0",
  "archiver": "^6.0.0",
  "react": "^18.0.0",
  "tailwindcss": "^3.4.0",
  "typescript": "^5.0.0"
}
```

### DevDependencies

```json
{
  "@types/node": "^20.0.0",
  "@types/react": "^18.0.0",
  "eslint": "^8.0.0",
  "prettier": "^3.0.0"
}
```

---

## 📖 Glossaire

- **Artisan** : Professionnel indépendant (plombier, électricien, maçon, etc.)
- **Mini-site** : Site web simple de 4-6 pages
- **Template** : Modèle de page réutilisable
- **SEO** : Search Engine Optimization
- **Schema.org** : Standard de données structurées
- **ZIP** : Archive compressée du site généré
- **Client ID** : Identifiant unique pour chaque site généré

---

## 🔗 Ressources

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Claude API](https://docs.anthropic.com)
- [Vercel Deployment](https://vercel.com/docs)
- [Schema.org](https://schema.org)

---

**Dernière mise à jour** : 2025-11-14
**Version** : 1.0.0
**Mainteneur** : IA Architect
