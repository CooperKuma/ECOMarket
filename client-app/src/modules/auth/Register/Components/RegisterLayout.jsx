import { Box, Container, VStack, Image, Text, Link, Divider } from "@chakra-ui/react";

const RegisterLayout = ({ children }) => {
  return (
    <Box bg="bg.body" minH="100vh" py={12}>
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
      <Container maxW="sm">
        <VStack spacing={6} align="center">
          <Box
            w="full"
            bg="bg.card"
            rounded="md"
            shadow="md"
            p={8}
            border="1px"
            borderColor="border.default"
          >
            {children}
          </Box>
          <VStack spacing={4} w="full" align="center">
            <Divider borderColor="border.default" />
            <Text fontSize="sm" color="text.secondary">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" color="accent.primary" fontWeight="bold">
                Inicia sesión
              </Link>
            </Text>
            <Box textAlign="center" color="text.secondary" fontSize="xs">
              Al registrarte, aceptas nuestros{" "}
              <Link href="/terms" color="accent.primary">
                Términos y Condiciones
              </Link>{" "}
              y{" "}
              <Link href="/privacy" color="accent.primary">
                Política de Privacidad
              </Link>.
            </Box>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default RegisterLayout;