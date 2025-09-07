// src/api/cart.js
// API réelle pour le panier
import axios from '../axiosInstance';

export const addToCartApi = async ({ userId, productId, quantity = 1 }) => {
  const response = await axios.post('/api/cart/add', {
    userId,
    productId,
    quantity
  });
  return response.data;
};

export const getCartApi = async (userId) => {
  const response = await axios.get(`/api/cart?userId=${userId}`);
  return response.data;
};

export const updateItemQtyApi = async ({ cartItemId, userId, quantity }) => {
  const response = await axios.put(`/api/cart/item/${cartItemId}`, {
    quantity
  });
  return response.data;
};

export const removeItemApi = async ({ cartItemId, userId }) => {
  await axios.delete(`/api/cart/item/${cartItemId}?userId=${userId}`);
};

export const clearCartApi = async (userId) => {
  await axios.delete(`/api/cart/clear?userId=${userId}`);
};
