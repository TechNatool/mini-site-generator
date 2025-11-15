#!/usr/bin/env node
/**
 * Orchestrateur de tests E2E : Génération de 27 sites
 * Lance Playwright et génère la page récapitulative HTML
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

const execAsync = promisify(exec);

const ARTIFACTS_DIR = path.join(__dirname, '..', 'artifacts');
const INDEX_JSON_PATH = path.join(ARTIFACTS_DIR, 'index.json');
const INDEX_HTML_PATH = path.join(ARTIFACTS_DIR, 'index.html');

/**
 * Lance les tests Playwright
 */
async function runPlaywrightTests() {
  console.log('🚀 Lancement des tests de génération de la matrice...\n');

  try {
    const { stdout, stderr } = await execAsync(
      'npx playwright test tests/e2e/generate-matrix.spec.ts --reporter=list',
      { maxBuffer: 10 * 1024 * 1024 } // 10MB buffer
    );

    console.log(stdout);
    if (stderr) console.error(stderr);

    console.log('\n✅ Tests terminés avec succès\n');
    return true;
  } catch (error: any) {
    console.error('❌ Erreur lors de l\'exécution des tests:', error.message);
    if (error.stdout) console.log(error.stdout);
    if (error.stderr) console.error(error.stderr);
    return false;
  }
}

/**
 * Génère la page HTML récapitulative
 */
function generateIndexHTML() {
  console.log('📄 Génération de la page récapitulative HTML...');

  if (!fs.existsSync(INDEX_JSON_PATH)) {
    console.error('❌ Fichier index.json non trouvé. Les tests ont-ils été exécutés ?');
    return false;
  }

  const indexData = JSON.parse(fs.readFileSync(INDEX_JSON_PATH, 'utf-8'));

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Matrice de Génération - 27 Sites</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
    }
  </style>
</head>
<body class="bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Header -->
    <header class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">
        Matrice de Génération de Sites
      </h1>
      <p class="text-lg text-gray-600">
        ${indexData.total} sites générés automatiquement
      </p>
      <p class="text-sm text-gray-500">
        Généré le ${new Date(indexData.generatedAt).toLocaleString('fr-FR')}
      </p>
    </header>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="text-3xl font-bold text-blue-600">${indexData.total}</div>
        <div class="text-gray-600">Sites générés</div>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <div class="text-3xl font-bold text-green-600">3×3×3</div>
        <div class="text-gray-600">Activités × Villes × Styles</div>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <div class="text-3xl font-bold text-purple-600">100%</div>
        <div class="text-gray-600">Taux de réussite</div>
      </div>
    </div>

    <!-- Grille des sites -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${indexData.generated
        .map(
          (site: any) => `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <!-- Screenshot -->
          <div class="relative aspect-video bg-gray-200">
            <img
              src="${site.screenshot}"
              alt="${site.activity} - ${site.city}"
              class="w-full h-full object-cover"
              onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22%3E%3Crect fill=%22%23ddd%22 width=%22800%22 height=%22600%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 fill=%22%23999%22%3EScreenshot indisponible%3C/text%3E%3C/svg%3E'"
            />
            ${
              site.readability && !site.readability.readable
                ? `
            <div class="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
              ⚠️ Lisibilité
            </div>
            `
                : ''
            }
          </div>

          <!-- Info -->
          <div class="p-4">
            <h3 class="text-lg font-bold text-gray-900 mb-1">
              ${site.activity} à ${site.city}
            </h3>
            <p class="text-sm text-gray-600 mb-3">
              Style: <span class="font-semibold capitalize">${site.style}</span>
            </p>

            <div class="text-xs text-gray-500 mb-3">
              <div>ID: ${site.clientId}</div>
              <div>Taille: ${(site.zipSize / 1024).toFixed(2)} KB</div>
            </div>

            <!-- Actions -->
            <div class="flex gap-2">
              <a
                href="${site.previewUrl}"
                target="_blank"
                class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded text-sm font-semibold transition-colors"
              >
                👁️ Prévisualiser
              </a>
              <a
                href="${site.zipUrl}"
                download
                class="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded text-sm font-semibold transition-colors"
              >
                📦 Télécharger
              </a>
            </div>
          </div>
        </div>
      `
        )
        .join('')}
    </div>

    <!-- Footer -->
    <footer class="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
      <p class="text-sm">
        Générateur de Mini-Sites - Matrice E2E de test
      </p>
      <p class="text-xs mt-2">
        Généré automatiquement via Playwright
      </p>
    </footer>
  </div>
</body>
</html>`;

  fs.writeFileSync(INDEX_HTML_PATH, html);
  console.log(`✅ Page HTML générée: ${INDEX_HTML_PATH}\n`);

  return true;
}

/**
 * Main
 */
async function main() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  MATRICE DE GÉNÉRATION E2E - 27 SITES');
  console.log('═══════════════════════════════════════════════════════\n');

  // Créer le dossier artifacts si nécessaire
  if (!fs.existsSync(ARTIFACTS_DIR)) {
    fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
  }

  // 1. Lancer les tests
  const testsSuccess = await runPlaywrightTests();

  if (!testsSuccess) {
    console.error('❌ Les tests ont échoué. Arrêt de l\'orchestrateur.\n');
    process.exit(1);
  }

  // 2. Générer la page HTML
  const htmlSuccess = generateIndexHTML();

  if (!htmlSuccess) {
    console.error('❌ Impossible de générer la page HTML.\n');
    process.exit(1);
  }

  // 3. Afficher le récapitulatif
  console.log('═══════════════════════════════════════════════════════');
  console.log('  ✅ MATRICE DE GÉNÉRATION TERMINÉE');
  console.log('═══════════════════════════════════════════════════════\n');
  console.log(`📊 Résultats:`);
  console.log(`   - JSON: ${INDEX_JSON_PATH}`);
  console.log(`   - HTML: ${INDEX_HTML_PATH}`);
  console.log(`   - Artefacts: ${ARTIFACTS_DIR}\n`);
  console.log('💡 Pour visualiser: ouvrez tests/artifacts/index.html\n');
}

main().catch((error) => {
  console.error('❌ Erreur fatale:', error);
  process.exit(1);
});
