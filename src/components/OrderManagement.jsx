import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaCheckCircle,
  FaClock,
  FaTruck,
  FaTimes,
  FaDownload
} from 'react-icons/fa';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Simuler des données de commandes
  useEffect(() => {
    const mockOrders = [
      {
        id: 'CMD-001',
        customer: 'Ahmed Benali',
        email: 'ahmed.benali@email.com',
        phone: '+212 6 12 34 56 78',
        date: '2024-01-25',
        amount: 450.00,
        status: 'approved',
        items: [
          { name: 'Vitamine C 1000mg', quantity: 2, price: 120.00 },
          { name: 'Oméga-3 1000mg', quantity: 1, price: 180.00 },
          { name: 'Magnésium 400mg', quantity: 1, price: 150.00 }
        ],
        shippingAddress: '123 Rue Hassan II, Casablanca 20000',
        paymentMethod: 'Carte bancaire'
      },
      {
        id: 'CMD-002',
        customer: 'Fatima Zahra',
        email: 'fatima.zahra@email.com',
        phone: '+212 6 98 76 54 32',
        date: '2024-01-24',
        amount: 320.00,
        status: 'pending',
        items: [
          { name: 'Probiotiques 10 souches', quantity: 1, price: 220.00 },
          { name: 'Vitamine D3 2000UI', quantity: 1, price: 100.00 }
        ],
        shippingAddress: '456 Avenue Mohammed V, Rabat 10000',
        paymentMethod: 'PayPal'
      },
      {
        id: 'CMD-003',
        customer: 'Mohammed Alami',
        email: 'mohammed.alami@email.com',
        phone: '+212 6 55 44 33 22',
        date: '2024-01-23',
        amount: 680.00,
        status: 'shipped',
        items: [
          { name: 'Collagène marin', quantity: 1, price: 350.00 },
          { name: 'Biotine 5000mcg', quantity: 1, price: 285.00 },
          { name: 'Zinc 15mg', quantity: 1, price: 45.00 }
        ],
        shippingAddress: '789 Boulevard Al Massira, Marrakech 40000',
        paymentMethod: 'Carte bancaire'
      },
      {
        id: 'CMD-004',
        customer: 'Amina Tazi',
        email: 'amina.tazi@email.com',
        phone: '+212 6 11 22 33 44',
        date: '2024-01-22',
        amount: 290.00,
        status: 'approved',
        items: [
          { name: 'Crème hydratante NUXE', quantity: 1, price: 245.00 },
          { name: 'Sérum Vitamine C', quantity: 1, price: 45.00 }
        ],
        shippingAddress: '321 Rue Ibn Khaldoun, Fès 30000',
        paymentMethod: 'Espèces'
      },
      {
        id: 'CMD-005',
        customer: 'Karim Bennani',
        email: 'karim.bennani@email.com',
        phone: '+212 6 99 88 77 66',
        date: '2024-01-21',
        amount: 520.00,
        status: 'pending',
        items: [
          { name: 'Coenzyme Q10 100mg', quantity: 1, price: 320.00 },
          { name: 'Calcium + Vitamine D', quantity: 1, price: 195.00 },
          { name: 'Fer 20mg', quantity: 1, price: 5.00 }
        ],
        shippingAddress: '654 Avenue Hassan II, Agadir 80000',
        paymentMethod: 'Carte bancaire'
      }
    ];

    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  // Filtrer les commandes
  useEffect(() => {
    let filtered = orders;

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par statut
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter]);

  // Fonction pour obtenir le statut avec la bonne couleur
  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: { 
        color: 'bg-emerald-100 text-emerald-800', 
        icon: <FaCheckCircle className="text-emerald-600" />, 
        text: 'Approuvé' 
      },
      pending: { 
        color: 'bg-amber-100 text-amber-800', 
        icon: <FaClock className="text-amber-600" />, 
        text: 'En attente' 
      },
      shipped: { 
        color: 'bg-blue-100 text-blue-800', 
        icon: <FaTruck className="text-blue-600" />, 
        text: 'Expédié' 
      },
      cancelled: { 
        color: 'bg-red-100 text-red-800', 
        icon: <FaTimes className="text-red-600" />, 
        text: 'Annulé' 
      }
    };

    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon}
        {config.text}
      </span>
    );
  };

  // Fonction pour formater le prix en MAD
  const formatPrice = (price) => {
    return `${price.toFixed(2)} MAD`;
  };

  // Fonction pour mettre à jour le statut d'une commande
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  // Fonction pour supprimer une commande
  const deleteOrder = (orderId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    }
  };

  // Fonction pour ouvrir le modal de détails
  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  return (
    <div className="min-h-screen bg-emerald-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-emerald-200 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Gestion des Commandes</h1>
              <p className="text-gray-600 mt-1">Gérez toutes les commandes de vos clients</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-md hover:shadow-lg flex items-center gap-2">
                <FaDownload className="text-sm" />
                Exporter
              </button>
            </div>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-emerald-200 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Barre de recherche */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par client, ID ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {/* Filtre par statut */}
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="approved">Approuvé</option>
                <option value="shipped">Expédié</option>
                <option value="cancelled">Annulé</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tableau des commandes */}
        <div className="bg-white rounded-lg shadow-lg border-2 border-emerald-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-emerald-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commande
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilisateur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Montant
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
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-emerald-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.id}</div>
                      <div className="text-sm text-gray-500">{order.items.length} article(s)</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(order.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-emerald-600">
                        {formatPrice(order.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openOrderDetails(order)}
                          className="text-emerald-600 hover:text-emerald-800 transition-colors p-1"
                          title="Voir les détails"
                        >
                          <FaEye className="text-sm" />
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order.id, 'approved')}
                          className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                          title="Approuver"
                        >
                          <FaCheckCircle className="text-sm" />
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order.id, 'shipped')}
                          className="text-purple-600 hover:text-purple-800 transition-colors p-1"
                          title="Marquer comme expédié"
                        >
                          <FaTruck className="text-sm" />
                        </button>
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="text-red-600 hover:text-red-800 transition-colors p-1"
                          title="Supprimer"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-6 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Affichage de {filteredOrders.length} commande(s) sur {orders.length}
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                  Précédent
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                  Suivant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de détails de la commande */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Détails de la commande {selectedOrder.id}
                </h2>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              {/* Informations du client */}
              <div className="bg-emerald-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Informations du client</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Nom</p>
                    <p className="font-medium">{selectedOrder.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedOrder.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Téléphone</p>
                    <p className="font-medium">{selectedOrder.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Statut</p>
                    <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                  </div>
                </div>
              </div>

              {/* Articles de la commande */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Articles commandés</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-emerald-600">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Informations de livraison et paiement */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Adresse de livraison</h3>
                  <p className="text-gray-600">{selectedOrder.shippingAddress}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Méthode de paiement</h3>
                  <p className="text-gray-600">{selectedOrder.paymentMethod}</p>
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">Total de la commande</span>
                  <span className="text-2xl font-bold text-emerald-600">
                    {formatPrice(selectedOrder.amount)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6 pt-4 border-t">
                <button
                  onClick={() => updateOrderStatus(selectedOrder.id, 'approved')}
                  className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  Approuver la commande
                </button>
                <button
                  onClick={() => updateOrderStatus(selectedOrder.id, 'shipped')}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Marquer comme expédié
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
