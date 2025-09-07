import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { messageApi } from '../api/messages';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaReply, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function Contact() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [userMessages, setUserMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);

  // Rediriger vers la page d'accueil si l'utilisateur n'est pas connecté
  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Charger les messages de l'utilisateur connecté
  const loadUserMessages = async () => {
    if (!user?.email) return;
    
    try {
      setMessagesLoading(true);
      const allMessages = await messageApi.getAllMessages();
      // Filtrer les messages de l'utilisateur connecté
      const userMessages = allMessages.filter(msg => msg.email === user.email);
      setUserMessages(userMessages);
    } catch (error) {
      console.error('Erreur lors du chargement des messages:', error);
      toast.error('Erreur lors du chargement de vos messages');
    } finally {
      setMessagesLoading(false);
    }
  };

  // Charger les messages au montage du composant si l'utilisateur est connecté
  useEffect(() => {
    if (user?.email) {
      loadUserMessages();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      await messageApi.sendMessage(formData);
      toast.success('Message envoyé avec succès ! Nous vous répondrons bientôt.');
      setFormData({ fullName: '', email: '', message: '' });
      
      // Recharger les messages après envoi
      if (user?.email) {
        loadUserMessages();
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      toast.error('Erreur lors de l\'envoi du message. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'NEW':
        return <FaClock className="w-4 h-4 text-yellow-600" />;
      case 'READ':
        return <FaCheckCircle className="w-4 h-4 text-blue-600" />;
      case 'RESPONDED':
        return <FaReply className="w-4 h-4 text-green-600" />;
      default:
        return <FaEnvelope className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'NEW':
        return 'En attente de lecture';
      case 'READ':
        return 'Lu par notre équipe';
      case 'RESPONDED':
        return 'Répondu par notre équipe';
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'NEW':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'READ':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'RESPONDED':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header avec bouton pour voir les messages */}
        {user && (
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-emerald-700">Contact & Support</h1>
            <button
              onClick={() => setShowMessages(!showMessages)}
              className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 flex items-center"
            >
              <FaEnvelope className="mr-2" />
              {showMessages ? 'Masquer mes messages' : 'Voir mes messages'}
            </button>
          </div>
        )}

        {/* Section des messages de l'utilisateur */}
        {user && showMessages && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Mes Messages</h2>
            
            {messagesLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                <p className="mt-2 text-gray-600">Chargement de vos messages...</p>
              </div>
            ) : userMessages.length === 0 ? (
              <div className="text-center py-8">
                <FaEnvelope className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun message envoyé</h3>
                <p className="text-gray-600">Vous n'avez pas encore envoyé de message</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userMessages.map((message) => (
                  <div key={message.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">Message #{message.id}</h4>
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(message.status)}`}>
                            {getStatusIcon(message.status)}
                            <span className="ml-1">{getStatusText(message.status)}</span>
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">
                          Envoyé le {new Date(message.createdAt).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                    </div>

                    {message.response && (
                      <div className="mt-3 p-3 bg-emerald-50 border-l-4 border-emerald-400 rounded">
                        <h5 className="font-semibold text-emerald-800 mb-1 flex items-center">
                          <FaReply className="mr-2" />
                          Réponse de notre équipe :
                        </h5>
                        <p className="text-emerald-700 whitespace-pre-wrap">{message.response}</p>
                        <p className="text-xs text-emerald-600 mt-1">
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
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-10">
          {/* Formulaire */}
          <div className="bg-white p-8 rounded shadow">
            <h2 className="text-3xl font-bold text-center text-emerald-700 mb-6">Contactez-nous</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-1 font-semibold">Nom complet</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  minLength="2"
                  maxLength="100"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Adresse email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength="10"
                  maxLength="1000"
                  rows="5"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Décrivez votre question ou demande..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 rounded-full shadow transition-all duration-200 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:scale-105 cursor-pointer'
                } text-white`}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
              </button>
            </form>
          </div>

          {/* Coordonnées */}
          <div className="bg-white p-8 rounded shadow space-y-6">
            <h2 className="text-2xl font-bold text-emerald-600">Nos coordonnées</h2>
            <p className="text-gray-700">N'hésitez pas à nous contacter pour toute question ou information.</p>
            <div className="space-y-3">
              <div>
                <span className="font-semibold">📍 Adresse :</span>
                <p>123 Boulevard Santé, Casablanca, Maroc</p>
              </div>
              <div>
                <span className="font-semibold">📞 Téléphone :</span>
                <p>+212 6 00 00 00 00</p>
              </div>
              <div>
                <span className="font-semibold">✉️ Email :</span>
                <p>contact@parastore.ma</p>
              </div>
              <div>
                <span className="font-semibold">🕐 Horaires :</span>
                <p>Lundi - Vendredi : 9h - 18h</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
