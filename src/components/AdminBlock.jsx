import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminBlock = ({ children }) => {
  const { user } = useAuth();

  // Si l'utilisateur est admin, le rediriger vers /admin
  if (user && user.role === 'ADMIN') {
    return <Navigate to="/admin" replace />;
  }

  // Sinon, afficher le contenu normal
  return children;
};

export default AdminBlock;
