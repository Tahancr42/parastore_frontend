// Configuration des couleurs du thème emerald
export const themeColors = {
  // Couleurs principales
  primary: {
    50: 'bg-emerald-50',
    100: 'bg-emerald-100',
    200: 'bg-emerald-200',
    300: 'bg-emerald-300',
    400: 'bg-emerald-400',
    500: 'bg-emerald-500',
    600: 'bg-emerald-600',
    700: 'bg-emerald-700',
    800: 'bg-emerald-800',
    900: 'bg-emerald-900',
  },
  
  // Couleurs de texte
  text: {
    primary: 'text-emerald-600',
    secondary: 'text-emerald-700',
    light: 'text-emerald-500',
    dark: 'text-emerald-800',
    white: 'text-white',
  },
  
  // Couleurs de bordure
  border: {
    primary: 'border-emerald-500',
    secondary: 'border-emerald-300',
    light: 'border-emerald-200',
    dark: 'border-emerald-700',
  },
  
  // Couleurs de fond
  background: {
    primary: 'bg-emerald-50',
    secondary: 'bg-emerald-100',
    white: 'bg-white',
    dark: 'bg-emerald-800',
  },
  
  // Gradients
  gradients: {
    primary: 'bg-gradient-to-r from-emerald-100 to-emerald-200',
    secondary: 'bg-gradient-to-br from-emerald-100 to-emerald-200',
    hero: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
  },
  
  // Couleurs d'état
  state: {
    hover: 'hover:bg-emerald-700',
    focus: 'focus:ring-emerald-500',
    active: 'bg-emerald-700',
  }
};

// Classes CSS prédéfinies pour les composants courants
export const componentClasses = {
  button: {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500',
    secondary: 'bg-white border border-emerald-600 text-emerald-600 hover:bg-emerald-50',
    outline: 'border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50',
  },
  
  card: {
    default: 'bg-white shadow-lg border-2 border-transparent hover:border-emerald-500',
    elevated: 'bg-white shadow-xl border-2 border-emerald-200',
  },
  
  input: {
    default: 'border-gray-300 focus:ring-emerald-500 focus:border-emerald-500',
  }
};
