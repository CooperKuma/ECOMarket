"use client"

import { useState, useEffect } from "react"
import { Link as RouterLink } from "react-router-dom"
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Button,
  Divider,
  Image,
  HStack,
  VStack,
  useColorModeValue,
  useToast,
  Icon,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react"
import { FaArrowLeft, FaLock } from "react-icons/fa"
import CartItem from "../components/CartItem"
import CartSummary from "../components/CartSummary"
import ShippingOptions from "../components/ShippingOptions"
import EmptyCart from "../components/EmptyCart"
import RecommendedProducts from "../components/RecommendedProducts"
import { mockCartItems } from "../utils/mockData"

const CartPage = () => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [couponCode, setCouponCode] = useState("")
  const [shippingMethod, setShippingMethod] = useState("standard")
  const toast = useToast()

  // Colores según el tema
  const bgColor = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const textColor = useColorModeValue("gray.700", "gray.200")
  const secondaryTextColor = useColorModeValue("gray.600", "gray.400")
  const buttonColor = useColorModeValue("brand.primary.500", "brand.primary.300")
  const skeletonBg = useColorModeValue("gray.50", "gray.700")

  // Simular carga de datos
  useEffect(() => {
    // Simulación de carga de datos del carrito
    setTimeout(() => {
      setCartItems(mockCartItems)
      setLoading(false)
    }, 800)
  }, [])

  // Calcular subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  // Calcular envío
  const getShippingCost = () => {
    if (subtotal > 50000) return 0
    return shippingMethod === "express" ? 5990 : 3990
  }

  // Calcular impuestos (19% IVA)
  const taxes = subtotal * 0.19

  // Calcular total
  const total = subtotal + getShippingCost() + taxes

  // Manejar cambio de cantidad
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))

    toast({
      title: "Cantidad actualizada",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    })
  }

  // Eliminar producto del carrito
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))

    toast({
      title: "Producto eliminado",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    })
  }

  // Aplicar cupón
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast({
        title: "Error",
        description: "Ingresa un código de cupón",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      })
      return
    }

    // Simulación de validación de cupón
    if (couponCode.toUpperCase() === "DESCUENTO20") {
      toast({
        title: "Cupón aplicado",
        description: "Se ha aplicado un 20% de descuento",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      })
    } else {
      toast({
        title: "Cupón inválido",
        description: "El código ingresado no es válido o ha expirado",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      })
    }
  }

  // Si el carrito está vacío
  if (!loading && cartItems.length === 0) {
    return <EmptyCart />
  }

  return (
    <Container maxW="container.xl" py={8}>
      {/* Breadcrumbs */}
      <Breadcrumb mb={6} fontSize="sm" color={secondaryTextColor}>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/">
            Inicio
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Carrito de compras</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Heading as="h1" size="xl" mb={8} color={textColor}>
        Tu Carrito de Compras
        <Badge ml={2} colorScheme="green" fontSize="md" borderRadius="full" px={2}>
          {cartItems.length} {cartItems.length === 1 ? "Producto" : "Productos"}
        </Badge>
      </Heading>

      {/* Alerta de envío gratis */}
      {subtotal < 50000 && (
        <Alert status="info" mb={6} borderRadius="md">
          <AlertIcon />
          <AlertTitle mr={2}>¡Casi tienes envío gratis!</AlertTitle>
          <AlertDescription>
            Agrega ${(50000 - subtotal).toLocaleString()} más a tu compra para obtener envío gratis.
          </AlertDescription>
        </Alert>
      )}

      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
        {/* Columna izquierda - Productos */}
        <GridItem>
          <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="sm" borderWidth="1px" borderColor={borderColor}>
            <Flex justify="space-between" align="center" mb={4}>
              <Heading as="h2" size="md">
                Productos
              </Heading>
              <Button as={RouterLink} to="/catalog/all" variant="link" leftIcon={<FaArrowLeft />} color={buttonColor}>
                Seguir comprando
              </Button>
            </Flex>

            <Divider mb={6} />

            {/* Lista de productos */}
            <VStack spacing={6} align="stretch" divider={<Divider />}>
              {loading
                ? // Esqueletos de carga (simplificados para brevedad)
                  Array(3)
                    .fill("")
                    .map((_, i) => (
                      <Box key={i} p={4} bg={skeletonBg} borderRadius="md">
                        <Text>Cargando...</Text>
                      </Box>
                    ))
                : cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onQuantityChange={handleQuantityChange}
                      onRemove={handleRemoveItem}
                    />
                  ))}
            </VStack>
          </Box>

          {/* Opciones de envío */}
          <Box mt={8}>
            <ShippingOptions
              selectedMethod={shippingMethod}
              onSelectMethod={setShippingMethod}
              freeShippingEligible={subtotal > 50000}
            />
          </Box>
        </GridItem>

        {/* Columna derecha - Resumen */}
        <GridItem>
          <CartSummary
            subtotal={subtotal}
            shipping={getShippingCost()}
            taxes={taxes}
            total={total}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            onApplyCoupon={handleApplyCoupon}
          />

          {/* Métodos de pago aceptados */}
          <Box mt={6} p={4} bg={bgColor} borderRadius="lg" boxShadow="sm" borderWidth="1px" borderColor={borderColor}>
            <Heading as="h3" size="sm" mb={3}>
              Métodos de pago aceptados
            </Heading>
            <Flex wrap="wrap" gap={3}>
              <Image src="/visa.svg" alt="Visa" h="30px" />
              <Image src="/mastercard.svg" alt="Mastercard" h="30px" />
              <Image src="/BancoSimpleLogo.svg" alt="BancoSimple" h="20px" />
              <Image src="/webpay.svg" alt="WebPay" h="30px" />
            
            </Flex>
          </Box>

          {/* Información de seguridad */}
          <Box mt={6} p={4} bg={bgColor} borderRadius="lg" boxShadow="sm" borderWidth="1px" borderColor={borderColor}>
            <HStack spacing={3} mb={2}>
              <Icon as={FaLock} color="green.500" />
              <Text fontWeight="medium">Compra 100% segura</Text>
            </HStack>
            <Text fontSize="sm" color={secondaryTextColor}>
              Tus datos están protegidos y encriptados con los más altos estándares de seguridad.
            </Text>
          </Box>
        </GridItem>
      </Grid>

      {/* Productos recomendados */}
      <Box mt={16}>
        <RecommendedProducts />
      </Box>
    </Container>
  )
}

export default CartPage
