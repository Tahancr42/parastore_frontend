import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getCartApi } from '../api/cart';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Charger le panier quand l'utilisateur change
  useEffect(() => {
    if (user?.userId) {
      loadCart();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const loadCart = async () => {
    if (!user?.userId) return;
    
    try {
      setLoading(true);
      const data = await getCartApi(user.userId);
      setCartItems(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement du panier:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculer le nombre total d'items dans le panier
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculer le prix total du panier
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.lineTotal;
    }, 0);
  };

  // Vérifier si un produit est dans le panier
  const isProductInCart = (productId) => {
    return cartItems.some(item => item.productId === productId);
  };

  // Obtenir la quantité d'un produit dans le panier
  const getProductQuantity = (productId) => {
    const item = cartItems.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  };

  // Mettre à jour le panier (appelé après ajout/modification/suppression)
  const refreshCart = () => {
    loadCart();
  };

  const value = {
    cartItems,
    loading,
    getTotalItems,
    getTotalPrice,
    isProductInCart,
    getProductQuantity,
    refreshCart,
    loadCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart doit être utilisé dans un CartProvider');
  }
  return context;
}
