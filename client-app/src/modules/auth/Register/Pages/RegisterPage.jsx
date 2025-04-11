import { Box, Heading, VStack } from "@chakra-ui/react";
import RegisterForm from "../Components/RegisterForm";
import RegisterLayout from "../Components/RegisterLayout";

const RegisterPage = () => {
  return (
    <Box
      bg="bg.body"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <VStack
        spacing={6}
        bg="bg.card"
        p={8}
        borderRadius="md"
        boxShadow="md"
        w={{ base: "full", sm: "md" }}
      >
        <Heading as="h1" size="lg" color="text.primary">
          Crear cuenta en EcoMarket
        </Heading>
        <RegisterForm />
        <RegisterLayout/>
      </VStack>
    </Box>
  );
};

export default RegisterPage;