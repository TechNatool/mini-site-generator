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

## AI Settings (Admin Panel)

Le projet dispose d'un panneau d'administration permettant de **choisir dynamiquement** le fournisseur IA sans modifier les variables d'environnement.

### Accès

Interface accessible via : **`/admin/ai-settings`**

### Fonctionnalités

Le panneau admin permet de choisir entre trois modes :

1. **Claude (Premium)** 🤖
   - Utilise l'API Anthropic Claude
   - Meilleure qualité de contenu
   - Nécessite une clé API et des crédits

2. **IA Locale (DeepSeek/Ollama)** 💻
   - Utilise un modèle AI local via Ollama
   - Gratuit et privé
   - Nécessite Ollama installé et un modèle téléchargé

3. **Mode sans IA (Fallback)** 🚫
   - Contenu générique interne
   - Aucun appel IA
   - Rapide et gratuit

### Configuration persistée

Les paramètres sont sauvegardés dans `.config/ai-settings.json` et persistent entre les redémarrages.

Exemple de fichier :
```json
{
  "provider": "local",
  "model": "deepseek-coder-v2"
}
```

### Ordre de priorité

1. Si `NO_AI=true` → Mode fallback (toujours)
2. Si fichier `.config/ai-settings.json` existe → Utilise le provider du fichier
3. Si variable d'environnement `AI_PROVIDER` définie → Utilise la variable
4. Sinon → Claude (défaut)

### Utilisation

```bash
# 1. Démarrer le serveur
npm run dev

# 2. Ouvrir le panneau admin
http://localhost:3000/admin/ai-settings

# 3. Choisir le provider et sauvegarder
# Les paramètres sont immédiatement actifs
```

### API

Le panneau utilise l'API REST `/api/admin/ai-settings` :

**GET** : Récupère les paramètres actuels
```bash
curl http://localhost:3000/api/admin/ai-settings
```

**PUT** : Sauvegarde de nouveaux paramètres
```bash
curl -X PUT http://localhost:3000/api/admin/ai-settings \
  -H "Content-Type: application/json" \
  -d '{"provider": "local", "model": "deepseek-coder-v2"}'
```

### Tests

Pour tester le panneau admin :

```bash
npm run test:unit -- tests/unit/admin/ai-settings.test.ts
```

Les tests vérifient :
- Chargement des paramètres depuis le fichier
- Sauvegarde des paramètres
- Ordre de priorité correct (NO_AI > config > env > défaut)
- Compatibilité avec tous les providers

## SEO Boost (Admin Panel)

Le projet dispose d'un système de **post-processing SEO** qui améliore automatiquement le contenu généré pour optimiser le référencement naturel.

### Accès

Interface accessible via : **`/admin/seo-settings`**

### Fonctionnalités

Le panneau SEO Boost permet de :

1. **Activer/Désactiver le SEO Boost** ✅
   - Applique un post-processing IA après la génération initiale
   - Optimise le contenu pour le SEO
   - Calcule et affiche un score SEO

2. **Choisir le ton du contenu** 🎯
   - **Professional** : Ton formel et expert, vocabulaire technique approprié
   - **Friendly** : Ton chaleureux, accessible et sympathique
   - **Sales** : Ton persuasif et orienté vente, met en avant les bénéfices
   - **Local** : Ton local et proximité, insiste sur le service de quartier
   - **Minimalist** : Ton concis et épuré, phrases courtes
   - **Longform** : Ton détaillé et exhaustif, développe les arguments

3. **Définir des mots-clés cibles** 🔑
   - Liste de mots-clés séparés par des virgules
   - Intégrés naturellement dans le contenu
   - Utilisés pour calculer le score SEO

### Configuration persistée

Les paramètres sont sauvegardés dans `.config/seo-settings.json` et persistent entre les redémarrages.

Exemple de fichier :
```json
{
  "enabled": true,
  "tone": "professional",
  "keywords": ["plombier paris", "dépannage urgent", "artisan qualifié"]
}
```

### Comment ça fonctionne

1. **Génération initiale** : Le contenu est d'abord généré avec l'IA configurée
2. **Post-processing SEO** : Si activé, le contenu passe par une seconde phase d'optimisation
3. **Amélioration du contenu** : L'IA améliore les textes selon le ton et les mots-clés
4. **Analyse SEO** : Un score est calculé et loggé (0-100)
5. **Préservation de la structure** : Seuls les textes sont améliorés, pas la structure JSON

### Score SEO

Le score SEO est calculé sur 4 critères (25 points chacun) :

- **Densité de mots-clés** (25 pts) : Optimal entre 1-3%
- **Lisibilité** (25 pts) : Basée sur la longueur moyenne des phrases
- **Headers** (25 pts) : Nombre de titres H1, H2, H3
- **Longueur du contenu** (25 pts) : Minimum 300 mots recommandé

Exemple de log :
```
[SEO] Post-processing enabled (tone: professional)
[SEO] Using Claude for SEO enhancement
[SEO] Enhancement complete - Score: 87/100
[SEO] Score: 87/100 (keywords: 2.3%, readability: 85.0, headers: 4)
```

### Contraintes importantes

- ✅ **Compatible NO_AI** : Si `NO_AI=true`, SEO Boost est automatiquement désactivé
- ✅ **Provider-agnostic** : Utilise le même provider (Claude ou Local) que la génération initiale
- ✅ **Structure préservée** : Ne modifie jamais la structure JSON, uniquement les textes descriptifs
- ✅ **Graceful degradation** : En cas d'erreur, retourne le contenu original

### Utilisation

```bash
# 1. Démarrer le serveur
npm run dev

# 2. Ouvrir le panneau SEO
http://localhost:3000/admin/seo-settings

# 3. Activer SEO Boost, choisir le ton et les mots-clés

# 4. Générer un site - le SEO post-processing s'appliquera automatiquement
```

### API

Le panneau utilise l'API REST `/api/admin/seo-settings` :

**GET** : Récupère les paramètres actuels
```bash
curl http://localhost:3000/api/admin/seo-settings
```

Réponse :
```json
{
  "source": "config-file",
  "settings": {
    "enabled": true,
    "tone": "professional",
    "keywords": ["plombier", "paris"]
  }
}
```

