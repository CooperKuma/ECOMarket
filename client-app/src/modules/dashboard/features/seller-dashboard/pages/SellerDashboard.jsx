import { Box, Heading } from "@chakra-ui/react"
import SellerStatCards from "../components/SellerStatCards"
import RecentOrdersTable from "../components/RecentOrdersTable"
import TopProductsTable from "../components/TopProductsTable"
import SalesPerformance from "../components/SalesPerformance"
import { SimpleGrid } from "@chakra-ui/react"

const SellerDashboard = () => {
  return (
    <Box>
      <Heading mb={6}>Panel de Vendedor</Heading>

      <SellerStatCards />

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={8}>
        <RecentOrdersTable />
        <TopProductsTable />
      </SimpleGrid>

      <SalesPerformance />
    </Box>
  )
}

export default SellerDashboard
