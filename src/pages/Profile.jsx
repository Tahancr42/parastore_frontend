import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaShoppingCart, FaHeart, FaCog, FaSignOutAlt } from 'react-icons/fa';
import axios from '../axiosInstance';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    memberSince: new Date().toLocaleDateString('fr-FR')
  });
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Charger les statistiques de l'utilisateur
  useEffect(() => {
    const loadUserStats = async () => {
      if (!user?.userId) return;
      
      try {
        setLoading(true);
        // Récupérer les commandes de l'utilisateur
        const ordersResponse = await axios.get(`/api/orders/by-user/${user.userId}`);
        const orders = ordersResponse.data || [];
        
        const totalOrders = orders.length;
        const totalSpent = orders.reduce((total, order) => total + (order.totalPrice || 0), 0);
        
        setUserStats({
          totalOrders,
          totalSpent,
          memberSince: new Date().toLocaleDateString('fr-FR')
        });
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserStats();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  const { email, userId } = user;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
              <FaUser className="text-3xl text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>
              <p className="text-gray-600">Gérez vos informations et préférences</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Informations Personnelles */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FaCog className="mr-2 text-emerald-600" />
              Informations Personnelles
            </h2>
            
            <div className="space-y-4">
              {user?.name && (
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FaUser className="text-emerald-600" />
                  <div>
                    <p className="text-sm text-gray-600">Nom complet</p>
                    <p className="font-medium text-gray-900">{user.name}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <FaEnvelope className="text-emerald-600" />
                <div>
                  <p className="text-sm text-gray-600">Adresse email</p>
                  <p className="font-medium text-gray-900">{email}</p>
                </div>
              </div>
              
              {user?.phone && (
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FaUser className="text-emerald-600" />
                  <div>
                    <p className="text-sm text-gray-600">Téléphone</p>
                    <p className="font-medium text-gray-900">{user.phone}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <FaUser className="text-emerald-600" />
                <div>
                  <p className="text-sm text-gray-600">Membre depuis</p>
                  <p className="font-medium text-gray-900">{userStats.memberSince}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FaShoppingCart className="mr-2 text-emerald-600" />
              Mes Statistiques
            </h2>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Commandes passées</p>
                    <p className="text-2xl font-bold text-emerald-600">{userStats.totalOrders}</p>
                  </div>
                  <FaShoppingCart className="text-2xl text-emerald-600" />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Total dépensé</p>
                    <p className="text-2xl font-bold text-blue-600">{userStats.totalSpent.toFixed(2)} MAD</p>
                  </div>
                  <FaHeart className="text-2xl text-blue-600" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions Rapides */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions Rapides</h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/my-orders')}
              className="p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors text-center"
            >
              <FaShoppingCart className="text-2xl text-emerald-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Mes Commandes</p>
              <p className="text-sm text-gray-600">Voir l'historique</p>
            </button>
            
            <button
              onClick={() => navigate('/products')}
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center"
            >
              <FaHeart className="text-2xl text-blue-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Continuer mes achats</p>
              <p className="text-sm text-gray-600">Découvrir nos produits</p>
            </button>
            
            <button
              onClick={handleLogout}
              className="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-center"
            >
              <FaSignOutAlt className="text-2xl text-red-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Se déconnecter</p>
              <p className="text-sm text-gray-600">Quitter mon compte</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
