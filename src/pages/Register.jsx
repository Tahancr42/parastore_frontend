import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../axiosInstance';


export default function Register() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Si l'utilisateur est déjà connecté, le rediriger vers la page d'accueil
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);
  const [form, setForm] = useState({
    nom: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (form.password !== form.confirmPassword) {
    alert("Les mots de passe ne correspondent pas !");
    return;
  }

  try {
    const response = await axios.post('/api/auth/register', {
      nom: form.nom,
      email: form.email,
      phone: form.phone,
      password: form.password,
      role:"ROLE_CLIENT"
    });
    console.log("Inscription réussie :", response.data);
    alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
    navigate('/');
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    alert("Erreur lors de l'inscription. Vérifie les champs ou réessaye plus tard.");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-emerald-700 mb-6">Créer un compte</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nom"
            placeholder="Nom complet"
            value={form.nom}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Adresse e-mail"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Numéro de téléphone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmez le mot de passe"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-full font-semibold shadow cursor-pointer hover:bg-emerald-700 hover:shadow-lg hover:scale-105 transition-transform duration-200"
          >
            S'inscrire
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Vous avez déjà un compte ? <a href="/login" className="text-emerald-600 hover:underline">Se connecter</a>
        </p>
      </div>
    </div>
  );
}
