import { createContext, useState, useContext, useEffect } from "react";
import axios from "../axiosInstance";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Restauration session + header axios
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    if (token && role && userId) {
      setUser({ email, role, userId });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
      // Redirection automatique pour l'admin
      if (role === 'ADMIN' && window.location.pathname !== '/admin') {
        window.location.href = '/admin';
      }
      
      // Redirection automatique pour le gestionnaire
      if (role === 'GESTIONNAIRE' && window.location.pathname !== '/gestionnaire') {
        window.location.href = '/gestionnaire';
      }
    }
  }, []);

  // LOGIN UNIQUE -> le backend renvoie { token, role, userId }
  const login = async ({ email, password }) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const { token, role, userId } = res.data;

      // Save
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser({ email, role, userId });
      toast.success("Connexion réussie !");
      return role; // on renvoie le rôle pour faciliter la redirection
    } catch (error) {
      console.error("Erreur de connexion :", error?.response?.data || error.message);
      toast.error("Échec de la connexion !");
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    toast.info("Déconnexion effectuée.");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
