# 🛒 Système de Panier - ParaStore

Ce document explique comment utiliser le système de panier complet de l'application ParaStore.

## 🏗️ Architecture

Le système de panier est composé de plusieurs composants et contextes :

### Composants
- **`Cart.jsx`** - Page principale du panier avec liste des produits
- **`CartIcon.jsx`** - Icône du panier avec badge du nombre d'items
- **`AddToCartButton.jsx`** - Bouton pour ajouter des produits au panier
- **`CartSummary.jsx`** - Résumé compact du panier pour sidebar

### Contextes
- **`CartContext.jsx`** - État global du panier partagé entre tous les composants
- **`AuthContext.jsx`** - Gestion de l'authentification des utilisateurs

### Hooks
- **`useCartOperations.js`** - Hook personnalisé pour toutes les opérations du panier

### API
- **`cart.js`** - Fonctions d'API pour communiquer avec le backend

## 🚀 Fonctionnalités

### ✅ Ajout au panier
- Sélection de la quantité avant ajout
- Vérification de l'authentification
- Feedback visuel (loading, notifications)
- Mise à jour automatique du compteur

### ✅ Gestion des quantités
- Augmentation/diminution des quantités
- Validation des quantités (minimum 1)
- Mise à jour en temps réel

### ✅ Suppression d'items
- Suppression individuelle d'items
- Vidage complet du panier
- Confirmation avant suppression

### ✅ Calcul automatique
- Prix total du panier
- Nombre total d'items
- Prix par ligne (prix unitaire × quantité)

### ✅ Synchronisation
- Panier associé à l'utilisateur connecté
- Persistance des données
- Mise à jour en temps réel

## 📱 Utilisation

### 1. Ajouter un produit au panier

```jsx
import AddToCartButton from './components/AddToCartButton';

function ProductPage({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <AddToCartButton product={product} />
    </div>
  );
}
```

### 2. Afficher l'icône du panier

```jsx
import CartIcon from './components/CartIcon';

function Header() {
  return (
    <header>
      {/* ... autres éléments ... */}
      <CartIcon />
    </header>
  );
}
```

### 3. Afficher le panier complet

```jsx
import Cart from './components/Cart';

function CartPage() {
  return <Cart />;
}
```

### 4. Afficher un résumé du panier

```jsx
import CartSummary from './components/CartSummary';

function Sidebar() {
  return (
    <aside>
      <CartSummary />
    </aside>
  );
}
```

## 🔧 Configuration

### 1. Wrapper l'application avec les providers

```jsx
// main.jsx
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

### 2. Utiliser le hook useCart dans vos composants

```jsx
import { useCart } from './context/CartContext';

function MyComponent() {
  const { cartItems, getTotalItems, getTotalPrice } = useCart();
  
  return (
    <div>
      <p>Items dans le panier : {getTotalItems()}</p>
      <p>Prix total : {getTotalPrice().toFixed(2)} €</p>
    </div>
  );
}
```

### 3. Utiliser le hook useCartOperations pour les actions

```jsx
import { useCartOperations } from './hooks/useCartOperations';

function MyComponent() {
  const { addToCart, removeItem, clearCart, loading } = useCartOperations();
  
  const handleAdd = async () => {
    const success = await addToCart(productId, 2);
    if (success) {
      console.log('Produit ajouté avec succès !');
    }
  };
  
  return (
    <button onClick={handleAdd} disabled={loading}>
      {loading ? 'Ajout en cours...' : 'Ajouter au panier'}
    </button>
  );
}
```

## 🎨 Personnalisation

### Styles Tailwind CSS
Tous les composants utilisent Tailwind CSS et peuvent être facilement personnalisés en modifiant les classes CSS.

### Thèmes
Les couleurs principales utilisées sont :
- **Bleu** (`blue-600`, `blue-700`) pour les actions principales
- **Rouge** (`red-500`, `red-600`) pour les actions de suppression
- **Vert** (`green-600`, `green-700`) pour les actions de validation
- **Gris** (`gray-100`, `gray-200`) pour les éléments neutres

### Responsive Design
Tous les composants sont responsifs et s'adaptent aux différentes tailles d'écran.

## 🔒 Sécurité

- **Authentification requise** : Seuls les utilisateurs connectés peuvent accéder au panier
- **Validation des données** : Toutes les entrées sont validées côté client et serveur
- **Association utilisateur** : Chaque panier est strictement associé à un utilisateur

## 📊 Performance

- **Mise à jour optimisée** : Le panier n'est rechargé que lorsque nécessaire
- **État local** : Utilisation de React Context pour éviter les re-renders inutiles
- **Lazy loading** : Les composants sont chargés à la demande

## 🐛 Dépannage

### Problèmes courants

1. **Panier ne se met pas à jour**
   - Vérifiez que le composant est bien dans le `CartProvider`
   - Vérifiez que l'utilisateur est connecté

2. **Erreurs d'API**
   - Vérifiez la configuration d'axios dans `axiosInstance.js`
   - Vérifiez que le backend est accessible

3. **Problèmes d'authentification**
   - Vérifiez que le token est valide
   - Vérifiez que l'utilisateur a un `userId` valide

## 📝 Notes de développement

- Le système utilise React 18+ avec les hooks modernes
- Toutes les opérations sont asynchrones avec gestion d'erreur
- Le système est compatible avec React Router v6
- Les notifications utilisent `react-toastify`
- Le styling utilise Tailwind CSS

## 🚀 Améliorations futures

- [ ] Persistance locale du panier (localStorage)
- [ ] Synchronisation multi-onglets
- [ ] Historique des commandes
- [ ] Sauvegarde des paniers
- [ ] Partage de paniers entre utilisateurs
- [ ] Notifications push pour les mises à jour
