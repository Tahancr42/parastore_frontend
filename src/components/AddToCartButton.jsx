import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCartOperations } from '../hooks/useCartOperations';

const AddToCartButton = ({ product, onCartUpdate }) => {
  const { user } = useAuth();
  const { addToCart, loading } = useCartOperations();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    const success = await addToCart(product.id, quantity);
    
    if (success) {
      // Réinitialiser la quantité
      setQuantity(1);
      
      // Notifier le composant parent si nécessaire
      if (onCartUpdate) {
        onCartUpdate();
      }
    }
  };

  if (!user) {
    return (
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-2">Connectez-vous pour ajouter au panier</p>
        <button
          disabled
          className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed"
        >
          Ajouter au panier
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Sélecteur de quantité */}
      <div className="flex items-center justify-center space-x-2">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
          className="p-1 rounded-full bg-emerald-100 hover:bg-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed text-emerald-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        
        <span className="text-lg font-medium text-gray-900 min-w-[2rem] text-center">
          {quantity}
        </span>
        
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="p-1 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Bouton d'ajout au panier */}
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
          loading
            ? 'bg-emerald-400 text-white cursor-not-allowed'
            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Ajout en cours...</span>
          </div>
        ) : (
                     `Ajouter au panier - ${(product.price * quantity).toFixed(2)} MAD`
        )}
      </button>
    </div>
  );
};

export default AddToCartButton;
