// src/modules/auth/components/AuthLayout.jsx
import { Box, Container, VStack, Image } from '@chakra-ui/react';

const AuthLayout = ({ children }) => {
  return (
    <Box bg="bg.body" minH="100vh" py={12}>
      <Container maxW="sm">
        <VStack spacing={6} align="center">
          <Image
            src="/logo.svg"
            alt="Ecomarket Logo"
            h="60px"
            filter="auto"
          />
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
        </VStack>
      </Container>
    </Box>
  );
};

export default AuthLayout;
