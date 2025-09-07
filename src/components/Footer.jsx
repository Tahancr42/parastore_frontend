import React from "react";

export default function Footer() {
  return (
    <footer className="bg-emerald-800 text-emerald-100 pt-10 pb-6 px-6">
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center text-center">
    {/* À propos */}
    <div>
      <h3 className="text-lg font-semibold mb-4 text-emerald-600">À propos</h3>
      <p className="text-sm">
        Notre parapharmacie en ligne vous propose une large gamme de produits de qualité pour votre bien-être et santé, livrés chez vous en toute sécurité.
      </p>
    </div>
    {/* Liens utiles */}
    <div>
      <h3 className="text-lg font-semibold mb-4 text-emerald-600">Liens utiles</h3>
      <ul className="text-sm space-y-2">
        <li><a href="/" className="hover:text-white">Accueil</a></li>
        <li><a href="/products" className="hover:text-white">Nos Produits</a></li>
      </ul>
    </div>
    {/* Contact */}
    <div>
      <h3 className="text-lg font-semibold mb-4 text-emerald-600">Contact</h3>
      <ul className="text-sm space-y-2">
        <li>📍 Tassila, Agadir, Maroc</li>
        <li>📞 +212 6 12 34 56 78</li>
        <li>✉️ contact@parastore.ma</li>
      </ul>
    </div>
  </div>
  {/* Bas de page */}
        <div className="mt-10 border-t border-emerald-700 pt-4 text-center text-sm text-emerald-300">
    &copy; {new Date().getFullYear()} ParaStore. Tous droits réservés.
  </div>
</footer>
  );
}
