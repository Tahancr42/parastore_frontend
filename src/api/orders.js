import axios from '../axiosInstance';

export const orderApi = {
  // Créer une commande depuis le panier
  createOrderFromCart: async (userId) => {
    const response = await axios.post(`/api/orders/from-cart/${userId}`);
    return response.data;
  },

  // Récupérer toutes les commandes (admin/gestionnaire)
  getAllOrders: async () => {
    const response = await axios.get('/api/orders');
    return response.data;
  },

  // Récupérer les commandes d'un utilisateur
  getOrdersByUser: async (userId) => {
    const response = await axios.get(`/api/orders/by-user/${userId}`);
    return response.data;
  },

  // Récupérer une commande par ID
  getOrderById: async (orderId) => {
    const response = await axios.get(`/api/orders/${orderId}`);
    return response.data;
  },

  // Mettre à jour le statut d'une commande
  updateOrderStatus: async (orderId, status) => {
    const response = await axios.patch(`/api/orders/${orderId}/status?status=${status}`);
    return response.data;
  },

  // Supprimer une commande
  deleteOrder: async (orderId) => {
    await axios.delete(`/api/orders/${orderId}`);
  }
};
