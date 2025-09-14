import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { 
  FaChartLine, 
  FaBox, 
  FaShoppingCart, 
  FaEnvelope,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaEdit,
  FaTrash,
  FaPlus,
  FaEye,
  FaReply,
  FaCheck
} from 'react-icons/fa';
import { productApi } from '../api/products';
import { orderApi } from '../api/orders';
import { messageApi } from '../api/messages';
import { activityService } from '../api/activity';
import { toast } from 'react-toastify';

const ManagerDashboard = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // États pour les produits
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    available: true
  });
  
  // État pour l'activité récente
  const [recentActivity, setRecentActivity] = useState([]);
  
  // États pour les commandes
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Charger les produits, commandes, messages et l'activité au montage du composant
  useEffect(() => {
    loadProducts();
    loadOrders();
    loadMessages();
    loadUnreadCount();
    loadRecentActivity();
  }, []);

  // Charger les produits depuis le backend
  const loadProducts = async () => {
    try {
      setLoading(true);
      const productsData = await productApi.getAllProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
      toast.error('Erreur lors du chargement des produits');
    } finally {
      setLoading(false);
    }
  };

  // Charger les commandes depuis le backend
  const loadOrders = async () => {
    try {
      setOrdersLoading(true);
      const ordersData = await orderApi.getAllOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error('Erreur lors du chargement des commandes:', error);
      toast.error('Erreur lors du chargement des commandes');
    } finally {
      setOrdersLoading(false);
    }
  };

  // Charger les messages
  const loadMessages = async () => {
    try {
      setMessagesLoading(true);
      const messagesData = await messageApi.getAllMessages();
      setMessages(messagesData);
    } catch (error) {
      console.error('Erreur lors du chargement des messages:', error);
      toast.error('Erreur lors du chargement des messages');
    } finally {
      setMessagesLoading(false);
    }
  };

  // Charger le nombre de messages non lus
  const loadUnreadCount = async () => {
    try {
      const count = await messageApi.getUnreadCount();
      setUnreadCount(count);
    } catch (error) {
      console.error('Erreur lors du chargement du nombre de messages non lus:', error);
    }
  };

  // Marquer un message comme lu
  const handleMarkAsRead = async (messageId) => {
    try {
      await messageApi.markAsRead(messageId);
      toast.success('Message marqué comme lu');
      loadMessages();
      loadUnreadCount();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du message:', error);
      toast.error('Erreur lors de la mise à jour du message');
    }
  };

  // Répondre à un message
  const handleRespondToMessage = async (messageId, response) => {
    if (!response.trim()) {
      toast.error('Veuillez saisir une réponse');
      return;
    }

    try {
      await messageApi.respondToMessage(messageId, response);
      toast.success('Réponse envoyée avec succès');
      loadMessages();
      loadUnreadCount();
      
      // Enregistrer l'activité
      const message = messages.find(m => m.id === messageId);
      const messageDescription = message ? `Message de ${message.fullName}` : 'Message';
      activityService.addActivity(
        'GESTIONNAIRE',
        'message_responded',
        `${messageDescription} - Réponse envoyée`,
        { messageId, response }
      );
      loadRecentActivity();
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la réponse:', error);
      toast.error('Erreur lors de l\'envoi de la réponse');
    }
  };

  // Charger l'activité récente
  const loadRecentActivity = () => {
    const activities = activityService.getActivities('GESTIONNAIRE');
    setRecentActivity(activities);
  };

  // Calculer le total des revenus
  const calculateTotalRevenue = () => {
    return orders.reduce((total, order) => {
      return total + (order.totalPrice || 0);
    }, 0);
  };

  // Recharger toutes les données du dashboard
  const refreshDashboardData = async () => {
    try {
      await Promise.all([
        loadProducts(),
        loadOrders(),
        loadMessages(),
        loadUnreadCount()
      ]);
      loadRecentActivity();
    } catch (error) {
      console.error('Erreur lors du rechargement des données:', error);
    }
  };

  // Gérer le formulaire de produit
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Soumettre le formulaire (créer ou modifier)
  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...productForm,
        price: parseFloat(productForm.price)
      };

      if (editingProduct) {
        await productApi.updateProduct(editingProduct.id, productData);
        toast.success('Produit modifié avec succès');
        
        // Enregistrer l'activité
        activityService.addActivity(
          'GESTIONNAIRE',
          'product_updated',
          `Produit "${productData.name}" modifié`,
          { productId: editingProduct.id, productName: productData.name }
        );
      } else {
        const newProduct = await productApi.createProduct(productData);
        toast.success('Produit créé avec succès');
        
        // Enregistrer l'activité
        activityService.addActivity(
          'GESTIONNAIRE',
          'product_created',
          `Nouveau produit "${productData.name}" créé`,
          { productId: newProduct.id, productName: productData.name }
        );
      }

      setShowProductForm(false);
      setEditingProduct(null);
      setProductForm({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
        available: true
      });
      refreshDashboardData();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast.error('Erreur lors de la sauvegarde du produit');
    }
  };

  // Modifier un produit - ouvre la modal
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      imageUrl: product.imageUrl,
      available: product.available
    });
    setShowEditModal(true);
  };

  // Supprimer un produit
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        // Récupérer le nom du produit avant suppression
        const productToDelete = products.find(p => p.id === productId);
        const productName = productToDelete ? productToDelete.name : 'Produit';
        
        await productApi.deleteProduct(productId);
        toast.success('Produit supprimé avec succès');
        
        // Enregistrer l'activité
        activityService.addActivity(
          'GESTIONNAIRE',
          'product_deleted',
          `Produit "${productName}" supprimé`,
          { productId, productName }
        );
        
        refreshDashboardData();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        toast.error('Erreur lors de la suppression du produit');
      }
    }
  };

  // Annuler le formulaire
  const handleCancelForm = () => {
    setShowProductForm(false);
    setEditingProduct(null);
    setProductForm({
      name: '',
      description: '',
      price: '',
      category: '',
      imageUrl: '',
      available: true
    });
  };

  // Annuler la modal d'édition
  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingProduct(null);
    setProductForm({
      name: '',
      description: '',
      price: '',
      category: '',
      imageUrl: '',
      available: true
    });
  };

  // Gérer le statut d'une commande
  const handleOrderStatusChange = async (orderId, newStatus) => {
    try {
      await orderApi.updateOrderStatus(orderId, newStatus);
      toast.success(`Commande ${newStatus === 'ACCEPTED' ? 'acceptée' : 'refusée'} avec succès`);
      
      // Enregistrer l'activité
      const order = orders.find(o => o.id === orderId);
      const orderDescription = order ? `Commande #${order.id}` : 'Commande';
      activityService.addActivity(
        'GESTIONNAIRE',
        'order_status_updated',
        `${orderDescription} ${newStatus === 'ACCEPTED' ? 'acceptée' : 'refusée'}`,
        { orderId, newStatus }
      );
      
      refreshDashboardData();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      toast.error('Erreur lors de la mise à jour du statut de la commande');
    }
  };

  // Appliquer les modifications dans la modal
  const handleApplyEdit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...productForm,
        price: parseFloat(productForm.price)
      };

      await productApi.updateProduct(editingProduct.id, productData);
      toast.success('Produit modifié avec succès');
      
      // Enregistrer l'activité
      activityService.addActivity(
        'GESTIONNAIRE',
        'product_updated',
        `Produit "${productData.name}" modifié`,
        { productId: editingProduct.id, productName: productData.name }
      );
      
      setShowEditModal(false);
      setEditingProduct(null);
      setProductForm({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
        available: true
      });
      refreshDashboardData();
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
      toast.error('Erreur lors de la modification du produit');
    }
  };

  // Redirection si pas connecté ou pas gestionnaire
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== 'GESTIONNAIRE') {
    return <Navigate to="/" replace />;
  }

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: FaChartLine },
    { id: 'products', label: 'Gestion des Produits', icon: FaBox },
    { id: 'orders', label: 'Gestion des Commandes', icon: FaShoppingCart },
    { id: 'messages', label: 'Messagerie', icon: FaEnvelope, badge: unreadCount },
  ];

  const handleLogout = () => {
    logout();
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Tableau de Bord Gestionnaire</h2>
            
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <FaBox className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Produits</p>
                    <p className="text-2xl font-semibold text-gray-900">{products.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <FaShoppingCart className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Commandes</p>
                    <p className="text-2xl font-semibold text-gray-900">{orders.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                    <FaChartLine className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Revenus</p>
                    <p className="text-2xl font-semibold text-gray-900">{calculateTotalRevenue().toFixed(2)} MAD</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                    <FaBox className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Produits Disponibles</p>
                    <p className="text-2xl font-semibold text-gray-900">{products.filter(p => p.available).length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Activité récente */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Activité Récente</h3>
              {recentActivity.length === 0 ? (
                <p className="text-gray-600">Aucune activité récente</p>
              ) : (
                <div className="space-y-3">
                  {recentActivity.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        {activity.type === 'product_created' && (
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <FaPlus className="w-4 h-4 text-green-600" />
                          </div>
                        )}
                        {activity.type === 'product_updated' && (
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <FaEdit className="w-4 h-4 text-blue-600" />
                          </div>
                        )}
                        {activity.type === 'product_deleted' && (
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <FaTrash className="w-4 h-4 text-red-600" />
                          </div>
                        )}
                        {activity.type === 'order_status_updated' && (
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <FaShoppingCart className="w-4 h-4 text-purple-600" />
                          </div>
                        )}
                        {activity.type === 'message_responded' && (
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <FaEnvelope className="w-4 h-4 text-blue-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.date} à {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      
      case 'products':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Gestion des Produits</h2>
            
            {/* Formulaire d'ajout/modification */}
            {showProductForm && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {editingProduct ? 'Modifier le Produit' : 'Ajouter un Nouveau Produit'}
                </h3>
                <form onSubmit={handleSubmitProduct} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom du produit
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={productForm.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nom du produit"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Prix (MAD)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        name="price"
                        value={productForm.price}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Catégorie
                      </label>
                      <input
                        type="text"
                        name="category"
                        value={productForm.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Catégorie"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        URL de l'image
                      </label>
                      <input
                        type="text"
                        name="imageUrl"
                        value={productForm.imageUrl}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="/image.jpg ou https://example.com/image.jpg"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Chemin relatif (ex: /image.jpg) ou URL complète
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={productForm.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Description du produit"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="available"
                      checked={productForm.available}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Produit disponible
                    </label>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                    >
                      <FaPlus className="mr-2" />
                      {editingProduct ? 'Modifier' : 'Créer'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelForm}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Liste des produits */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Liste des Produits</h3>
                <button 
                  onClick={() => setShowProductForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                >
                  <FaPlus className="mr-2" />
                  Ajouter un Produit
                </button>
              </div>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-gray-600">Chargement des produits...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Image
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nom
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Prix
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Catégorie
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                            Aucun produit trouvé
                          </td>
                        </tr>
                      ) : (
                        products.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              {product.imageUrl ? (
                                <img
                                  src={product.imageUrl}
                                  alt={product.name}
                                  className="h-12 w-12 object-cover rounded-md"
                                />
                              ) : (
                                <div className="h-12 w-12 bg-gray-200 rounded-md flex items-center justify-center">
                                  <FaBox className="h-6 w-6 text-gray-400" />
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {product.name}
                                </div>
                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                  {product.description}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {product.price.toFixed(2)} MAD
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {product.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                product.available 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {product.available ? 'Disponible' : 'Indisponible'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleEditProduct(product)}
                                  className="text-blue-600 hover:text-blue-900"
                                  title="Modifier"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="text-red-600 hover:text-red-900"
                                  title="Supprimer"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            {/* Modal d'édition de produit */}
            {showEditModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-gray-800">
                        Modifier le Produit
                      </h3>
                      <button
                        onClick={handleCancelEdit}
                        className="text-gray-400 hover:text-gray-600 text-2xl"
                      >
                        ×
                      </button>
                    </div>
                    
                    <form onSubmit={handleApplyEdit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nom du produit
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={productForm.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nom du produit"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Prix (MAD)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            name="price"
                            value={productForm.price}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0.00"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Catégorie
                          </label>
                          <input
                            type="text"
                            name="category"
                            value={productForm.category}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Catégorie"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            URL de l'image
                          </label>
                          <input
                            type="text"
                            name="imageUrl"
                            value={productForm.imageUrl}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="/image.jpg ou https://example.com/image.jpg"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Chemin relatif (ex: /image.jpg) ou URL complète
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={productForm.description}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Description du produit"
                        />
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="available"
                          checked={productForm.available}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-700">
                          Produit disponible
                        </label>
                      </div>
                      
                      <div className="flex justify-end space-x-3 pt-4 border-t">
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                        >
                          <FaEdit className="mr-2" />
                          Appliquer
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'orders':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Gestion des Commandes</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Commandes</h3>
                <button
                  onClick={loadOrders}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                >
                  <FaEye className="mr-2" />
                  Actualiser
                </button>
              </div>
              
              {ordersLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-gray-600">Chargement des commandes...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID Commande
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Utilisateur
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Téléphone
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Montant
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                            Aucune commande trouvée
                          </td>
                        </tr>
                      ) : (
                        orders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              #{order.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div>
                                <div className="font-medium">{order.userName || 'N/A'}</div>
                                <div className="text-gray-500 text-xs">{order.userEmail || 'N/A'}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {order.userPhone || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {order.totalPrice ? order.totalPrice.toFixed(2) : '0.00'} MAD
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                order.status === 'PENDING' 
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : order.status === 'ACCEPTED'
                                  ? 'bg-green-100 text-green-800'
                                  : order.status === 'REJECTED'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {order.status === 'PENDING' ? 'En attente' :
                                 order.status === 'ACCEPTED' ? 'Acceptée' :
                                 order.status === 'REJECTED' ? 'Refusée' : order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order.createdAt ? new Date(order.createdAt).toLocaleDateString('fr-FR') : 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              {order.status === 'PENDING' && (
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleOrderStatusChange(order.id, 'ACCEPTED')}
                                    className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-md transition-colors"
                                    title="Accepter"
                                  >
                                    ✓ Accepter
                                  </button>
                                  <button
                                    onClick={() => handleOrderStatusChange(order.id, 'REJECTED')}
                                    className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors"
                                    title="Refuser"
                                  >
                                    ✗ Refuser
                                  </button>
                                </div>
                              )}
                              {order.status !== 'PENDING' && (
                                <span className="text-gray-500 text-xs">
                                  {order.status === 'ACCEPTED' ? 'Traitée' : 'Refusée'}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'messages':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Messagerie</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Messages Utilisateurs</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={loadMessages}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                  >
                    <FaEye className="mr-2" />
                    Actualiser
                  </button>
                  <button
                    onClick={loadUnreadCount}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                  >
                    <FaCheck className="mr-2" />
                    Vérifier
                  </button>
                </div>
              </div>
              
              {messagesLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-gray-600">Chargement des messages...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-8">
                      <FaEnvelope className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun message</h3>
                      <p className="text-gray-600">Aucun message reçu pour le moment</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <MessageCard 
                        key={message.id} 
                        message={message} 
                        onMarkAsRead={handleMarkAsRead}
                        onRespond={handleRespondToMessage}
                      />
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Composant pour afficher un message
  const MessageCard = ({ message, onMarkAsRead, onRespond }) => {
    const [showResponseForm, setShowResponseForm] = useState(false);
    const [response, setResponse] = useState('');

    const getStatusColor = (status) => {
      switch (status) {
        case 'NEW':
          return 'bg-red-100 text-red-800 border-red-200';
        case 'READ':
          return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'RESPONDED':
          return 'bg-green-100 text-green-800 border-green-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    };

    const getStatusText = (status) => {
      switch (status) {
        case 'NEW':
          return 'Nouveau';
        case 'READ':
          return 'Lu';
        case 'RESPONDED':
          return 'Répondu';
        default:
          return status;
      }
    };

    const handleSubmitResponse = (e) => {
      e.preventDefault();
      if (response.trim()) {
        onRespond(message.id, response);
        setResponse('');
        setShowResponseForm(false);
      }
    };

    return (
      <div className={`border rounded-lg p-4 ${message.status === 'NEW' ? 'border-l-4 border-l-red-500 bg-red-50' : 'bg-white'}`}>
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h4 className="font-semibold text-gray-900">{message.fullName}</h4>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(message.status)}`}>
                {getStatusText(message.status)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{message.email}</p>
            <p className="text-sm text-gray-500">
              {new Date(message.createdAt).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <div className="flex space-x-2">
            {message.status === 'NEW' && (
              <button
                onClick={() => onMarkAsRead(message.id)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Marquer comme lu
              </button>
            )}
            <button
              onClick={() => setShowResponseForm(!showResponseForm)}
              className="text-green-600 hover:text-green-800 text-sm flex items-center"
            >
              <FaReply className="mr-1" />
              Répondre
            </button>
          </div>
        </div>
        
        <div className="mb-3">
          <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
        </div>

        {message.response && (
          <div className="mt-3 p-3 bg-green-50 border-l-4 border-green-400 rounded">
            <h5 className="font-semibold text-green-800 mb-1">Votre réponse :</h5>
            <p className="text-green-700 whitespace-pre-wrap">{message.response}</p>
            <p className="text-xs text-green-600 mt-1">
              Répondu le {new Date(message.respondedAt).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        )}

        {showResponseForm && (
          <form onSubmit={handleSubmitResponse} className="mt-3 p-3 bg-gray-50 rounded">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Votre réponse :
            </label>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Tapez votre réponse ici..."
              required
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button
                type="button"
                onClick={() => {
                  setShowResponseForm(false);
                  setResponse('');
                }}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
              >
                Envoyer
              </button>
            </div>
          </form>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-800 text-white transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h1 className="text-xl font-bold">ParaStore Manager</h1>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-white"
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {sidebarOpen && (
                      <span className="ml-3 font-medium">{item.label}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">
                {user.email.charAt(0).toUpperCase()}
              </span>
            </div>
            {sidebarOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user.email}</p>
                <p className="text-xs text-gray-400">Gestionnaire</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
          >
            <FaSignOutAlt className="h-4 w-4" />
            {sidebarOpen && <span className="ml-3">Déconnexion</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              {menuItems.find(item => item.id === activeSection)?.label}
            </h1>
            <div className="text-sm text-gray-600">
              Connecté en tant que: {user.email}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
