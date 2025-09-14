import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-50 to-emerald-100 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            À propos de <span className="text-emerald-600">Parastore</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Votre parapharmacie en ligne de confiance, au service de votre santé et de votre bien-être depuis 2025.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-3xl p-4 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="/para2.jpg"
                    alt="Notre équipe Parastore"
                    className="w-full h-80 object-cover rounded-2xl"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="bg-emerald-100 p-2 rounded-full">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-900">Équipe certifiée</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Notre Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Chez <strong className="text-emerald-600">Parastore</strong>, nous nous engageons à rendre les produits de parapharmacie
                accessibles à tous, avec des conseils fiables, une livraison rapide, et un service client à l'écoute.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Nous croyons que la santé et le bien-être doivent être simples, sécurisés et accessibles en ligne.
                Notre équipe de pharmaciens est là pour vous accompagner dans vos choix.
              </p>
              <button className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-emerald-700 hover:shadow-xl hover:scale-105 transition-all duration-200">
                <Link to="/products" className="text-white">Découvrir nos produits</Link>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs Section */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Nos Valeurs Fondamentales</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Ces principes guident chacune de nos actions pour vous offrir le meilleur service possible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-transparent hover:border-emerald-500 transition-all">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-100 to-blue-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Qualité</h3>
              <p className="text-gray-600 text-center">
                Tous nos produits sont sélectionnés auprès de laboratoires reconnus pour leur sérieux et leur efficacité.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-transparent hover:border-emerald-500 transition-all">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-100 to-blue-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Transparence</h3>
              <p className="text-gray-600 text-center">
                Nous vous informons clairement sur les composants, les prix et l'origine des produits.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-transparent hover:border-emerald-500 transition-all">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-100 to-blue-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Écoute</h3>
              <p className="text-gray-600 text-center">
                Notre service client est à votre disposition pour toute question ou recommandation personnalisée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pourquoi nous faire confiance ?</h2>
            <p className="text-emerald-100 text-lg">
              Des chiffres qui parlent d'eux-mêmes
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-emerald-100">Utilisateurs satisfaits</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24h</div>
              <div className="text-emerald-100">Livraison express</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-emerald-100">Produits certifiés</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-emerald-100">Support client</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Prêt à commencer ?</h2>
          <p className="text-gray-600 text-lg mb-8">
            Rejoignez nos milliers de clients satisfaits et découvrez la différence Parastore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-emerald-700 hover:shadow-xl hover:scale-105 transition-all duration-200">
              <Link to="/products" className="text-white">Voir nos produits</Link>
            </button>
            <button className="bg-white border-2 border-emerald-600 text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-all duration-200">
              <Link to="/contact">Nous contacter</Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
