import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useCartOperations } from '../hooks/useCartOperations';
import { orderApi } from '../api/orders';
import { toast } from 'react-toastify';

const Cart = () => {
  const { user } = useAuth();
  const { cartItems, loading, getTotalPrice } = useCart();
  const { updateQuantity, removeItem, clearCart } = useCartOperations();
  const [updating, setUpdating] = useState({});
  const [placingOrder, setPlacingOrder] = useState(false);

  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      setUpdating(prev => ({ ...prev, [cartItemId]: true }));
      const success = await updateQuantity(cartItemId, newQuantity);
      if (success) {
        // La mise à jour a réussi, pas besoin de faire autre chose
      }
    } finally {
      setUpdating(prev => ({ ...prev, [cartItemId]: false }));
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    await removeItem(cartItemId);
  };

  const handleClearCart = async () => {
    await clearCart();
  };

  const handlePlaceOrder = async () => {
    if (!user || cartItems.length === 0) return;
    
    try {
      setPlacingOrder(true);
      
      console.log('Tentative de passage de commande pour userId:', user.userId);
      console.log('Nombre d\'articles dans le panier:', cartItems.length);
      
      // Créer la commande depuis le panier
      const order = await orderApi.createOrderFromCart(user.userId);
      
      console.log('Commande créée avec succès:', order);
      
      // Vider le panier après commande réussie (sans confirmation)
      await clearCart(false);
      
      toast.success('Commande passée avec succès ! Votre commande est en cours de traitement.');
      
      // Rediriger vers une page de confirmation ou les produits
      window.location.href = '/products';
      
    } catch (error) {
      console.error('Erreur lors du passage de commande:', error);
      console.error('Détails de l\'erreur:', error.response?.data);
      console.error('Status code:', error.response?.status);
      
      if (error.response?.status === 400) {
        toast.error('Erreur de validation. Vérifiez que votre panier n\'est pas vide.');
      } else if (error.response?.status === 401) {
        toast.error('Vous devez être connecté pour passer une commande.');
      } else if (error.response?.status === 403) {
        toast.error('Accès refusé. Vérifiez vos permissions.');
      } else {
        toast.error('Erreur lors du passage de commande. Veuillez réessayer.');
      }
    } finally {
      setPlacingOrder(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Connexion requise</h2>
          <p className="text-gray-600">Veuillez vous connecter pour voir votre panier</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du panier...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-emerald-200">
          {/* Header du panier */}
                     <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-6">
             <h1 className="text-2xl font-bold text-white mb-2">🛒 Mon Panier</h1>
             <p className="text-emerald-100 text-base">
               {cartItems.length} produit{cartItems.length !== 1 ? 's' : ''} dans votre panier
             </p>
           </div>

          {cartItems.length === 0 ? (
                          <div className="p-12 text-center">
                <div className="text-emerald-300 mb-6">
                  <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                                 <h3 className="text-xl font-bold text-gray-800 mb-3">Votre panier est vide</h3>
                 <p className="text-gray-600 text-base mb-6">Commencez à ajouter des produits pour voir votre panier ici</p>
                <button
                  onClick={() => window.location.href = '/products'}
                  className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-emerald-700 hover:shadow-xl hover:scale-105 transition-all duration-200"
                >
                  Découvrir nos produits
                </button>
              </div>
          ) : (
            <>
              {/* Liste des produits */}
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 flex items-center space-x-4 hover:bg-emerald-50 transition-colors duration-200">
                    {/* Image du produit */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.imageUrl || "/vitamine.jpg"}
                        alt={item.productName}
                        className="h-24 w-24 object-cover rounded-xl shadow-md border-2 border-emerald-100"
                        onError={(e) => {
                          // Fallback vers une image par défaut si l'image ne charge pas
                          e.target.src = '/vitamine.jpg';
                        }}
                      />
                    </div>

                    {/* Informations du produit */}
                    <div className="flex-1 min-w-0">
                                             <h3 className="text-lg font-bold text-gray-800 mb-2">
                         {item.productName}
                       </h3>
                       <p className="text-base font-semibold text-emerald-600">
                         {item.unitPrice} MAD
                       </p>
                       <p className="text-xs text-gray-500">
                         Prix unitaire
                       </p>
                    </div>

                    {/* Contrôles de quantité */}
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1 || updating[item.id]}
                        className="p-3 rounded-full bg-emerald-100 hover:bg-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed text-emerald-700 transition-colors duration-200"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      
                                             <span className="text-lg font-bold text-emerald-700 min-w-[3rem] text-center bg-emerald-50 px-3 py-2 rounded-lg">
                         {item.quantity}
                       </span>
                      
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={updating[item.id]}
                        className="p-3 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-700 transition-colors duration-200"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>

                    {/* Prix total pour cet item */}
                    <div className="text-right">
                                                                    <p className="text-lg font-bold text-emerald-700 mb-1">
                         {item.lineTotal.toFixed(2)} MAD
                       </p>
                       <p className="text-xs text-gray-500">
                         Total
                       </p>
                    </div>

                    {/* Bouton supprimer */}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors duration-200"
                      title="Retirer du panier"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Résumé et actions */}
              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 px-8 py-6 border-t-2 border-emerald-200">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={handleClearCart}
                    className="text-red-600 hover:text-red-800 font-medium hover:bg-red-50 px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    🗑️ Vider le panier
                  </button>
                  
                  <div className="text-right">
                                         <p className="text-base text-emerald-700 font-medium">Total de la commande</p>
                     <p className="text-2xl font-bold text-emerald-800">
                       {getTotalPrice().toFixed(2)} MAD
                     </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => window.location.href = '/products'}
                    className="flex-1 bg-white border-2 border-emerald-600 text-emerald-600 py-4 px-6 rounded-xl font-semibold hover:bg-emerald-50 hover:border-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    🛍️ Continuer les achats
                  </button>
                  
                  <button
                    onClick={handlePlaceOrder}
                    disabled={placingOrder}
                    className="flex-1 bg-emerald-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-emerald-700 hover:shadow-xl transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {placingOrder ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Traitement...
                      </div>
                    ) : (
                      '💳 Passer la commande'
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
