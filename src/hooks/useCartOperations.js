import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { 
  addToCartApi, 
  updateItemQtyApi, 
  removeItemApi, 
  clearCartApi 
} from '../api/cart';
import { toast } from 'react-toastify';

export const useCartOperations = () => {
  const { user } = useAuth();
  const { refreshCart } = useCart();
  const [loading, setLoading] = useState(false);

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      toast.error('Veuillez vous connecter pour ajouter des produits au panier');
      return false;
    }

    if (quantity < 1) {
      toast.error('Quantité invalide');
      return false;
    }

    try {
      setLoading(true);
      await addToCartApi({
        userId: user.userId,
        productId,
        quantity
      });
      
      toast.success(`${quantity} ${quantity > 1 ? 'produits ajoutés' : 'produit ajouté'} au panier !`);
      refreshCart();
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
      toast.error('Erreur lors de l\'ajout au panier');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    if (!user) {
      toast.error('Utilisateur non connecté');
      return false;
    }

    if (newQuantity < 1) {
      toast.error('Quantité invalide');
      return false;
    }

    try {
      setLoading(true);
      await updateItemQtyApi({ 
        cartItemId, 
        userId: user.userId, 
        quantity: newQuantity 
      });
      
      toast.success('Quantité mise à jour');
      refreshCart();
      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast.error('Erreur lors de la mise à jour de la quantité');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (cartItemId) => {
    if (!user) {
      toast.error('Utilisateur non connecté');
      return false;
    }

    try {
      setLoading(true);
      await removeItemApi({ cartItemId, userId: user.userId });
      
      toast.success('Produit retiré du panier');
      refreshCart();
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error('Erreur lors de la suppression du produit');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async (showConfirmation = true) => {
    if (!user) {
      toast.error('Utilisateur non connecté');
      return false;
    }

    if (showConfirmation && !window.confirm('Êtes-vous sûr de vouloir vider le panier ?')) {
      return false;
    }

    try {
      setLoading(true);
      await clearCartApi(user.userId);
      
      if (showConfirmation) {
        toast.success('Panier vidé');
      }
      refreshCart();
      return true;
    } catch (error) {
      console.error('Erreur lors du vidage du panier:', error);
      toast.error('Erreur lors du vidage du panier');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart
  };
};
