import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { orderApi } from '../api/orders';
import { toast } from 'react-toastify';
import { 
  FaShoppingCart, 
  FaClock, 
  FaCheckCircle, 
  FaTimesCircle,
  FaSpinner,
  FaEye
} from 'react-icons/fa';

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.userId) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const ordersData = await orderApi.getOrdersByUser(user.userId);
      setOrders(ordersData);
    } catch (error) {
      console.error('Erreur lors du chargement des commandes:', error);
      toast.error('Erreur lors du chargement de vos commandes');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING':
        return <FaClock className="w-4 h-4" />;
      case 'ACCEPTED':
        return <FaCheckCircle className="w-4 h-4" />;
      case 'REJECTED':
        return <FaTimesCircle className="w-4 h-4" />;
      default:
        return <FaSpinner className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ACCEPTED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'PENDING':
        return 'En cours de traitement';
      case 'ACCEPTED':
        return 'Acceptée';
      case 'REJECTED':
        return 'Refusée';
      default:
        return status;
    }
  };

  const getPriorityColor = (totalAmount) => {
    if (totalAmount >= 500) return 'text-red-600 font-semibold';
    if (totalAmount >= 300) return 'text-orange-600 font-semibold';
    return 'text-green-600 font-semibold';
  };

  const getPriorityText = (totalAmount) => {
    if (totalAmount >= 500) return 'Priorité: Haute';
    if (totalAmount >= 300) return 'Priorité: Moyenne';
    return 'Priorité: Faible';
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Connexion requise</h2>
          <p className="text-gray-600">Veuillez vous connecter pour voir vos commandes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Mes Commandes</h1>
              <p className="text-gray-600">Suivez l'état de vos commandes en temps réel</p>
            </div>
            <button
              onClick={loadOrders}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
            >
              <FaEye className="mr-2" />
              Actualiser
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Vos Commandes</h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Chargement de vos commandes...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <FaShoppingCart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune commande</h3>
              <p className="text-gray-600 mb-4">Vous n'avez pas encore passé de commande</p>
              <a
                href="/products"
                className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition-colors"
              >
                Découvrir nos produits
              </a>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {orders.map((order) => (
                <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-500">Commande</span>
                          <span className="text-lg font-bold text-gray-900">#{order.id}</span>
                        </div>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-2">{getStatusText(order.status)}</span>
                        </div>
                        <div className={`text-sm ${getPriorityColor(order.totalPrice)}`}>
                          {getPriorityText(order.totalPrice)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Montant total</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {order.totalPrice ? order.totalPrice.toFixed(2) : '0.00'} MAD
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Date de commande</p>
                          <p className="text-sm font-medium text-gray-900">
                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString('fr-FR') : 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Nombre d'articles</p>
                          <p className="text-sm font-medium text-gray-900">
                            {order.items ? order.items.length : 0} article(s)
                          </p>
                        </div>
                      </div>

                      {/* Order Items */}
                      {order.items && order.items.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Articles commandés :</p>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center space-x-3 text-sm text-gray-600">
                                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                <span>{item.quantity}x</span>
                                <span className="font-medium">{item.productName}</span>
                                <span className="text-gray-400">-</span>
                                <span>{item.unitPrice.toFixed(2)} MAD</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Status Message */}
                      <div className="mt-4 p-3 bg-gray-50 rounded-md">
                        {order.status === 'PENDING' && (
                          <p className="text-sm text-gray-600">
                            <FaClock className="inline w-4 h-4 mr-2" />
                            Votre commande est en cours de traitement par notre équipe.
                          </p>
                        )}
                        {order.status === 'ACCEPTED' && (
                          <p className="text-sm text-green-600">
                            <FaCheckCircle className="inline w-4 h-4 mr-2" />
                            Votre commande a été acceptée et sera traitée sous peu.
                          </p>
                        )}
                        {order.status === 'REJECTED' && (
                          <p className="text-sm text-red-600">
                            <FaTimesCircle className="inline w-4 h-4 mr-2" />
                            Votre commande a été refusée. Veuillez nous contacter pour plus d'informations.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
