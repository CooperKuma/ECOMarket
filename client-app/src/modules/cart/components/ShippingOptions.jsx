"use client"

import { Box, Heading, RadioGroup, Radio, Stack, Flex, Text, Icon, useColorModeValue, Badge } from "@chakra-ui/react"
import { FaTruck, FaBolt, FaMapMarkerAlt } from "react-icons/fa"

const ShippingOptions = ({ selectedMethod, onSelectMethod, freeShippingEligible }) => {
  // Colores según el tema
  const bgColor = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const textColor = useColorModeValue("gray.700", "gray.200")
  const secondaryTextColor = useColorModeValue("gray.600", "gray.400")
  const highlightBg = useColorModeValue("green.50", "green.900")
  const highlightBorder = useColorModeValue("green.200", "green.700")

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="sm" borderWidth="1px" borderColor={borderColor}>
      <Heading as="h2" size="md" mb={4}>
        Opciones de envío
      </Heading>

      <RadioGroup onChange={onSelectMethod} value={selectedMethod}>
        <Stack spacing={4}>
          {/* Envío estándar */}
          <Box
            p={4}
            borderWidth="1px"
            borderRadius="md"
            borderColor={selectedMethod === "standard" ? highlightBorder : borderColor}
            bg={selectedMethod === "standard" ? highlightBg : "transparent"}
          >
            <Radio value="standard" colorScheme="green">
              <Flex align="center" wrap="wrap">
                <Icon as={FaTruck} mr={2} />
                <Text fontWeight="medium">Envío estándar</Text>
                {freeShippingEligible && (
                  <Badge colorScheme="green" ml={2}>
                    GRATIS
                  </Badge>
                )}
              </Flex>
            </Radio>
            <Text fontSize="sm" color={secondaryTextColor} mt={2} ml={6}>
              Entrega estimada: 3-5 días hábiles
            </Text>
            {!freeShippingEligible && (
              <Text fontWeight="medium" mt={1} ml={6}>
                $3.990
              </Text>
            )}
          </Box>

          {/* Envío express */}
          <Box
            p={4}
            borderWidth="1px"
            borderRadius="md"
            borderColor={selectedMethod === "express" ? highlightBorder : borderColor}
            bg={selectedMethod === "express" ? highlightBg : "transparent"}
          >
            <Radio value="express" colorScheme="green">
              <Flex align="center">
                <Icon as={FaBolt} mr={2} />
                <Text fontWeight="medium">Envío express</Text>
              </Flex>
            </Radio>
            <Text fontSize="sm" color={secondaryTextColor} mt={2} ml={6}>
              Entrega estimada: 24-48 horas (días hábiles)
            </Text>
            <Text fontWeight="medium" mt={1} ml={6}>
              {freeShippingEligible ? "$1.990" : "$5.990"}
            </Text>
          </Box>

          {/* Retiro en tienda */}
          <Box
            p={4}
            borderWidth="1px"
            borderRadius="md"
            borderColor={selectedMethod === "pickup" ? highlightBorder : borderColor}
            bg={selectedMethod === "pickup" ? highlightBg : "transparent"}
          >
            <Radio value="pickup" colorScheme="green">
              <Flex align="center">
                <Icon as={FaMapMarkerAlt} mr={2} />
                <Text fontWeight="medium">Retiro en tienda</Text>
                <Badge colorScheme="green" ml={2}>
                  GRATIS
                </Badge>
              </Flex>
            </Radio>
            <Text fontSize="sm" color={secondaryTextColor} mt={2} ml={6}>
              Disponible para retiro: 24 horas después de la compra
            </Text>
            <Text fontSize="sm" color={secondaryTextColor} mt={1} ml={6}>
              Ubicaciones disponibles: 5 tiendas
            </Text>
          </Box>
        </Stack>
      </RadioGroup>
    </Box>
  )
}

export default ShippingOptions
