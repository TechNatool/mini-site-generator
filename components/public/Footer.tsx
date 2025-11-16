import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-white text-xl font-bold mb-4">Mini Site Generator</h3>
            <p className="text-sm text-gray-400">
              Générateur de sites web propulsé par l'IA pour artisans et PME.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Produit</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/features" className="hover:text-white transition-colors">
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/dashboard/register" className="hover:text-white transition-colors">
                  Créer un compte
                </Link>
              </li>
              <li>
                <Link href="/dashboard/login" className="hover:text-white transition-colors">
                  Se connecter
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Ressources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="https://github.com/anthropics/claude-code" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#support" className="hover:text-white transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Entreprise</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  À propos
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">
                  Confidentialité
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors">
                  Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Mini Site Generator. Tous droits réservés.</p>
          <p className="mt-2">Propulsé par Claude AI (Anthropic)</p>
        </div>
      </div>
    </footer>
  );
}
