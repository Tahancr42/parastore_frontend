import React from 'react';
import { useAuth } from '../context/AuthContext';
import AddToCartButton from '../components/AddToCartButton';
import CartSummary from '../components/CartSummary';

const TestCart = () => {
  const { user } = useAuth();

  // Produits fictifs pour tester avec vraies informations et prix en MAD
  const testProducts = [
    {
      id: 1,
      name: 'Vitamine C 1000mg - Immunité',
      price: 120.00,
      description: 'Vitamine C naturelle pour renforcer l\'immunité et combattre la fatigue',
      imageUrl: '/vitamine.jpg'
    },
    {
      id: 2,
      name: 'Oméga-3 1000mg - Santé cardiovasculaire',
      price: 180.00,
      description: 'Acides gras essentiels pour la santé du cœur et du cerveau',
      imageUrl: '/oenobiol.jpg'
    },
    {
      id: 3,
      name: 'Magnésium 400mg - Relaxation musculaire',
      price: 95.00,
      description: 'Minéral essentiel pour la relaxation musculaire et la gestion du stress',
      imageUrl: '/zohi_sommeil.jpg'
    },
    {
      id: 4,
      name: 'Probiotiques 10 souches - Flore intestinale',
      price: 220.00,
      description: 'Soutient la santé digestive et renforce le système immunitaire',
      imageUrl: '/oenobiol.jpg'
    },
    {
      id: 5,
      name: 'Collagène marin - Anti-âge',
      price: 350.00,
      description: 'Préserve la jeunesse de la peau et la santé des articulations',
      imageUrl: '/serum_roche.jpg'
    },
    {
      id: 6,
      name: 'Lipikar Lait Urea 5+',
      price: 226.00,
      description: 'La Roche-Posay Lipikar Lait Urea 5+ Peau Sensible Très Sèche | 400ml',
      imageUrl: '/atoderm_in.jpg'
    },
    {
      id: 7,
      name: 'Bioderma Atoderm Intensive',
      price: 220.00,
      description: 'BIODERMA ATODERM INTENSIVE Gel Crème 200 ML Ultra apaisant',
      imageUrl: '/atoderm_in.jpg'
    },
    {
      id: 8,
      name: 'Vitamine D3 2000UI - Os et immunité',
      price: 145.00,
      description: 'Vitamine D3 pour renforcer les os et le système immunitaire',
      imageUrl: '/vitamine.jpg'
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Connexion requise</h2>
          <p className="text-gray-600">Veuillez vous connecter pour tester le panier</p>
        </div>
      </div>
    );
  }

  return (
         <div className="min-h-screen bg-emerald-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
                 <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
           Test du Système de Panier
         </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des produits */}
          <div className="lg:col-span-2">
                         <h2 className="text-xl font-semibold text-gray-800 mb-6">Produits de test</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testProducts.map((product) => (
                                 <div key={product.id} className="bg-white rounded-lg shadow-lg p-6 border-2 border-transparent hover:border-emerald-300 transition-all duration-300">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                                     <h3 className="text-base font-semibold text-gray-800 mb-2">{product.name}</h3>
                   <p className="text-gray-600 text-xs mb-3">{product.description}</p>
                   <p className="text-lg font-bold text-emerald-600 mb-4">{product.price} MAD</p>
                  <AddToCartButton product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Résumé du panier */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>

                 {/* Instructions */}
         <div className="mt-12 bg-emerald-50 rounded-lg p-6 border-2 border-emerald-200">
           <h3 className="text-base font-semibold text-emerald-800 mb-3">📋 Instructions de test :</h3>
           <ul className="text-emerald-700 text-sm space-y-2">
            <li>• Ajoutez des produits au panier en utilisant les boutons ci-dessus</li>
            <li>• Vérifiez que le compteur du panier dans le header se met à jour</li>
            <li>• Cliquez sur l'icône du panier pour voir la page complète</li>
            <li>• Testez la modification des quantités et la suppression d'items</li>
            <li>• Vérifiez que le prix total se calcule correctement</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestCart;
