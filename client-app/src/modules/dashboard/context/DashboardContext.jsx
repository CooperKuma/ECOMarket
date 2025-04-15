"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "../../../context/AuthContext"

const DashboardContext = createContext()

export const DashboardProvider = ({ children }) => {
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [activeView, setActiveView] = useState("buyer") // Para administradores que pueden cambiar de vista

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Función para cambiar la vista activa (solo para administradores)
  const toggleActiveView = () => {
    setActiveView(activeView === "buyer" ? "seller" : "buyer")
  }

  return (
    <DashboardContext.Provider
      value={{
        userRole: user?.role || "guest",
        activeView,
        toggleActiveView,
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar,
        isMobile,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error("useDashboardContext debe ser usado dentro de un DashboardProvider")
  }
  return context
}
