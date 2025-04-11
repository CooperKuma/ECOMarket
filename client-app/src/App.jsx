// src/App.jsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./modules/home/pages/HomePage";
import LoginPage from './modules/auth/pages/LoginPage';
import RegisterPage from "./modules/auth/pages/RegisterPage";
import DashboardMenu from "./modules/Menu/Pages/DashboardMenu";
import BuyerDashboard from "./modules/dashboard/pages/buyer/BuyerDashboard";
import SellerDashboard from "./modules/dashboard/pages/seller/SellerDashboard";
import OrderDetail from "./modules/dashboard/pages/buyer/OrderDetail";
import Orders from "./modules/dashboard/pages/buyer/Orders";
import AddProduct from "./modules/dashboard/pages/seller/AddProduct";
import Analytics from "./modules/dashboard/pages/seller/Analytics";
import Products from "./modules/dashboard/pages/seller/Products";
import SellerOrders from "./modules/dashboard/pages/seller/SellerOrders";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/menu" element={<DashboardMenu />} />
        <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
        <Route path="/dashboard/seller" element={<SellerDashboard />} /> 
        <Route path="/dashboard/orders" element={<Orders />} />
        <Route path="/dashboard/orders/orderId" element={<OrderDetail />} />
        <Route path="/dashboard/seller/orders" element={<SellerOrders />} />
        <Route path="/dashboard/seller/products" element={<Products />} />
        <Route path="/dashboard/seller/add-product" element={<AddProduct />} />
        <Route path="/dashboard/seller/analytics" element={<Analytics />} />        
        </Routes>
    </>
  );
}

export default App;