**PUT** : Sauvegarde de nouveaux paramètres
```bash
curl -X PUT http://localhost:3000/api/admin/seo-settings \
  -H "Content-Type: application/json" \
  -d '{
    "enabled": true,
    "tone": "friendly",
    "keywords": ["plombier paris", "dépannage"]
  }'
```

**DELETE** : Réinitialise les paramètres par défaut
```bash
curl -X DELETE http://localhost:3000/api/admin/seo-settings
```

### Tests

Pour tester le module SEO :

```bash
npm run test:unit -- tests/unit/admin/seo-settings.test.ts
```

Les tests vérifient :
- Chargement et sauvegarde des paramètres
- Validation des tons (6 valeurs possibles)
- Validation des keywords (array de strings)
- Calcul du score SEO
- Analyse de densité de mots-clés
- Calcul de lisibilité
- Détection de headers
- Compatibilité NO_AI mode

### Exemple de différence

**Sans SEO Boost** :
```
"introduction": "Bienvenue ! Jean Dupont est votre plombier de confiance à Paris."
```

**Avec SEO Boost (tone: professional, keywords: [plombier paris, dépannage urgent])** :
```
"introduction": "Expert plombier à Paris depuis 15 ans, Jean Dupont intervient pour tous vos besoins en plomberie. Dépannage urgent 24h/24, installations sanitaires et maintenance préventive dans tout Paris."
```

## Auto-Images AI (Admin Panel)

Le projet dispose d'un système de **génération automatique d'images** avec optimisation et alt-text SEO pour les sites générés.

### Accès

Interface accessible via : **`/admin/image-settings`**

### Fonctionnalités

Le panneau Auto-Images AI permet de :

1. **Choisir le provider d'images** 🎨
   - **Claude (Coming Soon)** : Génération IA premium (pas encore disponible)
   - **Local AI (Stable Diffusion)** : Génération locale gratuite
   - **None (Placeholder)** : Images SVG placeholder rapides

2. **Configuration de l'optimisation** ⚙️
   - Taille : 512px à 1920px (slider)
   - Format : WebP / JPEG / PNG
   - Qualité : 1% à 100% (slider)
   - Activer/Désactiver l'optimisation

3. **Alt-text automatique pour le SEO** 📝
   - Génération automatique basée sur le contexte
   - Optimisé pour l'accessibilité et le référencement
   - Adapté à chaque page (home, services, about, etc.)

### Configuration persistée

Les paramètres sont sauvegardés dans `.config/image-settings.json` et persistent entre les redémarrages.

Exemple de fichier :
```json
{
  "provider": "local",
  "size": 1080,
  "format": "webp",
  "quality": 85,
  "optimize": true,
  "autoAltText": true
}
```

### Comment ça fonctionne

1. **Génération du prompt** : Création d'un prompt adapté à chaque page
2. **Appel au provider** : Claude, Local AI, ou placeholder selon config
3. **Optimisation** : Compression, resize, conversion de format
4. **Alt-text** : Génération automatique pour SEO et accessibilité
5. **Sauvegarde** : Images optimisées enregistrées dans `/public/generated/`

### Pipeline d'optimisation

Le système utilise **Sharp** pour optimiser les images :

- **Resize** : Redimensionnement avec aspect ratio préservé
- **Compression** : WebP (meilleur ratio), JPEG (compatibilité), PNG (qualité)
- **Métadonnées** : Suppression des données EXIF pour réduire la taille
- **Qualité** : Contrôle fin de 1% à 100%

Exemple de réduction :
```
Original: 3.5 MB (3000×3000 PNG)
Optimized: 187 KB (1080×1080 WebP 85%)
Reduction: 95% de taille en moins
```

### Providers d'images

#### Claude (Coming Soon)
- Génération IA premium via Anthropic
- Meilleure qualité visuelle
- Nécessite crédits API
- **Statut** : Pas encore disponible

#### Local AI (Stable Diffusion)
- Fonctionne avec Stable Diffusion local
- Gratuit et privé
- Nécessite serveur local à `localhost:7860`

Configuration :
```bash
# Variable d'environnement optionnelle
STABLE_DIFFUSION_URL=http://localhost:7860/sdapi/v1/txt2img

# Installer Stable Diffusion Web UI
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui
cd stable-diffusion-webui
./webui.sh

# Accessible sur http://localhost:7860
```

#### None (Placeholder)
- Images SVG placeholder minimalistes
- Texte adapté au contenu
- Rapide et léger
- Parfait pour développement/tests

### Alt-text automatique

L'alt-text est généré automatiquement en fonction du contexte :

| Page | Exemple d'alt-text |
|------|-------------------|
| Home | "Plombier professionnel à Paris - Vue d'ensemble des services" |
| Services | "Plombier professionnel à Paris - Services et prestations" |
| About | "Plombier professionnel à Paris - Équipe et expertise" |
| Contact | "Plombier professionnel à Paris - Contact et localisation" |

### Utilisation

```bash
# 1. Démarrer le serveur
npm run dev

# 2. Ouvrir le panneau Images AI
http://localhost:3000/admin/image-settings

# 3. Configurer provider, taille, format, qualité

# 4. Générer un site - les images seront créées automatiquement
```

### API

Le panneau utilise l'API REST `/api/admin/image-settings` :

**GET** : Récupère les paramètres actuels
```bash
curl http://localhost:3000/api/admin/image-settings
```

Réponse :
```json
{
  "source": "config-file",
  "settings": {
    "provider": "local",
    "size": 1080,
    "format": "webp",
    "quality": 85,
    "optimize": true,
    "autoAltText": true
  }
}
```

**PUT** : Sauvegarde de nouveaux paramètres
```bash
curl -X PUT http://localhost:3000/api/admin/image-settings \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "local",
    "size": 1080,
    "format": "webp",
    "quality": 85,
    "optimize": true,
    "autoAltText": true
  }'
```

**DELETE** : Réinitialise les paramètres par défaut
```bash
curl -X DELETE http://localhost:3000/api/admin/image-settings
```

### Tests

Pour tester le module Images AI :

