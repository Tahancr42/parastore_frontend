import { FaShieldAlt } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { themeColors, componentClasses } from '../constants/colors';

export default function Home() {
  const { user } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);

  // Afficher le message de bienvenue si l'utilisateur vient de se connecter
  useEffect(() => {
    if (user) {
      setShowWelcome(true);
      // Masquer le message après 5 secondes
      const timer = setTimeout(() => setShowWelcome(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <>
      {/* Message de bienvenue */}
      {showWelcome && user && (
        <div className="bg-emerald-500 text-white py-4 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-2">
              🎉 Bienvenue {user.email} !
            </h2>
            <p className="text-emerald-100">
              Vous êtes maintenant connecté. Profitez de nos produits et services !
            </p>
          </div>
        </div>
      )}

      {/* Partie d'Accueil */}
      <section className="bg-emerald-50 py-16 px-6 md:px-20">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          {/* Texte */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
              Simplifiez vos achats en ligne <br />
              avec <span className="text-emerald-500">Parastore</span>
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              Notre parapharmacie en ligne vous permet de commander facilement vos produits préférés sans vous déplacer. Livraison rapide et gratuite.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => {
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-emerald-600 text-white px-6 py-3 rounded-full shadow hover:bg-emerald-700 hover:shadow-lg hover:scale-105 transition-transform duration-200"
              >
                Nos Services
              </button>

              <button
                onClick={() => window.location.href = "/products"}
                className="bg-white border border-emerald-600 text-emerald-600 px-6 py-3 rounded-full hover:bg-emerald-50 shadow hover:shadow-lg hover:scale-105 transition-transform duration-200"
              >
                Commander
              </button>
            </div>
          </div>

          {/* Illustration */}
          <div className="md:w-1/2">
            <div className="relative">
              <div className="bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-3xl p-2 sm:p-4 md:p-6">
                <img
                  src="/para.jpg"
                  alt="Produits parapharmaceutiques"
                  className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-2xl"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-2xl shadow-xl flex items-center space-x-2">
                <FaShieldAlt className="text-emerald-600 w-5 h-5" />
                <span className="font-semibold text-gray-900 text-sm">Qualité garantie</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-wide">
            Pourquoi choisir <span className="text-emerald-600">Parastore</span> ?
          </h2>
          <p className="text-gray-600 mb-12 text-lg max-w-3xl mx-auto">
            Nous nous engageons à vous offrir la meilleure expérience d'achat en ligne avec des produits de qualité et un service client exceptionnel.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 - Livraison */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-transparent hover:border-emerald-500 transition-all">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Livraison Gratuite</h3>
              <p className="text-gray-600 text-sm">
                Livraison gratuite partout le Maroc en 24-48h
              </p>
            </div>

            {/* Service 2 - Conseils */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-transparent hover:border-emerald-500 transition-all">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Conseils Santé</h3>
              <p className="text-gray-600 text-sm">
                Des conseils adaptés à vos besoins spécifiques
              </p>
            </div>

            {/* Service 3 - Paiement */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-emerald-500 transition-all">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Paiement Sécurisé</h3>
              <p className="text-gray-600 text-sm">
                Toutes les transactions sont protégées avec cryptage SSL
              </p>
            </div>

            {/* Service 4 - Produits Certifiés */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-transparent hover:border-emerald-500 transition-all">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Produits Certifiés</h3>
              <p className="text-gray-600 text-sm">
                Tous nos produits sont approuvés par les autorités sanitaires
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-emerald-500 to-emerald-500 text-white py-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Offre spéciale d'été !</h2>
        <p className="text-lg">Jusqu'à <span className="font-semibold">-30%</span> sur les soins du visage.</p>
      </section>

      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">Explorez nos Catégories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { label: "Soins du visage", icon: "🧴", query: "visage" },
            { label: "Compléments alimentaires", icon: "💊", query: "bienetre" },
            { label: "Hygiène corporelle", icon: "🧼", query: "hygiene" },
          ].map((cat, i) => (
            <div
              key={i}
              className="bg-emerald-50 p-6 rounded shadow hover:shadow-md hover:bg-emerald-100 cursor-pointer transition-all border-2 border-transparent hover:border-emerald-300"
              onClick={() => (window.location.href = `/products?category=${cat.query}`)}
            >
              <div className="text-4xl mb-4">{cat.icon}</div>
              <h3 className="text-lg font-semibold">{cat.label}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-emerald-50 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">Avis de nos Utilisateurs</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              name: "Leila - Agadir",
              text: "Livraison rapide et produits de qualité. Je recommande vivement !",
            },
            {
              name: "Youssef - Casablanca",
              text: "Navigation simple, commande facile, service client au top.",
            },
            {
              name: "Nadia - Marrakech",
              text: "Parfait pour trouver mes compléments sans me déplacer.",
            },
          ].map((avis, i) => (
            <div key={i} className="bg-white shadow-md p-6 rounded border-l-4 border-emerald-500 hover:shadow-lg transition-all">
              <p className="text-gray-700 italic mb-4">"{avis.text}"</p>
              <p className="font-semibold text-emerald-500">⭐️⭐️⭐️⭐️⭐️</p>
              <p className="text-gray-500 text-sm mt-2">{avis.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">Conseils Santé</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Pourquoi prendre du magnésium ?",
              desc: "Découvrez les bienfaits du magnésium sur le stress et la fatigue.",
              icon: (
                // Icône pilule
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="8" width="13" height="7" rx="3.5" />
                  <path d="M14 8l7 7" />
                </svg>
              )
            },
            {
              title: "Bien hydrater sa peau",
              desc: "Nos conseils pour une peau douce et bien nourrie toute l'année.",
              icon: (
                // Icône goutte d'eau
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3C12 3 7 8.5 7 13a5 5 0 0010 0c0-4.5-5-10-5-10z" />
                </svg>
              )
            },
            {
              title: "Les probiotiques : alliés digestifs",
              desc: "Améliorez votre flore intestinale avec des produits adaptés.",
              icon: (
                // Icône intestin stylisé (ou capsule)
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="7" y="7" width="10" height="10" rx="5" />
                  <path d="M12 7v10" />
                </svg>
              )
            }
          ].map((post, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg border-2 border-transparent hover:border-emerald-500 transition-all">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-100 to-blue-100 rounded-2xl flex items-center justify-center">
                  {post.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
              <p className="text-gray-600 text-sm">{post.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 bg-emerald-100">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Nos Marques partenaires</h2>
        <div className="flex flex-wrap justify-center gap-10 items-center">
          {["/eucerin.svg", "/nuxe.png", "/vichy.png", "/bioderma.png", "/la-roche.png"].map((src, i) => (
            <img key={i} src={src} alt="Marque" className="h-12  hover:grayscale-0 transition" />
          ))}
        </div>
      </section>

      <section className="bg-emerald-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Questions Fréquentes</h2>
          <div className="space-y-6">
            {[
              {
                q: "Quels sont les délais de livraison ?",
                a: "Nous livrons partout au Maroc en 24h à 48h.",
              },
              {
                q: "Comment puis-je payer ?",
                a: "Par carte bancaire, PayPal ou paiement à la livraison.",
              },
              {
                q: "Puis-je retourner un produit ?",
                a: "Oui, dans un délai de 7 jours si le produit est scellé.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-emerald-700 mb-2">{item.q}</h3>
                <p className="text-gray-700">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



    </>
  );
}
