import React from 'react';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ produit }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl hover:border-2 hover:border-emerald-300 transition-all duration-300 flex flex-col h-full border-2 border-transparent">
      <img
        src={produit.imageUrl}
        alt={produit.name}
        className="mx-auto w-36 h-44 object-contain mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{produit.name}</h3>
      <p className="text-emerald-600 font-bold mb-2">{produit.price} MAD</p>
      {produit.description && (
        <p className="text-gray-600 text-sm mb-4">{produit.description}</p>
      )}
      <div className="mt-auto">
        <AddToCartButton product={produit} />
      </div>
    </div>
  );
}