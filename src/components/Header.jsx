import { FaUser, FaSignOutAlt, FaShoppingCart } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';
import logo from '../../public/Parastore (1).png';
import { useAuth } from '../context/AuthContext';
import CartIcon from './CartIcon';

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-lg bg-white border-b-2 border-emerald-200">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-16 w-16 object-contain" />
        <Link to="/" className="text-2xl font-bold text-emerald-600 hover:text-emerald-800 transition">
          ParaStore
        </Link>
      </div>

      <nav className="flex gap-6 text-sm sm:text-base font-medium text-gray-600">
        <NavLink to="/" className={({ isActive }) => isActive ? "text-emerald-700 font-semibold underline underline-offset-4" : "hover:text-emerald-600 transition"}>Home</NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? "text-emerald-700 font-semibold underline underline-offset-4" : "hover:text-emerald-600 transition"}>Products</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "text-emerald-700 font-semibold underline underline-offset-4" : "hover:text-emerald-600 transition"}>About Us</NavLink>
        {user && (
          <NavLink to="/contact" className={({ isActive }) => isActive ? "text-emerald-700 font-semibold underline underline-offset-4" : "hover:text-emerald-600 transition"}>Contact</NavLink>
        )}

        {user?.role === 'GESTIONNAIRE' && (
          <NavLink to="/gestionnaire" className={({ isActive }) => isActive ? "text-emerald-700 font-semibold underline underline-offset-4" : "hover:text-emerald-600 transition"}>Gestionnaire</NavLink>
        )}
        {user?.role === 'ADMIN' && (
          <NavLink to="/admin" className={({ isActive }) => isActive ? "text-emerald-700 font-semibold underline underline-offset-4" : "hover:text-emerald-600 transition"}>Admin</NavLink>
        )}
      </nav>

      <div className="flex gap-4 text-emerald-600 text-lg items-center">
        {user ? (
          <>
            {user.role === 'CLIENT' && (
              <Link to="/my-orders" className="text-emerald-600 hover:text-emerald-800 transition flex items-center gap-1">
                <FaShoppingCart className="cursor-pointer" />
                <span className="text-sm hidden sm:inline">Mes Commandes</span>
              </Link>
            )}
            <Link to="/profile" className="text-emerald-600 hover:text-emerald-800 transition flex items-center gap-1">
              <FaUser className="cursor-pointer" />
              <span className="text-sm hidden sm:inline">Profil</span>
            </Link>
            <FaSignOutAlt
              onClick={logout}
              className="cursor-pointer text-red-500 hover:text-red-700 text-lg"
              title="Se déconnecter"
            />
          </>
        ) : (
          <Link
            to="/login"
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <FaUser className="text-sm" />
            <span className="text-sm font-semibold">Se connecter</span>
          </Link>
        )}
        <CartIcon />
      </div>
    </header>
  );
}

export default Header;
