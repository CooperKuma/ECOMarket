import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Card,
  CardHeader,
  CardBody,
  Text,
  Flex,
  Icon,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  VStack,
  Image,
  useColorModeValue,
} from "@chakra-ui/react"
import { FaShoppingBag, FaHeart, FaEye, FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"

const BuyerDashboard = () => {
  const cardBg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")

  // Datos de ejemplo
  const recentOrders = [
    { id: "ORD-1234", date: "2023-11-15", status: "Entregado", total: 1250 },
    { id: "ORD-1235", date: "2023-11-10", status: "En camino", total: 890 },
    { id: "ORD-1236", date: "2023-11-05", status: "Procesando", total: 2100 },
  ]

  const favoriteProducts = [
    { id: 1, name: "Smartphone XYZ", price: 12999, image: "/placeholder.svg" },
    { id: 2, name: "Laptop Ultra", price: 24999, image: "/placeholder.svg" },
    { id: 3, name: "Auriculares Pro", price: 2499, image: "/placeholder.svg" },
  ]

  return (
    <Box>
      <Heading mb={6}>Bienvenido a tu Dashboard</Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        <Card bg={cardBg} boxShadow="md" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <Flex align="center" mb={2}>
                <Icon as={FaShoppingBag} color="brand.primary.500" boxSize={5} mr={2} />
                <StatLabel fontSize="lg">Compras Totales</StatLabel>
              </Flex>
              <StatNumber>12</StatNumber>
              <StatHelpText>Desde que te uniste</StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg} boxShadow="md" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <Flex align="center" mb={2}>
                <Icon as={FaHeart} color="red.500" boxSize={5} mr={2} />
                <StatLabel fontSize="lg">Favoritos</StatLabel>
              </Flex>
              <StatNumber>8</StatNumber>
              <StatHelpText>Productos guardados</StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg} boxShadow="md" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <Flex align="center" mb={2}>
                <Icon as={FaEye} color="brand.secondary.500" boxSize={5} mr={2} />
                <StatLabel fontSize="lg">Vistos Recientemente</StatLabel>
              </Flex>
              <StatNumber>24</StatNumber>
              <StatHelpText>Últimos 30 días</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <Card bg={cardBg} boxShadow="md" borderColor={borderColor}>
          <CardHeader>
            <Flex justify="space-between" align="center">
              <Heading size="md">Compras Recientes</Heading>
              <Button
                as={Link}
                to="/dashboard/orders"
                size="sm"
                colorScheme="blue"
                variant="ghost"
                rightIcon={<FaArrowRight />}
              >
                Ver todas
              </Button>
            </Flex>
          </CardHeader>
          <CardBody>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Orden</Th>
                  <Th>Fecha</Th>
                  <Th>Estado</Th>
                  <Th isNumeric>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {recentOrders.map((order) => (
                  <Tr key={order.id}>
                    <Td>
                      <Link to={`/dashboard/orders/${order.id}`}>{order.id}</Link>
                    </Td>
                    <Td>{order.date}</Td>
                    <Td>
                      <Badge
                        colorScheme={
                          order.status === "Entregado" ? "green" : order.status === "En camino" ? "blue" : "orange"
                        }
                      >
                        {order.status}
                      </Badge>
                    </Td>
                    <Td isNumeric>${order.total}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        <Card bg={cardBg} boxShadow="md" borderColor={borderColor}>
          <CardHeader>
            <Flex justify="space-between" align="center">
              <Heading size="md">Favoritos</Heading>
              <Button
                as={Link}
                to="/dashboard/favorites"
                size="sm"
                colorScheme="blue"
                variant="ghost"
                rightIcon={<FaArrowRight />}
              >
                Ver todos
              </Button>
            </Flex>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {favoriteProducts.map((product) => (
                <Flex
                  key={product.id}
                  p={2}
                  borderWidth="1px"
                  borderRadius="md"
                  borderColor={borderColor}
                  align="center"
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    boxSize="50px"
                    objectFit="cover"
                    mr={4}
                    borderRadius="md"
                  />
                  <Box flex="1">
                    <Text fontWeight="medium">{product.name}</Text>
                    <Text color="brand.primary.500" fontWeight="bold">
                      ${product.price}
                    </Text>
                  </Box>
                  <Button size="sm" colorScheme="blue">
                    Ver
                  </Button>
                </Flex>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  )
}

export default BuyerDashboard
