import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("utilisateur"); // UI uniquement

  // Fonction pour changer le type d'utilisateur et vider les champs
  const handleUserTypeChange = (newType) => {
    setUserType(newType);
    setEmail("");
    setPassword("");
  };

  // Si déjà connecté -> rediriger selon rôle
  useEffect(() => {
    if (user) {
      if (user.role === "ADMIN") navigate("/admin", { replace: true });
      else if (user.role === "GESTIONNAIRE") navigate("/gestionnaire", { replace: true });
      else navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = await login({ email, password }); // login unique
    if (!role) return;

    if (role === "ADMIN") navigate("/admin", { replace: true });
    else if (role === "GESTIONNAIRE") navigate("/gestionnaire", { replace: true });
    else navigate("/", { replace: true }); // CLIENT (ou défaut)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-3xl font-bold text-center text-emerald-700 mb-6">Connexion</h2>

        {/* Sélecteur visuel (ne change pas l'API) */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-700 font-medium">Type de connexion</label>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => handleUserTypeChange("utilisateur")}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                userType === "utilisateur"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Utilisateur
            </button>
            <button
              type="button"
              onClick={() => handleUserTypeChange("admin")}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                userType === "admin"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Administrateur
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700">Adresse Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Mot de passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="votre mot de passe"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 rounded-full shadow cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-200 ${
              userType === "admin"
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            Se connecter en tant que {userType === "admin" ? "Administrateur" : "Utilisateur"}
          </button>
        </form>

        {userType === "utilisateur" && (
          <p className="text-center mt-4 text-sm text-gray-600">
            Vous n'avez pas de compte ?{" "}
            <Link to="/register" className="text-emerald-600 hover:underline">
              Créer un compte
            </Link>
          </p>
        )}

      </div>
    </div>
  );
};

export default Login;
