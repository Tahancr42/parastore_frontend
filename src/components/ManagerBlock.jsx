import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ManagerBlock = ({ children }) => {
  const { user } = useAuth();

  // Si l'utilisateur est gestionnaire, le rediriger vers /gestionnaire
  if (user && user.role === 'GESTIONNAIRE') {
    return <Navigate to="/gestionnaire" replace />;
  }

  // Sinon, afficher le contenu normal
  return children;
};

export default ManagerBlock;
