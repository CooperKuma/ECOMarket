"use client"

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  IconButton,
  VStack,
  Text,
  Checkbox,
  Link,
  useToast,
  HStack,
} from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { useState } from "react"
import { useAuth } from "../../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useColorModeValue } from "@chakra-ui/react"

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  })
  const [errors, setErrors] = useState({})
  const toast = useToast()
  const navigate = useNavigate()
  const { register } = useAuth()

  // Usando los colores del tema personalizado
  const accentColor = useColorModeValue("brand.primary.500", "brand.primary.300")
  const secondaryColor = useColorModeValue("brand.secondary.500", "brand.secondary.300")
  const inputBg = useColorModeValue("gray.50", "gray.700")

  const togglePassword = () => setShowPassword(!showPassword)
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
    setForm({ ...form, [e.target.name]: value })
    setErrors({ ...errors, [e.target.name]: "" })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validationErrors = {}
    if (!form.firstName) validationErrors.firstName = "Nombre requerido"
    if (!form.lastName) validationErrors.lastName = "Apellido requerido"
    if (!form.email) validationErrors.email = "Correo requerido"
    if (!form.password) validationErrors.password = "Contraseña requerida"
    else if (form.password.length < 6) validationErrors.password = "La contraseña debe tener al menos 6 caracteres"
    if (form.password !== form.confirmPassword) validationErrors.confirmPassword = "Las contraseñas no coinciden"
    if (!form.terms) validationErrors.terms = "Debes aceptar los términos y condiciones"

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const res = register(form)
    if (!res.success) {
      toast({
        title: "Error de registro",
        description: res.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    toast({
      title: "Registro exitoso",
      description: "Tu cuenta ha sido creada correctamente",
      status: "success",
      duration: 3000,
      isClosable: true,
    })

    navigate("/login")
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <HStack w="full" spacing={4}>
          <FormControl isInvalid={!!errors.firstName}>
            <FormLabel>Nombre</FormLabel>
            <Input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Juan"
              bg={inputBg}
              focusBorderColor="brand.primary.400"
            />
            <FormErrorMessage>{errors.firstName}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.lastName}>
            <FormLabel>Apellido</FormLabel>
            <Input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Pérez"
              bg={inputBg}
              focusBorderColor="brand.primary.400"
            />
            <FormErrorMessage>{errors.lastName}</FormErrorMessage>
          </FormControl>
        </HStack>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Correo electrónico</FormLabel>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            bg={inputBg}
            focusBorderColor="brand.primary.400"
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Contraseña</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              bg={inputBg}
              focusBorderColor="brand.primary.400"
            />
            <InputRightElement>
              <IconButton
                size="sm"
                variant="ghost"
                onClick={togglePassword}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                aria-label="Mostrar contraseña"
                color={accentColor}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.confirmPassword}>
          <FormLabel>Confirmar contraseña</FormLabel>
          <InputGroup>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              bg={inputBg}
              focusBorderColor="brand.primary.400"
            />
            <InputRightElement>
              <IconButton
                size="sm"
                variant="ghost"
                onClick={toggleConfirmPassword}
                icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                aria-label="Mostrar contraseña"
                color={accentColor}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.terms}>
          <Checkbox name="terms" isChecked={form.terms} onChange={handleChange} colorScheme="blue">
            Acepto los{" "}
            <Link color={secondaryColor} href="/terms">
              términos y condiciones
            </Link>
          </Checkbox>
          <FormErrorMessage>{errors.terms}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          bg="brand.primary.500"
          color="white"
          _hover={{ bg: "brand.primary.600" }}
          w="full"
          fontWeight="bold"
        >
          Registrarse
        </Button>

        <Text fontSize="sm" textAlign="center" mt={2}>
          ¿Ya tienes cuenta?{" "}
          <Link color={secondaryColor} href="/login">
            Inicia sesión
          </Link>
        </Text>
      </VStack>
    </form>
  )
}

export default RegisterForm
