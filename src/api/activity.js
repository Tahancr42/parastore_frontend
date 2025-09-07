// Service pour gérer l'activité récente
export const activityService = {
  // Clés pour le localStorage selon le rôle
  ACTIVITY_KEYS: {
    ADMIN: 'admin_recent_activity',
    GESTIONNAIRE: 'gestionnaire_recent_activity'
  },
  
  // Ajouter une activité selon le rôle
  addActivity: (role, type, description, details = {}) => {
    const activity = {
      id: Date.now(),
      type, // 'product_created', 'product_updated', 'product_deleted', 'user_created', etc.
      description,
      details,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString('fr-FR'),
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };
    
    // Récupérer les activités existantes pour ce rôle
    const existingActivities = activityService.getActivities(role);
    
    // Ajouter la nouvelle activité en premier
    const updatedActivities = [activity, ...existingActivities].slice(0, 10); // Garder seulement les 10 dernières
    
    // Sauvegarder dans localStorage avec la clé du rôle
    const activityKey = activityService.ACTIVITY_KEYS[role] || activityService.ACTIVITY_KEYS.GESTIONNAIRE;
    localStorage.setItem(activityKey, JSON.stringify(updatedActivities));
    
    return activity;
  },
  
  // Récupérer les activités selon le rôle
  getActivities: (role = 'GESTIONNAIRE') => {
    try {
      const activityKey = activityService.ACTIVITY_KEYS[role] || activityService.ACTIVITY_KEYS.GESTIONNAIRE;
      const activities = localStorage.getItem(activityKey);
      return activities ? JSON.parse(activities) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération des activités:', error);
      return [];
    }
  },
  
  // Nettoyer les activités selon le rôle
  clearActivities: (role = 'GESTIONNAIRE') => {
    const activityKey = activityService.ACTIVITY_KEYS[role] || activityService.ACTIVITY_KEYS.GESTIONNAIRE;
    localStorage.removeItem(activityKey);
  },
  
  // Nettoyer toutes les activités
  clearAllActivities: () => {
    Object.values(activityService.ACTIVITY_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};
