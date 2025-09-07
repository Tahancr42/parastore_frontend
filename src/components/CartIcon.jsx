import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartIcon = () => {
  const { user } = useAuth();
  const { getTotalItems } = useCart();

  if (!user) {
    return null; // Ne pas afficher l'icône si l'utilisateur n'est pas connecté
  }

  return (
    <Link to="/cart" className="relative group">
      <div className="p-2 text-emerald-600 hover:text-emerald-700 transition-colors">
        <svg 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
          />
        </svg>
        
        {/* Badge avec le nombre d'items */}
        {getTotalItems() > 0 && (
          <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg">
            {getTotalItems() > 99 ? '99+' : getTotalItems()}
          </span>
        )}
      </div>
      
      {/* Tooltip au survol */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-emerald-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
        🛒 Mon Panier ({getTotalItems()} produit{getTotalItems() !== 1 ? 's' : ''})
      </div>
    </Link>
  );
};

export default CartIcon;