```bash
# Tests de configuration
npm run test:unit -- tests/unit/admin/image-settings.test.ts

# Tests de génération IA
npm run test:unit -- tests/unit/lib/image-ai.test.ts

# Tests d'optimisation
npm run test:unit -- tests/unit/lib/image-optimizer.test.ts
```

Les tests vérifient :
- Chargement et sauvegarde des paramètres
- Validation des providers (claude, local, none)
- Validation des formats (webp, jpg, png)
- Validation taille (128-4096px) et qualité (1-100%)
- Génération d'images avec chaque provider
- Optimisation et compression
- Création de placeholders
- Génération d'alt-text
- Gestion d'erreurs et fallback

### Contraintes

- ✅ **Compatible NO_AI** : Si `NO_AI=true`, utilise toujours des placeholders
- ✅ **Optimisation optionnelle** : Peut être désactivée si besoin
- ✅ **Formats multiples** : WebP, JPEG, PNG supportés
- ✅ **Graceful degradation** : Fallback vers placeholder en cas d'erreur
- ✅ **Performance** : Réduction jusqu'à 95% de la taille des images

### Exemple de prompts générés

```javascript
// Page d'accueil
"Professional Plombier storefront in Paris, high quality photo, professional, well-lit, inviting atmosphere, modern equipment"

// Page services
"Plombier at work providing quality service, professional photography, detailed tools and equipment, clean workspace, expert in action"

// Page à propos
"Professional team of Plombier in Paris, friendly and approachable, modern office or workshop, professional headshots style"
```

## AutoDeploy (Admin Panel)

Le projet dispose d'un système de **déploiement automatique** qui permet de déployer les mini-sites générés vers différents providers (Netlify, Vercel, FTP, ou local).

### Accès

Interfaces accessibles via :
- **`/admin/deploy-settings`** : Configuration du provider de déploiement
- **`/admin/deploy`** : Déclenchement du déploiement

### Fonctionnalités

Le panneau AutoDeploy permet de :

1. **Choisir le provider de déploiement** 🚀
   - **Netlify** : Déploiement automatique via API Netlify
   - **Vercel** : Déploiement automatique via API Vercel
   - **FTP/SFTP** : Upload vers serveur FTP ou SFTP
   - **Local** : Export vers système de fichiers local

2. **Configuration par provider** ⚙️
   - Chaque provider a ses propres paramètres
   - Validation automatique des champs requis
   - Configuration sécurisée et persistante

3. **Déploiement en un clic** 🎯
   - Génération automatique du ZIP
   - Upload vers le provider configuré
   - Retour de l'URL du site déployé

### Configuration persistée

Les paramètres sont sauvegardés dans `.config/deploy-settings.json` et persistent entre les redémarrages.

Exemples de fichiers de configuration :

**Netlify** :
```json
{
  "provider": "netlify",
  "netlify": {
    "apiToken": "your-netlify-token",
    "siteId": "your-site-id"
  }
}
```

**Vercel** :
```json
{
  "provider": "vercel",
  "vercel": {
    "apiToken": "your-vercel-token",
    "projectId": "your-project-id",
    "teamId": "your-team-id"
  }
}
```

**FTP** :
```json
{
  "provider": "ftp",
  "ftp": {
    "host": "ftp.example.com",
    "port": 21,
    "username": "user",
    "password": "pass",
    "remotePath": "/public_html",
    "secure": false
  }
}
```

**Local** :
```json
{
  "provider": "local",
  "local": {
    "outputPath": "./out/sites"
  }
}
```

### Comment ça fonctionne

1. **Configuration** : Choisir le provider et entrer les identifiants dans `/admin/deploy-settings`
2. **Génération** : Le site est généré et archivé en ZIP
3. **Déploiement** : Le ZIP est envoyé au provider configuré via `/admin/deploy`
4. **Résultat** : L'URL du site déployé est retournée

### Providers de déploiement

#### Netlify
- Déploiement via l'API Netlify Deploy
- Nécessite un API Token et un Site ID
- URL retournée : `https://your-site.netlify.app`

