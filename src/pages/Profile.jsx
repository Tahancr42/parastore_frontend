import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaShoppingCart, FaHeart, FaCog, FaSignOutAlt, FaEdit } from 'react-icons/fa';
import axios from '../axiosInstance';

const Profile = () => {
  const { user, logout, updateUserInfo } = useAuth();
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState({
    totalOrders: 0,
    totalSpent: 0
  });
  const [loading, setLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    email: user?.email || ''
  });
  const [editLoading, setEditLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Ouvrir le formulaire de modification
  const handleEditClick = () => {
    setEditForm({
      name: user?.name || '',
      phone: user?.phone || '',
      email: user?.email || ''
    });
    setShowEditForm(true);
  };

  // Fermer le formulaire de modification
  const handleCancelEdit = () => {
    setShowEditForm(false);
    setEditForm({
      name: '',
      phone: '',
      email: user?.email || ''
    });
  };

  // Gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Sauvegarder les modifications
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!user?.userId) return;

    try {
      setEditLoading(true);
      
      // Appel API pour mettre à jour les informations utilisateur
      const response = await axios.put(`/api/user/profile/${user.userId}`, {
        name: editForm.name,
        phone: editForm.phone,
        email: editForm.email
      });

      if (response.data) {
        // Mettre à jour les informations dans le contexte d'authentification
        updateUserInfo({
          name: editForm.name,
          phone: editForm.phone,
          email: editForm.email
        });
        
        alert('Informations mises à jour avec succès !');
        setShowEditForm(false);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      alert('Erreur lors de la mise à jour des informations');
    } finally {
      setEditLoading(false);
    }
  };

  // Charger les informations utilisateur et les statistiques
  useEffect(() => {
    const loadUserData = async () => {
      if (!user?.userId) return;
      
      try {
        setLoading(true);
        
        // Récupérer les informations complètes de l'utilisateur
        try {
          const userResponse = await axios.get(`/api/user/profile?userId=${user.userId}`);
          if (userResponse.data) {
            updateUserInfo({
              name: userResponse.data.name,
              phone: userResponse.data.phone,
              email: userResponse.data.email
            });
          }
        } catch (userError) {
          console.warn('Erreur lors du chargement des informations utilisateur:', userError);
          // Continuer même si les infos utilisateur échouent
        }
        
        // Récupérer les commandes de l'utilisateur
        try {
          const ordersResponse = await axios.get(`/api/orders/by-user/${user.userId}`);
          const orders = ordersResponse.data || [];
          
          const totalOrders = orders.length;
          const totalSpent = orders.reduce((total, order) => total + (order.totalPrice || 0), 0);
          
          setUserStats({
            totalOrders,
            totalSpent
          });
          
          console.log('Statistiques chargées:', { totalOrders, totalSpent });
        } catch (ordersError) {
          console.error('Erreur lors du chargement des commandes:', ordersError);
          // Définir des valeurs par défaut en cas d'erreur
          setUserStats({
            totalOrders: 0,
            totalSpent: 0
          });
        }
      } catch (error) {
        console.error('Erreur générale lors du chargement des données:', error);
        setUserStats({
          totalOrders: 0,
          totalSpent: 0
        });
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user?.userId]);

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
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <FaUser className="text-emerald-600" />
                <div>
                  <p className="text-sm text-gray-600">Nom complet</p>
                  <p className="font-medium text-gray-900">{user?.name || 'Non renseigné'}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <FaEnvelope className="text-emerald-600" />
                <div>
                  <p className="text-sm text-gray-600">Adresse email</p>
                  <p className="font-medium text-gray-900">{email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <FaPhone className="text-emerald-600" />
                <div>
                  <p className="text-sm text-gray-600">Téléphone</p>
                  <p className="font-medium text-gray-900">{user?.phone || 'Non renseigné'}</p>
                </div>
              </div>
            </div>

            <button 
              onClick={handleEditClick}
              className="mt-4 w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center"
            >
              <FaEdit className="mr-2" />
              Modifier mes informations
            </button>
          </div>

          {/* Statistiques */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <FaShoppingCart className="mr-2 text-emerald-600" />
                Mes Statistiques
              </h2>
              <button
                onClick={() => {
                  setLoading(true);
                  const loadUserData = async () => {
                    if (!user?.userId) return;
                    
                    try {
                      const ordersResponse = await axios.get(`/api/orders/by-user/${user.userId}`);
                      const orders = ordersResponse.data || [];
                      
                      const totalOrders = orders.length;
                      const totalSpent = orders.reduce((total, order) => total + (order.totalPrice || 0), 0);
                      
                      setUserStats({
                        totalOrders,
                        totalSpent
                      });
                    } catch (error) {
                      console.error('Erreur lors du rechargement des statistiques:', error);
                    } finally {
                      setLoading(false);
                    }
                  };
                  loadUserData();
                }}
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                disabled={loading}
              >
                {loading ? 'Chargement...' : 'Actualiser'}
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Commandes passées</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {typeof userStats.totalOrders === 'number' ? userStats.totalOrders : 0}
                    </p>
                  </div>
                  <FaShoppingCart className="text-2xl text-emerald-600" />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Total dépensé</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {typeof userStats.totalSpent === 'number' ? userStats.totalSpent.toFixed(2) : '0.00'} MAD
                    </p>
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

      {/* Modal de modification des informations */}
      {showEditForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Modifier mes informations
                </h3>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Votre nom complet"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={editForm.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Votre numéro de téléphone"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Votre adresse email"
                    required
                  />
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={editLoading}
                    className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {editLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sauvegarde...
                      </>
                    ) : (
                      'Sauvegarder'
                    )}
      </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
