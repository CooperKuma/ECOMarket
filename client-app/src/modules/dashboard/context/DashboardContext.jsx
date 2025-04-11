"use client"

import { createContext, useContext, useState, useEffect } from "react"

const DashboardContext = createContext()

export const DashboardProvider = ({ children }) => {
  const [userRole, setUserRole] = useState("buyer") // 'buyer' o 'seller'
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

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

  const toggleUserRole = () => {
    setUserRole(userRole === "buyer" ? "seller" : "buyer")
  }

  return (
    <DashboardContext.Provider
      value={{
        userRole,
        setUserRole,
        toggleUserRole,
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar,
        isMobile,
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
