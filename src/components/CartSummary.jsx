import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const CartSummary = () => {
  const { cartItems, getTotalItems, getTotalPrice } = useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Panier</h3>
        <p className="text-gray-600 text-sm mb-3">Connectez-vous pour voir votre panier</p>
        <Link 
          to="/login" 
          className="block w-full bg-emerald-600 text-white text-center py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
        >
          Se connecter
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Panier</h3>
        <p className="text-gray-600 text-sm mb-3">Votre panier est vide</p>
        <Link 
          to="/products" 
          className="block w-full bg-emerald-600 text-white text-center py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
        >
          Voir les produits
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-emerald-200">
             <h3 className="text-lg font-bold text-emerald-700 mb-4 flex items-center">
         🛒 Résumé du panier
       </h3>
      
      {/* Liste des produits */}
      <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                 {cartItems.slice(0, 3).map((item) => (
           <div key={item.id} className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors duration-200">
                           <img 
                src={item.imageUrl || "/vitamine.jpg"} 
                alt={item.productName}
                className="w-12 h-12 object-cover rounded-lg border-2 border-emerald-200"
                onError={(e) => {
                  // Fallback vers une image par défaut si l'image ne charge pas
                  e.target.src = '/vitamine.jpg';
                }}
              />
                            <div className="flex-1 min-w-0">
                 <p className="text-gray-800 text-sm font-medium truncate">{item.productName}</p>
                 <p className="text-emerald-600 text-xs font-semibold">
                   {item.quantity} × {item.unitPrice} MAD
                 </p>
               </div>
               <span className="font-bold text-sm text-emerald-700">
                 {item.lineTotal.toFixed(2)} MAD
               </span>
           </div>
         ))}
        
                 {cartItems.length > 3 && (
           <p className="text-emerald-600 text-xs text-center py-2 bg-emerald-100 rounded-lg font-medium">
             +{cartItems.length - 3} autre(s) produit(s)
           </p>
         )}
      </div>

      {/* Total */}
      <div className="border-t-2 border-emerald-200 pt-4 mb-6">
        <div className="flex justify-between items-center mb-2">
                     <span className="text-emerald-700 text-sm font-medium">Total ({getTotalItems()} produit{getTotalItems() !== 1 ? 's' : ''})</span>
           <span className="text-lg font-bold text-emerald-800">{getTotalPrice().toFixed(2)} MAD</span>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Link 
          to="/cart" 
          className="block w-full bg-emerald-600 text-white text-center py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-md hover:shadow-lg"
        >
          🛒 Voir le panier
        </Link>
        
        <button 
          className="block w-full bg-emerald-700 text-white text-center py-3 px-4 rounded-lg hover:bg-emerald-800 transition-colors font-medium shadow-md hover:shadow-lg"
          onClick={() => {
            // TODO: Implémenter la logique de commande
            console.log('Passer la commande');
          }}
        >
          💳 Passer la commande
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
