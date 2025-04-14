import { DashboardProvider } from "./context/DashboardContext"
import DashboardLayout from "./common/components/Layout"
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
