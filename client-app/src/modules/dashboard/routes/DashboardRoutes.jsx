import { Routes, Route, Navigate } from "react-router-dom"
import { useDashboardContext } from "../context/DashboardContext"

// Páginas de comprador
import BuyerDashboard from "../pages/buyer/BuyerDashboard"
import Orders from "../pages/buyer/Orders"
import OrderDetail from "../pages/buyer/OrderDetail"
import Favorites from "../pages/buyer/Favorites"
import BuyerProfile from "../pages/buyer/BuyerProfile"

// Páginas de vendedor
import SellerDashboard from "../pages/seller/SellerDashboard"
import Products from "../pages/seller/Products"
import AddProduct from "../pages/seller/AddProduct"
import EditProduct from "../pages/seller/EditProduct"
import SellerOrders from "../pages/seller/SellerOrders"
import Analytics from "../pages/seller/Analytics"
import SellerStore from "../pages/seller/SellerStore"
import Finances from "../pages/seller/Finances"

// Página de configuración común
import Settings from "../pages/common/Settings"

const DashboardRoutes = () => {
  const { userRole } = useDashboardContext()

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
      <Route path="/settings" element={<Settings />} />

      {/* Redirección para rutas no encontradas */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default DashboardRoutes
