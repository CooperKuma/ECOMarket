"use client"

import { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import {
  Box,
  Flex,
  Text,
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  IconButton,
  HStack,
  useColorModeValue,
  Tooltip,
  Badge,
} from "@chakra-ui/react"
import { FaTrash, FaHeart } from "react-icons/fa"

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const [isHovering, setIsHovering] = useState(false)

  // Colores según el tema
  const bgHover = useColorModeValue("gray.50", "gray.700")
  const textColor = useColorModeValue("gray.700", "gray.200")
  const secondaryTextColor = useColorModeValue("gray.600", "gray.400")
  const accentColor = useColorModeValue("brand.primary.500", "brand.primary.300")

  // Calcular subtotal del item
  const subtotal = item.price * item.quantity

  // Calcular descuento si existe
  const discountedPrice = item.discount ? item.price * (1 - item.discount / 100) : null
  const discountedSubtotal = discountedPrice ? discountedPrice * item.quantity : null

  return (
    <Flex
      direction={{ base: "column", sm: "row" }}
      justify="space-between"
      align={{ base: "stretch", sm: "center" }}
      p={2}
      borderRadius="md"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      bg={isHovering ? bgHover : "transparent"}
      transition="background 0.2s"
    >
      {/* Imagen y detalles del producto */}
      <Flex flex="3" gap={4} mb={{ base: 4, sm: 0 }}>
        {/* Imagen del producto */}
        <Box position="relative" minW="100px">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            boxSize="100px"
            objectFit="contain"
            borderRadius="md"
            border="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.700")}
          />
          {item.discount > 0 && (
            <Badge
              position="absolute"
              top="0"
              right="0"
              colorScheme="red"
              borderRadius="full"
              px={2}
              transform="translate(30%, -30%)"
            >
              -{item.discount}%
            </Badge>
          )}
        </Box>

        {/* Información del producto */}
        <Box>
          <Text
            as={RouterLink}
            to={`/product/${item.id}`}
            fontWeight="semibold"
            fontSize="md"
            color={textColor}
            _hover={{ color: accentColor }}
            noOfLines={2}
          >
            {item.name}
          </Text>

          <Text fontSize="sm" color={secondaryTextColor} mt={1}>
            {item.brand}
          </Text>

          {item.variant && (
            <Text fontSize="sm" color={secondaryTextColor} mt={1}>
              Variante: {item.variant}
            </Text>
          )}

          {item.seller && (
            <Text fontSize="xs" color={secondaryTextColor} mt={1}>
              Vendido por: {item.seller}
            </Text>
          )}

          {item.stock < 10 && (
            <Text fontSize="xs" color="orange.500" fontWeight="medium" mt={1}>
              ¡Solo quedan {item.stock} unidades!
            </Text>
          )}
        </Box>
      </Flex>

      {/* Controles de cantidad */}
      <Flex flex="1" justify="center" mb={{ base: 4, sm: 0 }}>
        <NumberInput
          size="sm"
          maxW={24}
          min={1}
          max={item.stock}
          value={item.quantity}
          onChange={(_, value) => onQuantityChange(item.id, value)}
        >
          <NumberInputField textAlign="center" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>

      {/* Precio */}
      <Flex flex="1" justify="center" mb={{ base: 4, sm: 0 }}>
        <Box textAlign="right">
          {discountedPrice ? (
            <>
              <Text fontSize="sm" textDecoration="line-through" color={secondaryTextColor}>
                ${item.price.toLocaleString()}
              </Text>
              <Text fontWeight="bold" color={accentColor}>
                ${discountedPrice.toLocaleString()}
              </Text>
            </>
          ) : (
            <Text fontWeight="bold">${item.price.toLocaleString()}</Text>
          )}
        </Box>
      </Flex>

      {/* Subtotal */}
      <Flex flex="1" justify="flex-end" mb={{ base: 4, sm: 0 }}>
        <Box textAlign="right">
          {discountedSubtotal ? (
            <>
              <Text fontSize="sm" textDecoration="line-through" color={secondaryTextColor}>
                ${subtotal.toLocaleString()}
              </Text>
              <Text fontWeight="bold" color={accentColor}>
                ${discountedSubtotal.toLocaleString()}
              </Text>
            </>
          ) : (
            <Text fontWeight="bold">${subtotal.toLocaleString()}</Text>
          )}
        </Box>
      </Flex>

      {/* Acciones */}
      <HStack spacing={2} justify={{ base: "flex-end", sm: "center" }}>
        <Tooltip label="Guardar para después">
          <IconButton
            icon={<FaHeart />}
            variant="ghost"
            colorScheme="pink"
            size="sm"
            aria-label="Guardar para después"
          />
        </Tooltip>
        <Tooltip label="Eliminar">
          <IconButton
            icon={<FaTrash />}
            variant="ghost"
            colorScheme="red"
            size="sm"
            aria-label="Eliminar"
            onClick={() => onRemove(item.id)}
          />
        </Tooltip>
      </HStack>
    </Flex>
  )
}

export default CartItem
