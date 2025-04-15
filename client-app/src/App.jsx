// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./modules/home/pages/HomePage";
import LoginPage from "./modules/auth/pages/LoginPage";
import RegisterPage from "./modules/auth/pages/RegisterPage";
import Dashboard from "./modules/dashboard/index";
import CatalogPage from "./modules/catalog/pages/CatalogPage";
import ProductDetailPage from "./modules/product-detail/pages/ProductDetailPage"
import ContactPage from "./modules/contact/pages/ContactPage";
import SupportPage from "./modules/support/components/ContactOptions";
import { CartPage } from "./modules/cart"

function App() {
  return (
    <Routes>
    {/* Rutas públicas con Navbar/Footer */}
    <Route element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog/:category" element={<CatalogPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/offers" element={<CatalogPage />} />
    </Route>

    {/* Dashboard: layout independiente */}
    <Route path="/dashboard/*" element={<Dashboard />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
  </Routes>
  );
}
export default App;
