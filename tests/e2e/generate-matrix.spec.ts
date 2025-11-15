/**
 * Test E2E : Génération automatique de 27 sites
 * Matrice : 3 activités × 3 villes × 3 styles = 27 sites
 */

import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { getAllCombinations, generateFormData } from '../fixtures/generation-matrix';

const ARTIFACTS_DIR = path.join(__dirname, '..', 'artifacts');
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// Créer le dossier artifacts s'il n'existe pas
if (!fs.existsSync(ARTIFACTS_DIR)) {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
}

test.describe('Génération de la matrice de 27 sites', () => {
  const combinations = getAllCombinations();

  for (const [index, config] of combinations.entries()) {
    test(`[${index + 1}/27] Générer ${config.activity} à ${config.city} - ${config.style}`, async ({
      request,
      page,
    }) => {
      const formData = generateFormData(config);

      // 1. Appel API de génération
      console.log(`\n🔄 Génération du site ${index + 1}/27:`);
      console.log(`   Activité: ${config.activity}`);
      console.log(`   Ville: ${config.city}`);
      console.log(`   Style: ${config.style}`);

      const response = await request.post(`${BASE_URL}/api/generate-site`, {
        data: formData,
        timeout: 120000, // 2 minutes
      });

      // 2. Vérifications de la réponse
      expect(response.status()).toBe(200);

      const result = await response.json();
      expect(result).toHaveProperty('clientId');
      expect(result).toHaveProperty('previewUrl');
      expect(result).toHaveProperty('zipUrl');

      const { clientId, previewUrl, zipUrl } = result;

      console.log(`   ✓ Client ID: ${clientId}`);
      console.log(`   ✓ Preview: ${previewUrl}`);
      console.log(`   ✓ ZIP: ${zipUrl}`);

      // 3. Créer le dossier pour cet artefact
      const artifactDir = path.join(ARTIFACTS_DIR, clientId);
      if (!fs.existsSync(artifactDir)) {
        fs.mkdirSync(artifactDir, { recursive: true });
      }

      // 4. Télécharger le ZIP et vérifier son contenu
      const zipResponse = await request.get(`${BASE_URL}${zipUrl}`);
      expect(zipResponse.status()).toBe(200);

      const zipBuffer = await zipResponse.body();
      const zipPath = path.join(artifactDir, 'site.zip');
      fs.writeFileSync(zipPath, zipBuffer);

      expect(fs.existsSync(zipPath)).toBeTruthy();
      const zipStats = fs.statSync(zipPath);
      expect(zipStats.size).toBeGreaterThan(1000); // Au moins 1KB

      console.log(`   ✓ ZIP téléchargé: ${(zipStats.size / 1024).toFixed(2)} KB`);

      // 5. Naviguer vers la preview et prendre un screenshot
      await page.goto(`${BASE_URL}${previewUrl}`, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });

      // Attendre que le contenu soit chargé
      await page.waitForSelector('h1', { timeout: 10000 });

      // Screenshot
      const screenshotPath = path.join(artifactDir, 'screenshot.png');
      await page.screenshot({
        path: screenshotPath,
        fullPage: false,
        clip: { x: 0, y: 0, width: 800, height: 600 },
      });

      console.log(`   ✓ Screenshot: ${screenshotPath}`);

      // 6. Vérification de lisibilité (détection blanc sur blanc)
      const readabilityCheck = await page.evaluate(() => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return { readable: true, warning: 'Cannot create canvas context' };

        // Échantillonner quelques pixels du body
        const body = document.body;
        const computedStyle = window.getComputedStyle(body);
        const bgColor = computedStyle.backgroundColor;
        const color = computedStyle.color;

        // Simple check: si background et color sont tous deux très clairs
        const isVeryLight = (colorStr: string): boolean => {
          const rgb = colorStr.match(/\d+/g);
          if (!rgb || rgb.length < 3) return false;
          const [r, g, b] = rgb.map(Number);
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          return luminance > 0.9;
        };

        const bgLight = isVeryLight(bgColor);
        const textLight = isVeryLight(color);

        if (bgLight && textLight) {
          return {
            readable: false,
            warning: `Possible white-on-white issue: bg=${bgColor}, color=${color}`,
          };
        }

        return { readable: true, warning: null };
      });

      if (!readabilityCheck.readable) {
        console.warn(`   ⚠️  Lisibilité: ${readabilityCheck.warning}`);
      } else {
        console.log(`   ✓ Lisibilité OK`);
      }

      // 7. Sauvegarder les métadonnées
      const metadata = {
        clientId,
        activity: config.activity,
        city: config.city,
        style: config.style,
        previewUrl,
        zipUrl,
        screenshot: `${clientId}/screenshot.png`,
        zipSize: zipStats.size,
        generatedAt: new Date().toISOString(),
        readability: readabilityCheck,
      };

      const metadataPath = path.join(artifactDir, 'metadata.json');
      fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

      console.log(`   ✓ Métadonnées sauvegardées`);
      console.log(`   ✅ Site ${index + 1}/27 généré avec succès\n`);
    });
  }

  test('Générer le fichier récapitulatif index.json', async () => {
    // Lire tous les dossiers d'artifacts
    const dirs = fs
      .readdirSync(ARTIFACTS_DIR)
      .filter((f) => fs.statSync(path.join(ARTIFACTS_DIR, f)).isDirectory());

    const generated = [];

    for (const dir of dirs) {
      const metadataPath = path.join(ARTIFACTS_DIR, dir, 'metadata.json');
      if (fs.existsSync(metadataPath)) {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
        generated.push(metadata);
      }
    }

    const index = {
      total: generated.length,
      generatedAt: new Date().toISOString(),
      generated: generated.sort((a, b) => {
        // Trier par activité, ville, style
        if (a.activity !== b.activity) return a.activity.localeCompare(b.activity);
        if (a.city !== b.city) return a.city.localeCompare(b.city);
        return a.style.localeCompare(b.style);
      }),
    };

    const indexPath = path.join(ARTIFACTS_DIR, 'index.json');
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));

    console.log(`\n📊 Récapitulatif:`);
    console.log(`   Total de sites générés: ${index.total}`);
    console.log(`   Fichier index: ${indexPath}`);

    expect(index.total).toBeGreaterThanOrEqual(27);
  });
});
