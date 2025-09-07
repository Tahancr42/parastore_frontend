import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Products from './pages/Products';
import About from './pages/About';
import Cart from './pages/Cart';
import TestCart from './pages/TestCart';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import PublicRoute from './components/PublicRoute';
import ManagerRoute from './components/ManagerRoute';
import ManagerBlock from './components/ManagerBlock';
import AdminBlock from './components/AdminBlock';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import MyOrders from './pages/MyOrders';
import ManagerDashboard from './pages/ManagerDashboard';

function App() {
  return (
    <Routes>
      {/* Routes publiques avec Header et Footer - BLOQUÉES pour admin et gestionnaire */}
      <Route path="/*" element={
        <AdminBlock>
          <ManagerBlock>
            <Header />
            <main className="mt-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/products" element={<Products />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                         <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
                         <Route path="/test-cart" element={<PrivateRoute><TestCart /></PrivateRoute>} />
                         <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                         <Route path="/my-orders" element={<PrivateRoute><MyOrders /></PrivateRoute>} />
              </Routes>
            </main>
            <Footer />
          </ManagerBlock>
        </AdminBlock>
      } />
      
      {/* Route Admin complètement isolée - SANS Header ni Footer */}
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      
      {/* Route Gestionnaire complètement isolée - SANS Header ni Footer */}
      <Route path="/gestionnaire" element={<ManagerRoute><ManagerDashboard /></ManagerRoute>} />
    </Routes>
  );
}

export default App;
