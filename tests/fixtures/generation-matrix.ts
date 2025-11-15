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
    name: `${activity} ${city}`,
    activity,
    city,
    zipCode: "7100",
    description: `${activity} professionnel à ${city}.`,
    services: services.slice(0, 3),
    contact: {
      phone: "+32 470 00 00 00",
      email: "contact@" + activity.toLowerCase() + ".test",
      address: "Rue du Test 123"
    },
    colors: {
      primary: "#1E40AF",
      secondary: "#60A5FA"
    },
    style
  };
}
