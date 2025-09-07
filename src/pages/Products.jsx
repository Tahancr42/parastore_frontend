import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { productsData } from '../data/products';
import axios from '../axiosInstance';

export default function Products() {
  const categories = [
    'Soins du visage et de la peau',
    'Compléments alimentaires et bien-être',
    'Hygiène & soins corporels',
  ];

  const [activeCategory, setActiveCategory] = useState('Toutes');
  const [allProducts, setAllProducts] = useState(productsData); // Utiliser les données locales avec prix en MAD

  useEffect(() => {
    // Essayer d'abord l'API, sinon utiliser les données locales
    axios.get('/api/products')
      .then(res => {
        if (res.data && res.data.length > 0) {
          setAllProducts(res.data);
        }
      })
      .catch(err => {
        console.log('API non disponible, utilisation des données locales avec prix en MAD');
        // Les données locales sont déjà définies par défaut
      });
  }, []);

  const filteredProducts =
    activeCategory === 'Toutes'
      ? allProducts
      : allProducts.filter(p => p.category === activeCategory);
      

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-emerald-700 mb-8">Nos Produits</h1>

      {/* FILTRES */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <button
          onClick={() => setActiveCategory('Toutes')}
          className={`px-4 py-2 rounded-full text-sm font-medium border ${activeCategory === 'Toutes'
            ? 'bg-emerald-600 text-white'
            : 'bg-white text-emerald-600 border-emerald-600'
            }`}
        >
          Toutes
        </button>
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium border ${activeCategory === cat
              ? 'bg-emerald-600 text-white'
              : 'bg-white text-emerald-600 border-emerald-600'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* AFFICHAGE DES PRODUITS */} 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} produit={product} />
        ))}
      </div>
    </div>
  );
}