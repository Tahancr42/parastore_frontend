// Mock des données du panier pour les tests
// Simule la structure CartItemResponse du backend avec vraies informations

import { getGuaranteedProductImage } from '../constants/productImages';

export const mockCartItems = [
  {
    id: 1,
    productId: 1,
    productName: 'Vitamine C 1000mg - Immunité',
    unitPrice: 120.00,
    quantity: 2,
    lineTotal: 240.00,
    imageUrl: '/vitamine.jpg'
  },
  {
    id: 2,
    productId: 2,
    productName: 'Oméga-3 1000mg - Santé cardiovasculaire',
    unitPrice: 180.00,
    quantity: 1,
    lineTotal: 180.00,
    imageUrl: '/oenobiol.jpg'
  },
  {
    id: 3,
    productId: 3,
    productName: 'Magnésium 400mg - Relaxation musculaire',
    unitPrice: 95.00,
    quantity: 3,
    lineTotal: 285.00,
    imageUrl: '/zohi_sommeil.jpg'
  },
  {
    id: 4,
    productId: 4,
    productName: 'Probiotiques 10 souches - Flore intestinale',
    unitPrice: 220.00,
    quantity: 1,
    lineTotal: 220.00,
    imageUrl: '/oenobiol.jpg'
  },
  {
    id: 5,
    productId: 5,
    productName: 'Collagène marin - Anti-âge',
    unitPrice: 350.00,
    quantity: 2,
    lineTotal: 700.00,
    imageUrl: '/serum_roche.jpg'
  }
];

// Fonction pour simuler un délai d'API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock des fonctions d'API
export const mockCartApi = {
  getCart: async (userId) => {
    await delay(500); // Simule un délai réseau
    return mockCartItems;
  },

  addToCart: async ({ userId, productId, quantity }) => {
    await delay(300);
    
    // Simule l'ajout d'un produit
    const existingItem = mockCartItems.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.lineTotal = existingItem.unitPrice * existingItem.quantity;
    } else {
             // Créer un nouveau produit fictif avec vraies informations
       const productNames = [
         'Vitamine D3 2000UI - Os et immunité',
         'Zinc 15mg - Défenses naturelles',
         'Sélénium 100mcg - Antioxydant',
         'Vitamine B12 1000mcg - Énergie',
         'Calcium + Vitamine D - Santé osseuse',
         'Fer 20mg - Vitalité',
         'Biotine 5000mcg - Beauté des cheveux',
         'Coenzyme Q10 100mg - Énergie cellulaire'
       ];
       
       const randomName = productNames[Math.floor(Math.random() * productNames.length)];
               const randomPrice = Math.floor(Math.random() * 420) + 80; // Prix entre 80 et 500 MAD
       
       const newItem = {
         id: Date.now(),
         productId,
         productName: randomName,
         unitPrice: randomPrice,
         quantity,
         lineTotal: randomPrice * quantity,
         imageUrl: getGuaranteedProductImage(randomName, productId)
       };
       mockCartItems.push(newItem);
    }
    
    return mockCartItems;
  },

  updateQuantity: async ({ cartItemId, userId, quantity }) => {
    await delay(200);
    
    const item = mockCartItems.find(item => item.id === cartItemId);
    if (item) {
      if (quantity <= 0) {
        // Supprimer l'item
        const index = mockCartItems.findIndex(item => item.id === cartItemId);
        mockCartItems.splice(index, 1);
        return null;
      } else {
        item.quantity = quantity;
        item.lineTotal = item.unitPrice * quantity;
        return item;
      }
    }
    return null;
  },

  removeItem: async ({ cartItemId, userId }) => {
    await delay(200);
    
    const index = mockCartItems.findIndex(item => item.id === cartItemId);
    if (index !== -1) {
      mockCartItems.splice(index, 1);
    }
  },

  clearCart: async (userId) => {
    await delay(300);
    mockCartItems.length = 0;
  }
};