**Configuration requise** :
- **API Token** : Généré depuis [app.netlify.com](https://app.netlify.com/user/applications)
- **Site ID** : Trouvé dans les paramètres du site Netlify

Exemple d'appel API :
```bash
POST https://api.netlify.com/api/v1/sites/{siteId}/deploys
Content-Type: application/zip
Authorization: Bearer {apiToken}
Body: [ZIP buffer]
```

#### Vercel
- Déploiement via l'API Vercel Deployments v13
- Nécessite un API Token et un Project ID
- Team ID optionnel pour les équipes
- URL retournée : `https://your-project.vercel.app`

**Configuration requise** :
- **API Token** : Généré depuis [vercel.com/account/tokens](https://vercel.com/account/tokens)
- **Project ID** : Nom du projet Vercel
- **Team ID** : (Optionnel) ID de l'équipe si projet partagé

Exemple d'appel API :
```bash
POST https://api.vercel.com/v13/deployments
Content-Type: application/json
Authorization: Bearer {apiToken}
Body: { "name": "{projectId}", "files": {...} }
```

#### FTP/SFTP
- Upload de fichiers via FTP ou SFTP
- Configuration flexible (port, secure mode)
- URL retournée : `ftp://host/path` ou `sftp://host/path`

**Configuration requise** :
- **Host** : Adresse du serveur FTP
- **Port** : Port FTP (21 par défaut) ou SFTP (22 par défaut)
- **Username** : Nom d'utilisateur FTP
- **Password** : Mot de passe FTP
- **Remote Path** : Chemin distant (ex: `/public_html`)
- **Secure** : `true` pour SFTP, `false` pour FTP

**Note** : L'implémentation FTP actuelle est un placeholder. Pour la production, intégrer une bibliothèque comme `basic-ftp` ou `ssh2-sftp-client`.

#### Local
- Export vers le système de fichiers local
- Crée un répertoire avec timestamp : `site-{timestamp}`
- URL retournée : `file://{path}/index.html`

**Configuration requise** :
- **Output Path** : Chemin de sortie (ex: `./out/sites`)

Exemple de structure créée :
```
./out/sites/
└── site-1734345678901/
    ├── index.html
    ├── about.html
    ├── services.html
    ├── pricing.html
    ├── contact.html
    └── legal.html
```

### Utilisation

```bash
# 1. Démarrer le serveur
npm run dev

# 2. Configurer le provider de déploiement
http://localhost:3000/admin/deploy-settings

# 3. Choisir le provider (netlify, vercel, ftp, local)

# 4. Entrer les identifiants requis et sauvegarder

# 5. Déclencher le déploiement
http://localhost:3000/admin/deploy

# 6. Cliquer sur "Deploy Mini-Site" et attendre le résultat
```

### API

Le système AutoDeploy utilise deux API routes :

#### GET/PUT/DELETE /api/admin/deploy-settings

**GET** : Récupère les paramètres de déploiement actuels

```bash
curl http://localhost:3000/api/admin/deploy-settings
```

Réponse :
```json
{
  "source": "config-file",
  "settings": {
    "provider": "netlify",
    "netlify": {
      "apiToken": "your-token",
      "siteId": "your-site-id"
    }
  }
}
```

**PUT** : Sauvegarde de nouveaux paramètres

```bash
curl -X PUT http://localhost:3000/api/admin/deploy-settings \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "netlify",
    "netlify": {
      "apiToken": "your-token",
      "siteId": "your-site-id"
    }
  }'
```

**DELETE** : Réinitialise les paramètres par défaut (local)

```bash
curl -X DELETE http://localhost:3000/api/admin/deploy-settings
```

#### POST /api/admin/deploy-site

Déclenche le déploiement d'un mini-site avec le provider configuré.

```bash
curl -X POST http://localhost:3000/api/admin/deploy-site \
  -H "Content-Type: application/json" \
  -d '{}'
```

Réponse en cas de succès :
```json
{
  "success": true,
  "provider": "netlify",
  "url": "https://your-site.netlify.app",
  "details": "Deployment deploy-123 triggered successfully"
}
```

Réponse en cas d'erreur :
```json
{
  "success": false,
  "provider": "netlify",
  "error": "Netlify API error: 401 Unauthorized"
}
```

### Tests

Pour tester le module AutoDeploy :

```bash
# Tests de configuration
npm run test:unit -- tests/unit/lib/deploy-config.test.ts

# Tests des deployers
npm run test:unit -- tests/unit/lib/deployers.test.ts

# Tests de l'API
npm run test:unit -- tests/unit/admin/deploy-settings.test.ts
```

Les tests vérifient :
- Chargement et sauvegarde des paramètres
- Validation des providers (netlify, vercel, ftp, local)
- Validation des champs requis par provider
- Déploiement avec chaque provider (network calls mocked)
- Gestion d'erreurs et statuts HTTP corrects
- Création de répertoires et extraction de fichiers
- Retour des URLs appropriées

### Contraintes et sécurité

- ✅ **Validation stricte** : Chaque provider valide ses champs requis
- ✅ **Credentials sécurisés** : Les tokens et mots de passe sont stockés localement dans `.config/`
- ✅ **Graceful degradation** : En cas d'erreur, retourne un message explicite
- ✅ **Provider par défaut** : Local (aucune configuration requise)
- ⚠️ **Fichier .config/** : Ajouter `.config/` à `.gitignore` pour ne pas commiter les credentials
- ⚠️ **Production** : En production, utiliser des variables d'environnement pour les secrets

### Logs de déploiement

Le système génère des logs clairs pour chaque étape :

```
[DEPLOY] Starting deployment with provider: netlify
[DEPLOY] Deploying to Netlify site: my-site-id
[DEPLOY] Netlify deployment triggered: deploy-123abc
```

En cas d'erreur :
```
[DEPLOY] Error during deployment: Netlify API error: 401 Unauthorized
[DEPLOY] Netlify deployment failed: Error: ...
```

### Sécurité

**Recommandations** :
1. Ne jamais commiter le fichier `.config/deploy-settings.json`
2. Utiliser des API tokens avec permissions minimales
3. Régénérer les tokens régulièrement
4. En production, préférer les variables d'environnement aux fichiers de config

**Ajout à .gitignore** :
```bash
# Deploy credentials
.config/deploy-settings.json
```

## Client Admin + Site Manager (Dashboard)

Le projet dispose d'un **dashboard complet de gestion des sites** permettant de créer, gérer, regénérer et déployer les mini-sites depuis une interface centralisée.

### Accès

Dashboard accessible via : **`/dashboard`**

### Fonctionnalités

Le dashboard permet de :

1. **Vue d'ensemble** 📊   - Statistiques : nombre total de sites, générations réussies, déploiements
   - Derniers sites créés   - Accès rapide aux actions courantes

2. **Gestion des sites** 🗂️
   - Liste complète de tous les sites générés   - Filtrage par statut (tous, générés, déployés)
   - Actions rapides : voir, télécharger ZIP, supprimer

3. **Création de sites** ➕   - Formulaire simplifié de création
   - Génération complète (IA, SEO, images selon config)   - Sauvegarde automatique dans le store

4. **Détail et actions** 🔍
   - Informations complètes du site   - **Regénération** : relance la génération IA avec les mêmes inputs
   - **Redéploiement** : déploie vers le provider configuré   - **Logs détaillés** : génération et déploiement   - Téléchargement du ZIP
   - Lien vers le site déployé

5. **Historique des déploiements** 📜
   - Vue globale de tous les déploiements   - Filtrage par site, provider, statut
   - Timestamps et messages détaillés

### Stockage persistant

Les sites sont sauvegardés dans `.data/sites.json` avec la structure suivante :

```typescript
type SiteEntry = {
  id: string;
  createdAt: string;
  updatedAt: string;
  inputs: Record<string, any>;  // Formulaire initial

  generation: {
    success: boolean;
    zipPath: string | null;
    html: Record<string, string> | null;
    logs: string[];
  };

  deployment: {
    provider: string | null;
    url: string | null;
    timestamp: string | null;
    logs: DeploymentLog[];
  };
};
```

### API REST complète

#### GET /api/sites
Liste tous les sites

```bash
curl http://localhost:3000/api/sites
```

Réponse :
```json
{
  "success": true,
  "sites": [...],
  "total": 5
}
```

#### POST /api/sites
Crée un nouveau site

```bash
curl -X POST http://localhost:3000/api/sites \
  -H "Content-Type: application/json" \
  -d '{
    "formData": {
      "name": "Jean Dupont",
      "activity": "plombier",
      "city": "Paris",
      "services": ["Dépannage"],
      "contact": {
        "email": "jean@example.com",
        "phone": "06 12 34 56 78"
      },
      "colors": { "primary": "#0ea5e9", "secondary": "#d946ef" },
      "style": "modern",
      "languages": ["fr"]
    },
    "options": {}
  }'
```

Réponse :
```json
{
  "success": true,
  "id": "site-1734567890-abc123",
  "message": "Site created successfully",
  "zipUrl": "/downloads/site-1734567890-abc123.zip",
  "previewUrl": "/preview/site-1734567890-abc123"
}
```

#### GET /api/sites/[id]
Récupère les détails d'un site

```bash
curl http://localhost:3000/api/sites/site-123
```

#### PUT /api/sites/[id]
Regénère un site existant (conserve les inputs, relance l'IA)

```bash
curl -X PUT http://localhost:3000/api/sites/site-123 \
  -H "Content-Type: application/json" \
  -d '{ "options": {} }'
```

#### POST /api/sites/[id]/deploy
Déploie un site avec AutoDeploy

```bash
curl -X POST http://localhost:3000/api/sites/site-123/deploy
```

Réponse :
```json
{
  "success": true,
  "deployment": {
    "provider": "netlify",
    "url": "https://site-123.netlify.app",
    "details": "Deployment successful"
  }
}
```

#### GET /api/sites/[id]/logs
Récupère tous les logs (génération + déploiement)

```bash
curl http://localhost:3000/api/sites/site-123/logs
```

#### DELETE /api/sites/[id]
Supprime un site

```bash
curl -X DELETE http://localhost:3000/api/sites/site-123
```

### Pages du Dashboard

#### /dashboard
**Page d'accueil** : statistiques, derniers sites, actions rapides

#### /dashboard/sites
**Liste des sites** : tableau complet avec filtres, actions (voir, télécharger, supprimer)

#### /dashboard/sites/new
**Création de site** : formulaire simplifié pour générer un nouveau site

#### /dashboard/sites/[id]
**Détail d'un site** :
- Informations complètes
- Boutons : Regénérer, Déployer, Télécharger ZIP
- Statuts de génération et déploiement
- Logs complets (génération + déploiement)
- Lien vers le site déployé

#### /dashboard/deployments
**Historique global** : tous les déploiements de tous les sites, triés par date

### Intégration avec les modules existants

Le dashboard **réutilise tous les modules** :
- **AI Provider** : utilise le provider configuré (Claude, Local, None)
- **SEO Boost** : applique automatiquement si activé
- **Auto-Images** : génère des images si configuré
- **AutoDeploy** : utilise les deploy-settings pour le déploiement

Compatible avec `NO_AI=true` et tous les providers.

### Workflow complet

1. **Créer un site** : `/dashboard/sites/new` → POST `/api/sites`
2. **Voir la liste** : `/dashboard/sites` → GET `/api/sites`
3. **Consulter détails** : `/dashboard/sites/[id]` → GET `/api/sites/[id]`
4. **Regénérer** : Bouton "Regenerate" → PUT `/api/sites/[id]`
5. **Déployer** : Bouton "Deploy" → POST `/api/sites/[id]/deploy`
6. **Historique** : `/dashboard/deployments` → Logs de tous les sites

### Tests

Pour tester le module Dashboard :

```bash
# Tests du store
npm run test:unit -- tests/unit/lib/sites-store.test.ts
```

Les tests vérifient :
- Chargement et sauvegarde des sites
- CRUD complet (Create, Read, Update, Delete)
- Ajout de logs de déploiement
- Gestion des erreurs (fichier manquant, JSON invalide)
- Création automatique du répertoire `.data/`

### Architecture

```
app/
├── dashboard/
│   ├── page.tsx                    # Accueil dashboard
│   ├── sites/
│   │   ├── page.tsx                # Liste sites
│   │   ├── new/
│   │   │   └── page.tsx            # Créer site
│   │   └── [id]/
│   │       └── page.tsx            # Détail site
│   └── deployments/
│       └── page.tsx                # Historique déploiements
├── api/
│   └── sites/
│       ├── route.ts                # GET/POST sites
│       └── [id]/
│           ├── route.ts            # GET/PUT/DELETE site
│           ├── deploy/
│           │   └── route.ts        # POST déploiement
│           └── logs/
│               └── route.ts        # GET logs

lib/
└── sites-store.ts                  # Store persistant (.data/sites.json)

.data/
└── sites.json                      # Base de données des sites
```

### Sécurité et maintenance

**Recommandations** :
1. Ajouter `.data/` à `.gitignore` (déjà fait)
2. Sauvegarder régulièrement `.data/sites.json`
3. Implémenter une authentification pour `/dashboard` en production
4. Limiter le nombre de sites par utilisateur
5. Nettoyer automatiquement les anciens ZIP

**Ajout à .gitignore** :
```bash
# Sites database
.data/
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

## Authentication & Multi-User System

Le système d'authentification permet de gérer plusieurs utilisateurs avec des permissions strictes sur leurs sites.

### Overview

- **Stockage** : `.data/users.json` (hashing bcrypt)
- **Sessions** : Cookies signés HMAC SHA256 (30 jours)
- **Middleware** : Protection automatique des routes `/dashboard/*`
- **Multi-tenancy** : Isolation complète des sites par utilisateur

### Architecture

```
lib/
├── users-store.ts      # CRUD utilisateurs + bcrypt
├── session.ts          # Gestion sessions sécurisées
└── auth-guard.ts       # Middleware de protection

app/api/auth/
├── register/route.ts   # Création compte
├── login/route.ts      # Connexion
└── logout/route.ts     # Déconnexion

app/dashboard/
├── login/page.tsx      # Page de connexion
├── register/page.tsx   # Page d'inscription
└── logout/page.tsx     # Page de déconnexion

middleware.ts           # Protection globale des routes
```

### User Storage Structure

```typescript
// .data/users.json
type UserEntry = {
  id: string;              // user_<timestamp>_<random>
  email: string;           // unique, lowercase
  passwordHash: string;    // bcrypt hash (10 rounds)
  createdAt: string;       // ISO 8601
};
```

### Session Management

Les sessions sont des tokens signés avec HMAC SHA256 :

```typescript
// Format: userId.timestamp.signature
const sessionToken = createSession(userId);

// Vérification
const userId = getUserIdFromSession(sessionToken);
```

**Configuration** :
- Cookie : `session`
- Durée : 30 jours
- Flags : HttpOnly, SameSite=Strict
- Secure : true en production, false en dev

**Variable d'environnement** :
```env
SESSION_SECRET=change-this-to-a-random-secret-in-production-min-32-chars
```

### API Routes

#### POST /api/auth/register

Créer un nouveau compte utilisateur.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "mypassword123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_1234567890_abc123",
    "email": "user@example.com",
    "createdAt": "2025-11-16T10:00:00.000Z"
  }
}
```

**Validation:**
- Email : format valide
- Password : minimum 8 caractères
- Email unique (erreur 409 si déjà utilisé)

**Headers:**
```
Set-Cookie: session=<signed-token>; Max-Age=2592000; Path=/; HttpOnly; SameSite=Strict
```

#### POST /api/auth/login

Connexion à un compte existant.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "mypassword123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_1234567890_abc123",
    "email": "user@example.com",
    "createdAt": "2025-11-16T10:00:00.000Z"
  }
}
```

**Errors:**
- 401 : Email ou mot de passe incorrect
- 400 : Champs manquants

#### POST /api/auth/logout

Déconnexion (supprime le cookie session).

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Headers:**
```
Set-Cookie: session=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict
```

### Multi-User Site Isolation

Chaque site appartient à un utilisateur via le champ `ownerId` :

```typescript
type SiteEntry = {
  id: string;
  ownerId: string;  // ← ID de l'utilisateur propriétaire
  createdAt: string;
  // ...
};
```

**Protection des routes API** :

Toutes les routes `/api/sites/*` vérifient l'authentification et filtrent par `ownerId` :

```typescript
// Exemple: GET /api/sites
const user = await requireAuth(request);
if (!user) return 401;

const sites = await getSitesByOwnerId(user.id);  // Filtre automatique
```

**Permissions** :
- ✅ Utilisateur peut voir / modifier / supprimer uniquement ses sites
- ❌ Utilisateur ne peut PAS accéder aux sites d'autres utilisateurs
- ❌ Retourne 404 (et non 403) pour éviter l'énumération

### Pages Frontend

#### /dashboard/login

Page de connexion avec formulaire email/password.

**Fonctionnalités** :
- Validation côté client
- Affichage des erreurs
- Redirection vers `/dashboard` après login réussi
- Lien vers `/dashboard/register`

#### /dashboard/register

Page d'inscription avec formulaire email/password/confirmation.

**Validation** :
- Password minimum 8 caractères
- Confirmation de password
- Format email valide
- Message d'erreur si email déjà utilisé

**Redirection** : `/dashboard` après inscription réussie

#### /dashboard/logout

Page de déconnexion automatique.

**Comportement** :
- Appelle POST `/api/auth/logout`
- Redirige vers `/dashboard/login`
- Affiche un loader pendant le logout

### Route Protection (middleware.ts)

Le middleware Next.js protège automatiquement toutes les routes `/dashboard/*` sauf `/login`, `/register`, `/logout`.

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  if (pathname.startsWith('/dashboard') && !isPublicRoute) {
    const userId = getUserIdFromSession(sessionToken);

    if (!userId) {
      redirect('/dashboard/login');
    }
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
```

### Security Best Practices

**Passwords** :
- ✅ Hashing avec bcrypt (10 rounds)
- ✅ Pas de stockage en clair
- ✅ Minimum 8 caractères requis

**Sessions** :
- ✅ Tokens signés avec HMAC SHA256
- ✅ Clé secrète depuis `SESSION_SECRET` (env)
- ✅ Expiration après 30 jours
- ✅ Cookies HttpOnly (pas accessible en JS)
- ✅ SameSite=Strict (protection CSRF)

**API Routes** :
- ✅ Vérification d'authentification sur toutes les routes sensibles
- ✅ Isolation des données par `ownerId`
- ✅ Retour 404 (pas 403) pour éviter l'énumération
- ✅ Validation stricte des inputs

**Recommendations** :
- 🔐 Changer `SESSION_SECRET` en production (minimum 32 caractères aléatoires)
- 🔐 Activer HTTPS en production (`Secure` cookie)
- 🔐 Mettre à jour bcrypt rounds si nécessaire (actuellement 10)
- 🔐 Implémenter rate-limiting sur `/api/auth/*` (recommandé)
- 🔐 Ajouter validation d'email (email de confirmation) (optionnel)
- 🔐 Implémenter "Forgot Password" (optionnel)

### Workflow Example

```bash
# 1. Créer un compte
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}' \
  -c cookies.txt

# 2. Créer un site (authenticated)
curl -X POST http://localhost:3000/api/sites \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "formData": {
      "name": "Mon Entreprise",
      "activity": "plumber",
      "city": "Paris",
      "contact": {"phone":"0123456789","email":"contact@example.com"},
      "services": ["Installation","Réparation"]
    }
  }'

# 3. Lister ses sites
curl http://localhost:3000/api/sites -b cookies.txt

# 4. Se déconnecter
curl -X POST http://localhost:3000/api/auth/logout -b cookies.txt
```

### Tests

Les tests unitaires couvrent :
- ✅ `users-store.ts` : CRUD, hashing, validation
- ⏳ `session.ts` : création, vérification, expiration
- ⏳ `auth-guard.ts` : protection des routes
- ⏳ API auth : register, login, logout
- ⏳ Multi-tenancy : isolation par ownerId

```bash
npm run test tests/unit/lib/users-store.test.ts
```

### Migration Existing Sites

Si vous avez déjà des sites sans `ownerId`, créez un script de migration :

```typescript
// scripts/migrate-add-owner.ts
import { loadSites, saveSites } from './lib/sites-store';

async function migrate() {
  const sites = await loadSites();
  const defaultOwnerId = 'user_admin_default';

  const updated = sites.map(site => ({
    ...site,
    ownerId: site.ownerId || defaultOwnerId
  }));

  await saveSites(updated);
  console.log(`Migrated ${sites.length} sites`);
}

migrate();
```

## Templates Premium

Le projet dispose d'un **système de templates professionnels** optimisés par profession, permettant de générer des sites single-page avec des designs spécifiques à chaque activité.

### Overview

- **6 templates disponibles** : Default, Électricien, Plombier, Coach, Psychologue, Avocat
- **Architecture modulaire** : Facile d'ajouter de nouveaux templates
- **Injection de contenu IA** : Placeholders `{{variable}}` remplacés automatiquement
- **Single-page design** : index.html + styles.css optimisés
- **Compatibilité totale** : Fonctionne avec AI, SEO Boost, Images, AutoDeploy

### Architecture

```
lib/templates/
├── templates.ts              # Système de gestion des templates
├── default/
│   ├── index.html           # Structure HTML avec placeholders
│   └── styles.css           # Thème bleu moderne
├── electrician/
│   ├── index.html
│   └── styles.css           # Thème jaune/or technique
├── plumber/
│   ├── index.html
│   └── styles.css           # Thème cyan aquatique
├── coach/
│   ├── index.html
│   └── styles.css           # Thème orange motivant
├── psychologist/
│   ├── index.html
│   └── styles.css           # Thème violet apaisant
└── lawyer/
    ├── index.html
    └── styles.css           # Thème slate professionnel
```

### Templates Disponibles

| Template | Nom | Couleur | Catégorie | Description |
|----------|-----|---------|-----------|-------------|
| default | Classique | #0ea5e9 (Bleu) | General | Moderne et polyvalent pour toute activité |
| electrician | Électricien | #eab308 (Jaune) | Artisan | Design technique avec motifs électriques |
| plumber | Plombier | #06b6d4 (Cyan) | Artisan | Palette aquatique avec accent services urgence |
| coach | Coach | #f59e0b (Orange) | Wellness | Tons motivants, inspirant et dynamique |
| psychologist | Psychologue | #8b5cf6 (Violet) | Wellness | Design apaisant avec formes rondes |
| lawyer | Avocat | #1e293b (Slate) | Professional | Sobre et professionnel, haute crédibilité |

### Utilisation

#### 1. Sélection du template dans le Dashboard

Lors de la création d'un site via `/dashboard/sites/new`, un sélecteur visuel permet de choisir le template :

```tsx
// Le template est ajouté au formData
{
  name: "Jean Dupont",
  activity: "plombier",
  city: "Paris",
  template: "plumber",  // ← Template sélectionné
  // ...
}
```

#### 2. Génération automatique

Le générateur détecte si un template est sélectionné et utilise le système de templates au lieu du système multi-page :

```typescript
// Dans lib/generator.ts
if (formData.template) {
  // Utilise le système de templates single-page
  return await generateSiteWithTemplate(formData, aiContent, clientId);
}

// Sinon, utilise l'ancien système multi-page
```

#### 3. Placeholders et injection

Les templates utilisent des placeholders qui sont remplacés par le contenu IA :

**Placeholders supportés** :
```html
{{title}}               <!-- Meta title SEO -->
{{description}}         <!-- Meta description SEO -->
{{seo_tags}}           <!-- Tags OpenGraph, Twitter, etc. -->
{{business_name}}      <!-- Nom de l'entreprise -->
{{hero_title}}         <!-- Titre principal (H1) -->
{{hero_subtitle}}      <!-- Sous-titre accrocheur -->
{{services_content}}   <!-- HTML des services -->
{{about_content}}      <!-- Texte "À propos" -->
{{phone}}              <!-- Téléphone -->
{{email}}              <!-- Email -->
{{address}}            <!-- Adresse -->
{{year}}               <!-- Année courante -->
```

**Exemple d'injection** :
```html
<!-- Template (before) -->
<h1>{{business_name}}</h1>
<p>{{hero_subtitle}}</p>

<!-- Résultat (after) -->
<h1>Jean Dupont Plomberie</h1>
<p>Votre plombier de confiance à Paris depuis 15 ans</p>
```

### Créer un Nouveau Template

#### Étape 1 : Créer le répertoire

```bash
mkdir -p lib/templates/mon-template
```

#### Étape 2 : Créer index.html

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <meta name="description" content="{{description}}">
    {{seo_tags}}
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav class="navbar">
        <h1>{{business_name}}</h1>
    </nav>

    <section class="hero">
        <h2>{{hero_title}}</h2>
        <p>{{hero_subtitle}}</p>
    </section>

    <section class="services">
        <h2>Nos Services</h2>
        <div class="services-grid">
            {{services_content}}
        </div>
    </section>

    <section class="about">
        <h2>À Propos</h2>
        {{about_content}}
    </section>

    <section class="contact">
        <h3>Contact</h3>
        <p>Téléphone: {{phone}}</p>
        <p>Email: {{email}}</p>
    </section>

    <footer>
        <p>&copy; {{year}} {{business_name}}</p>
    </footer>
</body>
</html>
```

#### Étape 3 : Créer styles.css

```css
:root {
    --primary-color: #your-color;
    --primary-dark: #your-dark-color;
    /* Autres variables CSS */
}

body {
    font-family: -apple-system, sans-serif;
    color: var(--primary-color);
}

/* Vos styles personnalisés */
```

#### Étape 4 : Ajouter aux templates.ts

```typescript
// Dans lib/templates/templates.ts

// 1. Ajouter au tableau TEMPLATES
export const TEMPLATES = [
  'default',
  'electrician',
  'plumber',
  'coach',
  'psychologist',
  'lawyer',
  'mon-template',  // ← Nouveau template
] as const;

// 2. Ajouter aux métadonnées
const TEMPLATE_METADATA: Record<TemplateName, Omit<TemplateDefinition, 'files'>> = {
  // ... templates existants
  'mon-template': {
    name: 'mon-template',
    displayName: 'Mon Template',
    description: 'Description de mon template personnalisé',
    color: '#your-color',
    previewImage: '/templates/mon-template-preview.png',
    category: 'general', // 'general' | 'artisan' | 'professional' | 'wellness'
  },
};
```

#### Étape 5 : Ajouter au sélecteur UI

```tsx
// Dans app/dashboard/sites/new/page.tsx
{[
  { value: 'default', name: 'Classique', color: '#0ea5e9', category: 'General' },
  // ... autres templates
  { value: 'mon-template', name: 'Mon Template', color: '#your-color', category: 'General' },
].map((template) => (
  // ... render logic
))}
```

### Fonctionnement Interne

#### 1. Chargement du Template

```typescript
// lib/templates/templates.ts
export function getTemplate(name: TemplateName): TemplateDefinition {
  const metadata = TEMPLATE_METADATA[name];
  const templateDir = path.join(process.cwd(), 'lib', 'templates', name);

  const files: Record<string, string> = {};

  // Charger index.html
  const indexPath = path.join(templateDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    files['index.html'] = fs.readFileSync(indexPath, 'utf-8');
  }

  // Charger styles.css
  const stylesPath = path.join(templateDir, 'styles.css');
  if (fs.existsSync(stylesPath)) {
    files['styles.css'] = fs.readFileSync(stylesPath, 'utf-8');
  }

  return { ...metadata, files };
}
```

#### 2. Injection du Contenu

```typescript
// lib/templates/templates.ts
export function injectTemplateContent(
  templateHtml: string,
  data: Record<string, string>
): string {
  let result = templateHtml;

  // Remplacer tous les placeholders
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      const placeholder = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
      result = result.replace(placeholder, value);
    }
  }

  // Supprimer les placeholders restants
  result = result.replace(/\{\{[^}]+\}\}/g, '');

  return result;
}
```

#### 3. Génération avec Template

```typescript
// lib/generator.ts
async function generateSiteWithTemplate(
  formData: FormData,
  aiContent: AIGeneratedContent,
  clientId: string
): Promise<GeneratedSite> {
  // 1. Récupérer le template
  const templateName = formData.template || 'default';
  const template = getTemplate(templateName);

  // 2. Préparer les services HTML
  const servicesHtml = aiContent.servicesContent
    .map(service => `
      <div class="service-card">
        <h3>${service.name}</h3>
        <p>${service.description}</p>
      </div>
    `)
    .join('');

  // 3. Générer les tags SEO
  const seoMeta = generateSEOMetadata('home', formData, aiContent);
  const seoTags = `
    <meta property="og:title" content="${seoMeta.title}">
    <meta property="og:description" content="${seoMeta.description}">
  `;

  // 4. Injecter le contenu
  const injectedHtml = injectTemplateContent(template.files['index.html'], {
    title: seoMeta.title,
    description: seoMeta.description,
    seo_tags: seoTags,
    business_name: formData.name,
    hero_title: aiContent.home.h1,
    hero_subtitle: aiContent.home.tagline,
    services_content: servicesHtml,
    about_content: aiContent.about.introduction,
    phone: formData.contact.phone,
    email: formData.contact.email,
    year: new Date().getFullYear().toString(),
  });

  // 5. Créer les fichiers
  return {
    clientId,
    formData,
    content: aiContent,
    pages: { home: injectedHtml, /* ... */ },
    files: [
      { path: 'index.html', content: injectedHtml },
      { path: 'styles.css', content: template.files['styles.css'] },
    ],
    createdAt: new Date(),
  };
}
```

### Compatibilité et Intégration

**Templates ✅ Compatibles avec** :
- ✅ **AI Provider** : Claude, Local, None (NO_AI mode)
- ✅ **SEO Boost** : Post-processing SEO appliqué normalement
- ✅ **Auto-Images** : Images générées et intégrées si configuré
- ✅ **AutoDeploy** : Déploiement vers Netlify, Vercel, FTP, Local
- ✅ **Multi-utilisateurs** : Isolation par `ownerId`
- ✅ **Dashboard** : Regénération et redéploiement supportés

**Différences avec système multi-page** :
- ❌ Pas de pages séparées (about.html, services.html, etc.)
- ✅ Fichiers générés : `index.html` + `styles.css` seulement
- ✅ Navigation smooth scroll (#services, #about, #contact)
- ✅ Plus léger et rapide à charger
- ✅ Mieux adapté pour artisans et professionnels

### Page Publique Templates

Une page marketing `/templates` affiche tous les templates disponibles :

**Fonctionnalités** :
- Affichage visuel de chaque template avec couleur
- Description et catégorie
- Liste des features incluses
- CTA vers création de site
- SEO optimisé

**Accès** : [http://localhost:3000/templates](http://localhost:3000/templates)

### Tests

```bash
# Tester le chargement des templates
npm run test:unit -- tests/unit/lib/templates/templates.test.ts

