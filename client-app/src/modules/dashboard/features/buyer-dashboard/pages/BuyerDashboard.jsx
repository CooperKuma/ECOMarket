import { Box, Heading, SimpleGrid } from "@chakra-ui/react"
import StatCards from "../components/StatCards"
import RecentOrdersTable from "../components/RecentOrdersTable"
import FavoritesPreview from "../components/FavoritesPreview"

const BuyerDashboard = () => {
  return (
    <Box>
      <Heading mb={6}>Bienvenido a tu Dashboard</Heading>

      <StatCards />

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <RecentOrdersTable />
        <FavoritesPreview />
      </SimpleGrid>
    </Box>
  )
}

export default BuyerDashboard
