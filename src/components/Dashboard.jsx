// ...imports identiques
const Gestionnaire = () => {
  const { user } = useAuth();
  // const { cartItems } = useCart(); // (facultatif si non utilisé ici)

  // ⛔️ Accès strict aux GESTIONNAIRE
  if (!user || user.role !== "GESTIONNAIRE") {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-emerald-300 mb-6">
            <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Accès restreint</h2>
          <p className="text-gray-600">Cette page est réservée aux gestionnaires.</p>
        </div>
      </div>
    );
  }

  // ...le reste de ton composant inchangé (statistiques, vues, etc.)
  // >>> conserve tout ce que tu as déjà après, sans le premier "if (!user || user.role !== 'admin')" <<<
};

export default Gestionnaire;
