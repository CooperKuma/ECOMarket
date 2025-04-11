import { Button, VStack, Checkbox, Text, Link, useToast } from "@chakra-ui/react";
import { useState } from "react";
import FormField from "../../components/FormField";

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const toast = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!form.name) validationErrors.name = "Nombre requerido";
    if (!form.email) validationErrors.email = "Correo requerido";
    if (!form.password) validationErrors.password = "Contraseña requerida";
    if (form.password !== form.confirmPassword)
      validationErrors.confirmPassword = "Las contraseñas no coinciden";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulación de registro
    toast({
      title: "Registro exitoso.",
      description: `Bienvenido, ${form.name}`,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormField
          label="Nombre completo"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Tu nombre"
          error={errors.name}
        />
        <FormField
          label="Correo electrónico"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="ejemplo@correo.com"
          error={errors.email}
        />
        <FormField
          label="Contraseña"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="********"
          error={errors.password}
          isPassword
        />
        <FormField
          label="Confirmar contraseña"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="********"
          error={errors.confirmPassword}
          isPassword
        />
        <Checkbox colorScheme="green" alignSelf="start" color="text.primary">
          Acepto los términos y condiciones
        </Checkbox>
        <Button type="submit" w="full">
          Registrarse
        </Button>
        <Text fontSize="sm" textAlign="center" color="text.secondary" mt={2}>
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" color="accent.primary">
            Inicia sesión
          </Link>
        </Text>
      </VStack>
    </form>
  );
};

export default RegisterForm;