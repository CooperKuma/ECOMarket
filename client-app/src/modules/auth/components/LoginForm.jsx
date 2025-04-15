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
  Text,
  Checkbox,
  Link,
  useToast
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useColorModeValue } from '@chakra-ui/react';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const accentColor = useColorModeValue('green.600', 'green.300');
  const inputBg = useColorModeValue('gray.50', 'gray.700');

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!form.email) validationErrors.email = 'Correo requerido';
    if (!form.password) validationErrors.password = 'Contraseña requerida';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const res = login(form);
    if (!res.success) {
      setErrors({ password: res.message });
      toast({
        title: 'Error de autenticación',
        description: res.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: 'Inicio de sesión exitoso',
      description: `Bienvenido, ${form.email}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    navigate('/dashboard');
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
            bg={inputBg}
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
              bg={inputBg}
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