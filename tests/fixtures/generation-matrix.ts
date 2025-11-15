/**
 * Fixtures pour la matrice de génération de 27 sites E2E
 */

export const activities = ["Plombier", "Électricien", "Jardinier"];
export const cities = ["Braine-le-Comte", "Mons", "Nivelles"];
export const styles = ["moderne", "classique", "premium"] as const;

export const servicesBank = {
  Plombier: ["Fuites", "Chaudières", "Débouchage", "Rénovation salle de bain"],
  Électricien: ["Mise aux normes", "Parlophonie", "Éclairage LED", "Sécurité incendie"],
  Jardinier: ["Tonte", "Taille haies", "Élagage", "Plantation"],
};

export type Activity = typeof activities[number];
export type City = typeof cities[number];
export type Style = typeof styles[number];

export interface GenerationConfig {
  activity: Activity;
  city: City;
  style: Style;
}

/**
 * Génère toutes les combinaisons possibles
 */
export function getAllCombinations(): GenerationConfig[] {
  const combinations: GenerationConfig[] = [];

  for (const activity of activities) {
    for (const city of cities) {
      for (const style of styles) {
        combinations.push({ activity, city, style });
      }
    }
  }

  return combinations;
}

/**
 * Génère les données de formulaire pour une combinaison
 */
export function generateFormData(config: GenerationConfig) {
  const { activity, city, style } = config;
  const services = servicesBank[activity as keyof typeof servicesBank] || [];

  return {
    name: `${activity} Pro ${city}`,
    activity,
    city,
    zipCode: city === "Braine-le-Comte" ? "7090" : city === "Mons" ? "7000" : "1400",
    services,
    contact: {
      phone: "0477 12 34 56",
      email: `contact@${activity.toLowerCase()}-${city.toLowerCase().replace(/\s/g, '')}.be`,
      address: `Rue Exemple ${Math.floor(Math.random() * 100)}`,
    },
    style,
    colors: {
      primary: style === "moderne"
        ? { 600: "#0284c7", 700: "#0369a1" }
        : style === "classique"
        ? { 600: "#059669", 700: "#047857" }
        : { 600: "#7c3aed", 700: "#6d28d9" },
      secondary: { 600: "#ec4899", 700: "#db2777" },
    },
  };
}
