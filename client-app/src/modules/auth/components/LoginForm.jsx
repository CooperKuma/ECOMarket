// src/modules/auth/components/LoginForm.jsx
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
  useColorModeValue,
  Text,
  Checkbox,
  Link
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const accentColor = useColorModeValue('green.600', 'green.300');
  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};
    if (!form.email) validationErrors.email = 'Correo requerido';
    if (!form.password) validationErrors.password = 'Contraseña requerida';
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
    } else {
      console.log('Login:', form);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Correo electrónico</FormLabel>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            bg={useColorModeValue('gray.50', 'gray.700')}
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Contraseña</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              bg={useColorModeValue('gray.50', 'gray.700')}
            />
            <InputRightElement>
              <IconButton
                size="sm"
                variant="ghost"
                onClick={togglePassword}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                aria-label="Mostrar contraseña"
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>

        <Checkbox colorScheme="green" alignSelf="start">
          Recuérdame
        </Checkbox>

        <Button
          type="submit"
          colorScheme="green"
          w="full"
          fontWeight="bold"
        >
          Iniciar sesión
        </Button>

        <Text fontSize="sm" textAlign="center" mt={2}>
          ¿No tienes cuenta?{' '}
          <Link color={accentColor} href="/register">
            Regístrate
          </Link>
        </Text>
      </VStack>
    </form>
  );
};

export default LoginForm;