# Vérifier l'injection de contenu
npm run test:unit -- tests/unit/lib/generator.test.ts
```

### Exemples de Personnalisation CSS

#### Variables CSS

Tous les templates utilisent des variables CSS pour faciliter la personnalisation :

```css
:root {
    --primary-color: #0ea5e9;      /* Couleur principale */
    --primary-dark: #0284c7;       /* Variante sombre */
    --secondary-color: #f59e0b;    /* Couleur secondaire */
    --accent-color: #fbbf24;       /* Accent */
    --text-color: #1f2937;         /* Texte principal */
    --text-light: #6b7280;         /* Texte secondaire */
    --bg-light: #f9fafb;           /* Fond clair */
    --border-color: #e5e7eb;       /* Bordures */
}
```

#### Spécificités par Template

**Electrician** :
- Motif diagonal rayé dans le hero
- Border-top accent sur les cartes
- Navbar sombre (#1f2937)

**Plumber** :
- Palette cyan/aqua
- Border-left accent sur les cartes
- Border-bottom sur navbar

**Coach** :
- Tons chauds et motivants
- Border-radius arrondis (0.75rem)
- Box-shadows avec teinte orange

**Psychologist** :
- Formes très arrondies (border-radius: 1rem)
- Gradient radial dans hero
- Focus states avec glow violet

**Lawyer** :
- Font serif pour le body
- Accent doré (#d4af37)
- Border-left accent doré
- Footer avec border-top doré

### Roadmap

**À venir** :
- [ ] Éditeur visuel de templates
- [ ] Import/Export de templates personnalisés
- [ ] Marketplace de templates communautaires
- [ ] Preview temps réel des templates
- [ ] Personnalisation des couleurs par template
- [ ] Multi-langues dans les templates

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
