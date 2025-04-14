import { Routes, Route, Navigate } from "react-router-dom"
import { useDashboardContext } from "../context/DashboardContext"
import { useState } from "react";

// Páginas de comprador
import BuyerDashboard from "../features/buyer-dashboard/pages/BuyerDashboard"
import Orders from "../features/orders/pages/Orders"
import OrderDetail from "../features/orders/pages/OrderDetail"
import Favorites from "../features/favorites/pages/Favorites"
import BuyerProfile from "../features/profile/pages/BuyerProfile"

// Páginas de vendedor
import SellerDashboard from "../features/seller-dashboard/pages/SellerDashboard"
import Products from "../features/products/pages/Products"
import AddProduct from "../features/products/pages/AddProduct"
import EditProduct from "../features/products/pages/EditProduct"
import SellerOrders from "../pages/seller/SellerOrders"
import Analytics from "../pages/seller/Analytics"
import SellerStore from "../pages/seller/SellerStore"
import Finances from "../pages/seller/Finances"

// Página de configuración común
import Settings from "../pages/common/Settings"

const DashboardRoutes = () => {
 // const { userRole } = useDashboardContext()
 const [userRole, setUserRole] = useState("seller");

  return (
    <Routes>
      {/* Ruta principal del dashboard */}
      <Route path="/" element={userRole === "buyer" ? <BuyerDashboard /> : <SellerDashboard />} />

      {/* Rutas de comprador */}
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:id" element={<OrderDetail />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/profile" element={<BuyerProfile />} />

      {/* Rutas de vendedor */}
      <Route path="/seller/store" element={<SellerStore />} />
      <Route path="/seller/products" element={<Products />} />
      <Route path="/seller/products/add" element={<AddProduct />} />
      <Route path="/seller/products/edit/:id" element={<EditProduct />} />
      <Route path="/seller/orders" element={<SellerOrders />} />
      <Route path="/seller/analytics" element={<Analytics />} />
      <Route path="/seller/finances" element={<Finances />} />

      {/* Configuración (común) */}
      {/*<Route path="/settings" element={<Settings />} />

      {/* Redirección para rutas no encontradas */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default DashboardRoutes
