import { DashboardProvider } from "./context/DashboardContext"
import DashboardLayout from "./components/layout/DashboardLayout"
import DashboardRoutes from "./routes/DashboardRoutes"

export default function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardLayout>
        <DashboardRoutes />
      </DashboardLayout>
    </DashboardProvider>
  )
}

export { default as useDashboard } from "./hooks/useDashboard"
