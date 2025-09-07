import axios from '../axiosInstance';

export const productApi = {
  // Récupérer tous les produits
  getAllProducts: async () => {
    const response = await axios.get('/api/products');
    return response.data;
  },

  // Récupérer un produit par ID
  getProductById: async (id) => {
    const response = await axios.get(`/api/products/${id}`);
    return response.data;
  },

  // Créer un nouveau produit
  createProduct: async (productData) => {
    const response = await axios.post('/api/products', productData);
    return response.data;
  },

  // Modifier un produit
  updateProduct: async (id, productData) => {
    const response = await axios.put(`/api/products/${id}`, productData);
    return response.data;
  },

  // Supprimer un produit
  deleteProduct: async (id) => {
    await axios.delete(`/api/products/${id}`);
  }
};
