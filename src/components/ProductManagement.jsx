import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaPlus, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaImage,
  FaSave,
  FaTimes,
  FaDownload
} from 'react-icons/fa';
import { productsData } from '../data/products';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Initialiser avec les données des produits
  useEffect(() => {
    setProducts(productsData);
    setFilteredProducts(productsData);
  }, []);

  // Filtrer les produits
  useEffect(() => {
    let filtered = products;

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par catégorie
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, categoryFilter]);

  // Fonction pour formater le prix en MAD
  const formatPrice = (price) => {
    return `${price.toFixed(2)} MAD`;
  };

  // Fonction pour ouvrir le modal d'ajout/édition
  const openProductModal = (product = null) => {
    if (product) {
      setSelectedProduct({ ...product });
      setIsEditing(true);
    } else {
      setSelectedProduct({
        id: Date.now(),
        name: '',
        price: 0,
        description: '',
        imageUrl: '/vitamine.jpg',
        category: 'Compléments alimentaires et bien-être',
        available: true
      });
      setIsEditing(false);
    }
    setShowProductModal(true);
  };

  // Fonction pour sauvegarder un produit
  const saveProduct = () => {
    if (!selectedProduct.name || !selectedProduct.price) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (isEditing) {
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product.id === selectedProduct.id ? selectedProduct : product
        )
      );
    } else {
      setProducts(prevProducts => [...prevProducts, selectedProduct]);
    }

    setShowProductModal(false);
    setSelectedProduct(null);
    setIsEditing(false);
  };

  // Fonction pour supprimer un produit
  const deleteProduct = (productId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    }
  };

  // Fonction pour basculer la disponibilité
  const toggleAvailability = (productId) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? { ...product, available: !product.available }
          : product
      )
    );
  };

  // Obtenir les catégories uniques
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="min-h-screen bg-emerald-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-emerald-200 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Gestion des Produits</h1>
              <p className="text-gray-600 mt-1">Gérez votre catalogue de produits</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => openProductModal()}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <FaPlus className="text-sm" />
                Ajouter un produit
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg flex items-center gap-2">
                <FaDownload className="text-sm" />
                Exporter
              </button>
            </div>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-emerald-200 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Barre de recherche */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {/* Filtre par catégorie */}
            <div className="flex gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Toutes les catégories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Grille des produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg border-2 border-emerald-200 overflow-hidden hover:shadow-xl transition-shadow">
              {/* Image du produit */}
              <div className="relative h-48 bg-emerald-50">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = '/vitamine.jpg'; }}
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.available 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.available ? 'Disponible' : 'Indisponible'}
                  </span>
                </div>
              </div>

              {/* Informations du produit */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-emerald-600 font-bold text-lg mb-2">
                  {formatPrice(product.price)}
                </p>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-gray-500 text-xs mb-4">
                  {product.category}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openProductModal(product)}
                    className="flex-1 bg-emerald-600 text-white py-2 px-3 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <FaEdit className="text-xs" />
                    Modifier
                  </button>
                  <button
                    onClick={() => toggleAvailability(product.id)}
                    className={`px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                      product.available
                        ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    }`}
                  >
                    {product.available ? 'Masquer' : 'Afficher'}
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="px-3 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucun produit trouvé */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-emerald-300 mb-4">
              <FaImage className="mx-auto h-16 w-16" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
          </div>
        )}

        {/* Statistiques */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total des produits</p>
                <p className="text-2xl font-bold text-emerald-600">{products.length}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <FaImage className="text-2xl text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Produits disponibles</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {products.filter(p => p.available).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <FaCheckCircle className="text-2xl text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valeur totale</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {formatPrice(products.reduce((sum, p) => sum + p.price, 0))}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-emerald-600">₋</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal d'ajout/édition de produit */}
      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {isEditing ? 'Modifier le produit' : 'Ajouter un produit'}
                </h2>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); saveProduct(); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Nom du produit */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du produit *
                    </label>
                    <input
                      type="text"
                      value={selectedProduct.name}
                      onChange={(e) => setSelectedProduct({...selectedProduct, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Prix */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix (MAD) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={selectedProduct.price}
                      onChange={(e) => setSelectedProduct({...selectedProduct, price: parseFloat(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Catégorie */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catégorie
                    </label>
                    <select
                      value={selectedProduct.category}
                      onChange={(e) => setSelectedProduct({...selectedProduct, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="Compléments alimentaires et bien-être">Compléments alimentaires et bien-être</option>
                      <option value="Soins du visage et de la peau">Soins du visage et de la peau</option>
                      <option value="Soins du corps">Soins du corps</option>
                      <option value="Hygiène bucco-dentaire">Hygiène bucco-dentaire</option>
                      <option value="Santé féminine">Santé féminine</option>
                      <option value="Santé masculine">Santé masculine</option>
                      <option value="Bébé et enfant">Bébé et enfant</option>
                      <option value="Santé animale">Santé animale</option>
                    </select>
                  </div>

                  {/* URL de l'image */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL de l'image
                    </label>
                    <input
                      type="text"
                      value={selectedProduct.imageUrl}
                      onChange={(e) => setSelectedProduct({...selectedProduct, imageUrl: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="/vitamine.jpg"
                    />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={selectedProduct.description}
                      onChange={(e) => setSelectedProduct({...selectedProduct, description: e.target.value})}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  {/* Disponibilité */}
                  <div className="md:col-span-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedProduct.available}
                        onChange={(e) => setSelectedProduct({...selectedProduct, available: e.target.checked})}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Produit disponible</span>
                    </label>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <FaSave className="text-sm" />
                    {isEditing ? 'Mettre à jour' : 'Ajouter'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowProductModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                  >
                    Annuler
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

export default ProductManagement;
