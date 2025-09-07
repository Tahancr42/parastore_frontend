# 🧪 Test du Système de Panier

Ce document explique comment tester le système de panier de ParaStore.

## 🚀 Démarrage rapide

### 1. Démarrer l'application
```bash
cd storeparapharmacie
npm run dev
```

### 2. Se connecter
- Allez sur `/login`
- Connectez-vous avec un compte valide
- Ou créez un compte sur `/register`

### 3. Tester le panier
- Allez sur `/test-cart` pour la page de test
- Ou utilisez l'icône du panier dans le header

## 🧪 Page de test

La page `/test-cart` contient :
- **3 produits fictifs** avec boutons "Ajouter au panier"
- **Résumé du panier** en sidebar
- **Instructions détaillées** pour les tests

## ✅ Tests à effectuer

### Test 1 : Ajout au panier
1. Cliquez sur "Ajouter au panier" pour un produit
2. Vérifiez que le compteur du panier dans le header se met à jour
3. Vérifiez que le produit apparaît dans le résumé du panier

### Test 2 : Modification des quantités
1. Allez sur la page du panier (`/cart`)
2. Utilisez les boutons +/- pour modifier les quantités
3. Vérifiez que le prix total se met à jour

### Test 3 : Suppression d'items
1. Cliquez sur l'icône poubelle pour supprimer un produit
2. Vérifiez que le produit disparaît du panier
3. Vérifiez que le compteur et le prix total se mettent à jour

### Test 4 : Vidage du panier
1. Cliquez sur "Vider le panier"
2. Confirmez l'action
3. Vérifiez que le panier est vide

### Test 5 : Navigation
1. Cliquez sur l'icône du panier dans le header
2. Vérifiez que vous arrivez sur la page du panier
3. Testez le bouton "Continuer les achats"

## 🔧 Configuration actuelle

### Mock API
Le système utilise actuellement un **mock API** pour simuler le backend :
- Fichier : `src/mocks/cartMock.js`
- Données fictives : 3 produits prédéfinis
- Délais simulés : 200-500ms pour simuler le réseau

### Structure des données
Le mock retourne des objets `CartItemResponse` :
```javascript
{
  id: 1,                    // ID du CartItem
  productId: 1,             // ID du produit
  productName: "Vitamine C", // Nom du produit
  unitPrice: 15.99,         // Prix unitaire
  quantity: 2,               // Quantité
  lineTotal: 31.98          // Prix total (prix × quantité)
}
```

## 🚨 Problèmes connus

### Erreurs de console
Si vous voyez des erreurs dans la console :
1. **TypeError: Cannot read properties of undefined**
   - Cause : Structure de données incorrecte
   - Solution : Vérifiez que le mock retourne la bonne structure

2. **Erreurs de routing**
   - Cause : Routes non configurées
   - Solution : Vérifiez `App.jsx` et les imports

### Panier qui ne se met pas à jour
1. Vérifiez que vous êtes connecté
2. Vérifiez que le `CartProvider` est bien configuré
3. Vérifiez la console pour les erreurs JavaScript

## 🔄 Retour au backend réel

Pour utiliser le vrai backend au lieu du mock :

1. **Restaurer l'API originale** :
```javascript
// src/api/cart.js
import axios from '../axiosInstance';

export const addToCartApi = async ({ userId, productId, quantity = 1 }) => {
  const { data } = await axios.post('/api/cart/add', { userId, productId, quantity });
  return data;
};
// ... autres fonctions
```

2. **Démarrer le backend Spring Boot** :
```bash
cd parastoreB
./mvnw spring-boot:run
```

3. **Vérifier la configuration** :
- Backend sur `http://localhost:8080`
- Frontend sur `http://localhost:5173`
- CORS configuré dans `CartController`

## 📱 Test sur mobile

Le système est responsive et peut être testé sur mobile :
1. Ouvrez les DevTools (F12)
2. Activez le mode responsive
3. Testez sur différentes tailles d'écran

## 🎯 Prochaines étapes

Une fois les tests passés :
1. **Intégrer avec le vrai backend**
2. **Ajouter la gestion des erreurs réseau**
3. **Implémenter la persistance locale**
4. **Ajouter les animations et transitions**
5. **Tester avec de vrais produits**

## 📞 Support

En cas de problème :
1. Vérifiez la console du navigateur
2. Vérifiez les logs du serveur de développement
3. Vérifiez que tous les composants sont importés
4. Vérifiez la configuration des providers dans `main.jsx`
