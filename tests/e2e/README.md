# Tests E2E - Matrice de Génération de 27 Sites

## Vue d'ensemble

Ce dossier contient une suite de tests end-to-end qui génère automatiquement **27 sites web complets** en testant toutes les combinaisons possibles de :

- **3 activités** : Plombier, Électricien, Jardinier
- **3 villes** : Braine-le-Comte, Mons, Nivelles
- **3 styles** : Moderne, Classique, Premium

**Total** : 3 × 3 × 3 = **27 sites générés**

## Structure

```
tests/
├── fixtures/
│   └── generation-matrix.ts    # Données de test (activités, villes, styles, services)
├── e2e/
│   ├── generate-matrix.spec.ts # Tests Playwright (génération des 27 sites)
│   ├── run-matrix.ts           # Orchestrateur (lance les tests + génère HTML)
│   └── README.md               # Ce fichier
└── artifacts/
    ├── .gitkeep
    ├── .gitignore
    ├── index.html              # Page récapitulative générée
    ├── index.json              # Données JSON des sites générés
    └── <clientId>/             # Un dossier par site généré
        ├── metadata.json       # Métadonnées du site
        ├── screenshot.png      # Capture d'écran 800×600
        └── site.zip            # Archive complète du site
```

## Utilisation

### Option 1 : Exécution manuelle des tests

```bash
# Lancer uniquement les tests Playwright
npm run test:matrix
```

Cette commande lance les tests mais ne génère pas la page HTML récapitulative.

### Option 2 : Exécution complète (recommandé)

```bash
# Lancer les tests ET générer la page HTML
npm run test:matrix:run
```

Cette commande :
1. Lance tous les tests Playwright
2. Génère automatiquement `tests/artifacts/index.html`
3. Affiche un récapitulatif dans la console

### Prérequis

Le serveur de développement doit être lancé avant d'exécuter les tests :

```bash
# Terminal 1 : Lancer le serveur
npm run dev

# Terminal 2 : Lancer la matrice de tests
npm run test:matrix:run
```

## Fonctionnalités

Chaque test effectue les vérifications suivantes :

1. ✅ **Appel API** : POST vers `/api/generate-site`
2. ✅ **Réponse valide** : Vérifie `clientId`, `previewUrl`, `zipUrl`
3. ✅ **Téléchargement ZIP** : Récupère et sauvegarde l'archive
4. ✅ **Screenshot** : Capture d'écran 800×600 du site généré
5. ✅ **Test de lisibilité** : Détecte les problèmes de contraste (blanc sur blanc)
6. ✅ **Métadonnées** : Sauvegarde JSON avec toutes les infos du site

## Vérification de lisibilité

Le test inclut une vérification automatique de la lisibilité des sites générés :

- Analyse de la luminance du fond et du texte
- Détection des problèmes de contraste (ex: texte blanc sur fond blanc)
- Alerte ⚠️ dans les logs et sur la page HTML si un problème est détecté

## Visualisation des résultats

Après l'exécution, ouvrez le fichier :

```
tests/artifacts/index.html
```

Cette page affiche :

- **Grille visuelle** des 27 sites avec screenshots
- **Boutons d'action** pour prévisualiser ou télécharger chaque site
- **Indicateurs** de lisibilité
- **Statistiques** globales

## Artefacts générés

Pour chaque site généré, vous trouverez :

```
tests/artifacts/<clientId>/
├── metadata.json       # Toutes les infos du site
├── screenshot.png      # Miniature visuelle
└── site.zip           # Archive téléchargeable
```

### Exemple de metadata.json

```json
{
  "clientId": "abc123",
  "activity": "Plombier",
  "city": "Braine-le-Comte",
  "style": "moderne",
  "previewUrl": "/preview/abc123/index.html",
  "zipUrl": "/downloads/abc123.zip",
  "screenshot": "abc123/screenshot.png",
  "zipSize": 45678,
  "generatedAt": "2025-01-15T10:30:00.000Z",
  "readability": {
    "readable": true,
    "warning": null
  }
}
```

## Dépannage

### Les tests échouent avec une erreur de timeout

**Solution** : Augmentez le timeout dans `generate-matrix.spec.ts` :

```typescript
const response = await request.post(`${BASE_URL}/api/generate-site`, {
  data: formData,
  timeout: 180000, // 3 minutes au lieu de 2
});
```

### Le serveur n'est pas accessible

**Vérification** :
```bash
curl http://localhost:3000
```

Si le serveur ne répond pas, lancez `npm run dev` avant les tests.

### Les screenshots sont vides

**Cause possible** : Le site met trop de temps à se charger.

**Solution** : Augmentez le timeout de navigation :

```typescript
await page.goto(`${BASE_URL}${previewUrl}`, {
  waitUntil: 'networkidle',
  timeout: 60000, // 1 minute
});
```

## Configuration avancée

### Personnaliser les combinaisons

Modifiez `tests/fixtures/generation-matrix.ts` :

```typescript
export const activities = ["Plombier", "Électricien", "Maçon"];
export const cities = ["Paris", "Lyon", "Marseille"];
export const styles = ["moderne", "vintage", "minimaliste"];
```

### Ajouter des services personnalisés

```typescript
export const servicesBank = {
  Plombier: ["Réparations", "Installations", "Urgences"],
  Électricien: ["Mise aux normes", "Domotique"],
  Maçon: ["Rénovation", "Construction"],
};
```

## CI/CD

Pour intégrer ces tests dans un pipeline CI/CD :

```yaml
# .github/workflows/e2e-matrix.yml
name: E2E Matrix Tests

on: [push, pull_request]

jobs:
  test-matrix:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run build
      - run: npm run dev &
      - run: npx wait-on http://localhost:3000
      - run: npm run test:matrix:run
      - uses: actions/upload-artifact@v3
        with:
          name: test-artifacts
          path: tests/artifacts/
```

## Performance

Temps estimé pour générer les 27 sites :

- **~3-5 minutes par site** (génération IA)
- **Total : 90-150 minutes** pour la matrice complète

💡 **Astuce** : Lancez les tests en parallèle avec Playwright pour gagner du temps :

```typescript
// Dans playwright.config.ts
export default defineConfig({
  workers: 3, // 3 tests en parallèle
});
```

## Licence

MIT
