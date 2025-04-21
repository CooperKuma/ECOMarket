"use client"

import { Box, Container, VStack, Image, Link, Divider, Button, HStack } from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom"

const RegisterLayout = ({ children }) => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate("/")
  }

  return (
    <Box bg="bg.body" minH="100vh" py={12}>
      <Container maxW="sm">
        
        {/* Logo en la parte superior */}
        <VStack spacing={6} align="center" mb={8}>
          <Image
            src="/logo.svg" // Ruta del logo
            alt="EcoMarket Logo"
            h="60px"
            filter="auto"
          />
        </VStack>
        {/* Contenedor principal */}
        <VStack spacing={6} align="center">
          <Box w="full" bg="bg.card" rounded="md" shadow="md" p={8} border="1px" borderColor="border.default">
            {children}
          </Box>
          <VStack spacing={4} w="full" align="center">
            <Divider borderColor="border.default" />
            <Box textAlign="center" color="text.secondary" fontSize="xs">
              Al registrarte, aceptas nuestros{" "}
              <Link href="/terms" color="accent.primary">
                Términos y Condiciones
              </Link>{" "}
              y{" "}
              <Link href="/privacy" color="accent.primary">
                Política de Privacidad
              </Link>
              .
            </Box>
          </VStack>
        <HStack w="full" justifyContent="center" mb={4}>
          <Button
            leftIcon={<ArrowBackIcon />}
            colorScheme="blue"
            variant="ghost"
            size="md"
            onClick={handleGoBack}
            mb={2}
          >
            Volver al inicio
          </Button>
        </HStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default RegisterLayout
