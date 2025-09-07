import axios from '../axiosInstance';

export const messageApi = {
  // Envoyer un message (page Contact)
  sendMessage: async (messageData) => {
    const response = await axios.post('/api/messages', messageData);
    return response.data;
  },

  // Récupérer tous les messages (gestionnaire)
  getAllMessages: async () => {
    const response = await axios.get('/api/messages');
    return response.data;
  },

  // Récupérer les messages non lus (gestionnaire)
  getUnreadMessages: async () => {
    const response = await axios.get('/api/messages/unread');
    return response.data;
  },

  // Compter les messages non lus (gestionnaire)
  getUnreadCount: async () => {
    const response = await axios.get('/api/messages/count');
    return response.data;
  },

  // Récupérer un message par ID
  getMessageById: async (id) => {
    const response = await axios.get(`/api/messages/${id}`);
    return response.data;
  },

  // Marquer un message comme lu
  markAsRead: async (id) => {
    const response = await axios.patch(`/api/messages/${id}/read`);
    return response.data;
  },

  // Répondre à un message
  respondToMessage: async (id, responseText) => {
    const response = await axios.patch(`/api/messages/${id}/respond`, responseText, {
      headers: {
        'Content-Type': 'text/plain'
      }
    });
    return response.data;
  }
};
