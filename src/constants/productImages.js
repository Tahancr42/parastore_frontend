// Configuration des images des produits avec toutes les images disponibles
export const productImages = {
  // Vitamines et compléments
  'vitamine-c': '/vitamine.jpg',
  'vitamine-d': '/vitamine.jpg',
  'vitamine-b12': '/vitamine.jpg',
  'omega-3': '/oenobiol.jpg',
  'magnesium': '/zohi_sommeil.jpg',
  'zinc': '/zohi_energie.jpg',
  'fer': '/comp1.jpg',
  'calcium': '/vitamine.jpg',
  
  // Probiotiques et santé digestive
  'probiotiques': '/oenobiol.jpg',
  'collagene': '/serum_roche.jpg',
  'biotine': '/serumc_roche.jpg',
  'coenzyme-q10': '/zohi_energie.jpg',
  
  // Soins du visage
  'creme-hydratante': '/nuxe_corps.jpg',
  'serum-vitamine-c': '/serum_roche.jpg',
  'gel-nettoyant': '/gel_mousant_bebe_bioderma.jpg',
  'masque-visage': '/nuxe_gommage.jpg',
  
  // Soins du corps
  'lait-corps': '/nuxe_corps.jpg',
  'huile-douce': '/nuxe_sun_huile.jpg',
  'deodorant': '/deo_hygiène.png',
  'gel-douche': '/gl_douche_atoderm_hygiene.jpg',
  
  // Hygiène bucco-dentaire
  'dentifrice': '/deo_hygiène.png',
  'brosse-dents': '/deo_hygiène.png',
  'bain-bouche': '/deo_hygiène.png',
  'fil-dentaire': '/deo_hygiène.png',
  
  // Santé féminine
  'supplements-femme': '/oenobiol.jpg',
  'soins-intimes': '/deo_hygiène.png',
  
  // Santé masculine
  'supplements-homme': '/zohi_energie.jpg',
  'soins-barbe': '/kipkar.jpg',
  
  // Bébé et enfant
  'vitamines-bebe': '/vitamine.jpg',
  'soins-bebe': '/gel_mousant_bebe_bioderma.jpg',
  
  // Santé animale
  'vitamines-chien': '/oenobiol.jpg',
  'vitamines-chat': '/oenobiol.jpg',
  
  // Image par défaut
  'default': '/vitamine.jpg'
};

// Toutes les images disponibles pour fallback
export const allAvailableImages = [
  '/vitamine.jpg',
  '/oenobiol.jpg',
  '/zohi_sommeil.jpg',
  '/zohi_energie.jpg',
  '/comp1.jpg',
  '/serum_roche.jpg',
  '/serumc_roche.jpg',
  '/nuxe_corps.jpg',
  '/nuxe_gommage.jpg',
  '/nuxe_sun_huile.jpg',
  '/gel_mousant_bebe_bioderma.jpg',
  '/deo_hygiène.png',
  '/gl_douche_atoderm_hygiene.jpg',
  '/kipkar.jpg',
  '/effaclar.jpg',
  '/cicaplast.jpg',
  '/atoderm_in.jpg'
];

// Fonction pour obtenir l'image d'un produit
export const getProductImage = (productName, productId) => {
  if (!productName) return productImages.default;
  
  const name = productName.toLowerCase();
  
  // Recherche par mots-clés dans le nom
  if (name.includes('vitamine c') || name.includes('vitamine-c')) return productImages['vitamine-c'];
  if (name.includes('vitamine d') || name.includes('vitamine-d')) return productImages['vitamine-d'];
  if (name.includes('vitamine b12') || name.includes('vitamine-b12')) return productImages['vitamine-b12'];
  if (name.includes('omega') || name.includes('oméga')) return productImages['omega-3'];
  if (name.includes('magnésium') || name.includes('magnesium')) return productImages['magnesium'];
  if (name.includes('zinc')) return productImages['zinc'];
  if (name.includes('fer')) return productImages['fer'];
  if (name.includes('calcium')) return productImages['calcium'];
  if (name.includes('probiotique')) return productImages['probiotiques'];
  if (name.includes('collagène') || name.includes('collagene')) return productImages['collagene'];
  if (name.includes('biotine')) return productImages['biotine'];
  if (name.includes('coenzyme')) return productImages['coenzyme-q10'];
  
  // Recherche par catégorie
  if (name.includes('crème') || name.includes('creme')) return productImages['creme-hydratante'];
  if (name.includes('sérum') || name.includes('serum')) return productImages['serum-vitamine-c'];
  if (name.includes('gel') && name.includes('nettoyant')) return productImages['gel-nettoyant'];
  if (name.includes('masque')) return productImages['masque-visage'];
  if (name.includes('lait') && name.includes('corps')) return productImages['lait-corps'];
  if (name.includes('huile') && name.includes('douche')) return productImages['huile-douce'];
  if (name.includes('déodorant') || name.includes('deodorant')) return productImages['deodorant'];
  if (name.includes('dentifrice')) return productImages['dentifrice'];
  if (name.includes('brosse') && name.includes('dents')) return productImages['brosse-dents'];
  
  // Retourner l'image par défaut si aucune correspondance
  return productImages.default;
};

// Fonction pour obtenir une image aléatoire
export const getRandomProductImage = () => {
  const images = Object.values(productImages);
  return images[Math.floor(Math.random() * images.length)];
};

// Fonction pour obtenir une image par ID de produit (garantit une image différente)
export const getProductImageById = (productId) => {
  const index = (productId - 1) % allAvailableImages.length;
  return allAvailableImages[index];
};

// Fonction pour obtenir une image garantie (avec fallback multiple)
export const getGuaranteedProductImage = (productName, productId) => {
  // Essayer d'abord la fonction normale
  const normalImage = getProductImage(productName, productId);
  if (normalImage && normalImage !== productImages.default) {
    return normalImage;
  }
  
  // Sinon, utiliser l'ID du produit pour garantir une image
  return getProductImageById(productId);
};

// Fonction pour vérifier si une image existe
export const imageExists = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
};
