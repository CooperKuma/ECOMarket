"use client"

import {
  SimpleGrid,
  Card,
  CardBody,
  Box,
  Image,
  Text,
  Button,
  Flex,
  IconButton,
  Badge,
  HStack,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react"
import { FaTrash, FaShoppingCart, FaEye } from "react-icons/fa"

const FavoritesGrid = ({ favorites, removeFromFavorites }) => {
  const toast = useToast()
  const cardBg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")

  // Añadir al carrito
  const addToCart = (product) => {
    toast({
      title: "Añadido al carrito",
      description: `${product.name} ha sido añadido a tu carrito.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing={6}>
      {favorites.map((product) => (
        <Card key={product.id} bg={cardBg} boxShadow="md" borderColor={borderColor} overflow="hidden">
          <Box position="relative">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              height="200px"
              width="100%"
              objectFit="cover"
            />
            <IconButton
              aria-label="Eliminar de favoritos"
              icon={<FaTrash />}
              size="sm"
              colorScheme="red"
              variant="solid"
              position="absolute"
              top={2}
              right={2}
              onClick={() => removeFromFavorites(product.id)}
            />
            {product.discount > 0 && (
              <Badge
                colorScheme="red"
                position="absolute"
                top={2}
                left={2}
                px={2}
                py={1}
                borderRadius="md"
                fontSize="sm"
              >
                {product.discount}% OFF
              </Badge>
            )}
          </Box>

          <CardBody>
            <Text fontWeight="bold" fontSize="lg" mb={1} noOfLines={2}>
              {product.name}
            </Text>
            <Text color="text.secondary" fontSize="sm" mb={2}>
              Vendido por {product.seller}
            </Text>

            <HStack mb={4}>
              {product.discount > 0 ? (
                <>
                  <Text fontWeight="bold" fontSize="xl" color="brand.primary.500">
                    ${(product.price * (1 - product.discount / 100)).toFixed(0)}
                  </Text>
                  <Text as="s" color="text.secondary" fontSize="md">
                    ${product.price}
                  </Text>
                </>
              ) : (
                <Text fontWeight="bold" fontSize="xl" color="brand.primary.500">
                  ${product.price}
                </Text>
              )}
            </HStack>

            <Flex justify="space-between" align="center">
              <Badge colorScheme={product.stock > 0 ? "green" : "red"}>
                {product.stock > 0 ? "En stock" : "Agotado"}
              </Badge>
              <Text fontSize="sm">{product.rating} ★</Text>
            </Flex>

            <Flex mt={4} gap={2}>
              <Button
                leftIcon={<FaShoppingCart />}
                colorScheme="blue"
                size="sm"
                flex="1"
                onClick={() => addToCart(product)}
                isDisabled={product.stock === 0}
              >
                Añadir
              </Button>
              <Button leftIcon={<FaEye />} variant="outline" colorScheme="blue" size="sm" flex="1">
                Ver
              </Button>
            </Flex>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  )
}

export default FavoritesGrid
