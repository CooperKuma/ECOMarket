"use client"

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
  Text,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
} from "@chakra-ui/react"
import { useState } from "react"
import { useColorModeValue } from "@chakra-ui/react"

const RecoveryPasswordForm = () => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const inputBg = useColorModeValue("bg.surface", "bg.surface")

  const handleChange = (e) => {
    setEmail(e.target.value)
    setError("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email) {
      setError("Correo electrónico requerido")
      return
    }

    // Validación básica de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Formato de correo electrónico inválido")
      return
    }

    setIsLoading(true)

    // Simulación de envío de correo de recuperación
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)

      toast({
        title: "Correo enviado",
        description: "Hemos enviado instrucciones para recuperar tu contraseña",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <Alert
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        borderRadius="md"
        py={6}
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          ¡Correo enviado!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Hemos enviado un correo a <strong>{email}</strong> con instrucciones para recuperar tu contraseña. Por favor
          revisa tu bandeja de entrada y sigue los pasos indicados.
        </AlertDescription>
        <Box mt={4}>
          <Text fontSize="sm" color="text.secondary">
            Si no encuentras el correo, revisa tu carpeta de spam o correo no deseado.
          </Text>
        </Box>
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={6}>
        <Text fontSize="xl" fontWeight="bold" textAlign="center" color="text.primary">
          Recuperar contraseña
        </Text>

        <Text fontSize="sm" textAlign="center" color="text.secondary">
          Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
        </Text>

        <FormControl isInvalid={!!error}>
          <FormLabel>Correo electrónico</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            bg={inputBg}
            focusBorderColor="accent.primary"
          />
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          w="full"
          fontWeight="bold"
          isLoading={isLoading}
          loadingText="Enviando..."
        >
          Enviar instrucciones
        </Button>
      </VStack>
    </form>
  )
}

export default RecoveryPasswordForm
