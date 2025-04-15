"use client"

import {
  Box,
  VStack,
  Heading,
  Text,
  Flex,
  Divider,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  Tooltip,
  Icon,
} from "@chakra-ui/react"
import { FaInfoCircle, FaLock, FaChevronRight } from "react-icons/fa"

const CartSummary = ({ subtotal, shipping, taxes, total, couponCode, setCouponCode, onApplyCoupon }) => {
  // Colores según el tema
  const bgColor = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const textColor = useColorModeValue("gray.700", "gray.200")
  const secondaryTextColor = useColorModeValue("gray.600", "gray.400")
  const accentColor = useColorModeValue("brand.primary.500", "brand.primary.300")

  return (
    <Box
      bg={bgColor}
      p={6}
      borderRadius="lg"
      boxShadow="sm"
      borderWidth="1px"
      borderColor={borderColor}
      position="sticky"
      top="100px"
    >
      <Heading as="h2" size="md" mb={4}>
        Resumen de compra
      </Heading>

      <Divider mb={4} />

      {/* Detalles del resumen */}
      <VStack spacing={3} align="stretch">
        <Flex justify="space-between">
          <Text color={secondaryTextColor}>Subtotal ({subtotal > 0 ? "productos" : "0 productos"})</Text>
          <Text>${subtotal.toLocaleString()}</Text>
        </Flex>

        <Flex justify="space-between">
          <Flex align="center">
            <Text color={secondaryTextColor} mr={1}>
              Envío
            </Text>
            <Tooltip
              label={
                shipping === 0
                  ? "¡Felicidades! Tu compra califica para envío gratis."
                  : "El envío es gratis en compras superiores a $50.000."
              }
              placement="top"
            >
              <span>
                <Icon as={FaInfoCircle} color={secondaryTextColor} boxSize={3} />
              </span>
            </Tooltip>
          </Flex>
          <Text>{shipping === 0 ? "Gratis" : `$${shipping.toLocaleString()}`}</Text>
        </Flex>

        <Flex justify="space-between">
          <Flex align="center">
            <Text color={secondaryTextColor} mr={1}>
              Impuestos (IVA 19%)
            </Text>
            <Tooltip label="IVA aplicado según normativa vigente" placement="top">
              <span>
                <Icon as={FaInfoCircle} color={secondaryTextColor} boxSize={3} />
              </span>
            </Tooltip>
          </Flex>
          <Text>${taxes.toLocaleString()}</Text>
        </Flex>

        <Divider />

        <Flex justify="space-between" fontWeight="bold" fontSize="lg">
          <Text>Total</Text>
          <Text color={accentColor}>${total.toLocaleString()}</Text>
        </Flex>

        {/* Cupón de descuento */}
        <Box mt={4}>
          <Text fontSize="sm" mb={2} fontWeight="medium">
            ¿Tienes un cupón de descuento?
          </Text>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              placeholder="Código de cupón"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={onApplyCoupon}>
                Aplicar
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>

        {/* Botón de checkout */}
        <Button
          mt={6}
          size="lg"
          colorScheme="green"
          rightIcon={<FaChevronRight />}
          w="100%"
          _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
          transition="all 0.2s"
        >
          Proceder al pago
        </Button>

        <Flex align="center" justify="center" mt={2}>
          <Icon as={FaLock} color="green.500" mr={1} />
          <Text fontSize="xs" color={secondaryTextColor}>
            Pago 100% seguro
          </Text>
        </Flex>
      </VStack>
    </Box>
  )
}

export default CartSummary
