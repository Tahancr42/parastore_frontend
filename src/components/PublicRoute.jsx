import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  // Si l'utilisateur est connecté, le rediriger vers la page d'accueil
  if (user) {
    return <Navigate to="/" replace />;
  }

  // Sinon, afficher la page demandée (login/register)
  return children;
};

export default PublicRoute;
