"use client"

import {
  Flex,
  IconButton,
  useColorMode,
  Box,
  Avatar,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  HStack,
  useColorModeValue,
  Button,
  InputGroup,
  InputLeftElement,
  Input
} from "@chakra-ui/react"
import {
  FaBars,
  FaSignOutAlt,
  FaUser,
  FaCog,
  FaSun,
  FaMoon,
  FaHome,
  FaSearch,
  FaBell,
  FaShoppingCart
} from "react-icons/fa"
import { useDashboardContext } from "../../context/DashboardContext"
import { useAuth } from "../../../auth/hooks/useAuth"
import { Link as RouterLink } from "react-router-dom"

const Header = () => {
  const { toggleSidebar, sidebarOpen } = useDashboardContext()
  const { auth, logout } = useAuth()
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")

  const roleBadgeColors = {
    buyer: "green",
    seller: "blue",
    admin: "purple"
  }

  return (
    <Flex
      as="header"
      position="fixed"
      w="100%"
      h="60px"
      px={6}
      align="center"
      justify="space-between"
      bg={bgColor}
      borderBottomWidth="1px"
      borderColor={borderColor}
      zIndex="sticky"
    >
      <Flex align="center">
        <IconButton
          aria-label="Menu"
          icon={<FaBars />}
          onClick={toggleSidebar}
          variant="ghost"
          mr={4}
        />
        <Button
          as={RouterLink}
          to="/"
          leftIcon={<FaHome />}
          variant="ghost"
          mr={4}
          size="sm"
        >
          Inicio
        </Button>
        
        <Text 
          fontSize="xl" 
          fontWeight="bold" 
          color="accent.primary" 
          display={{ base: "none", md: "block" }}
        >
          ECOMarket
        </Text>
      </Flex>

      <InputGroup maxW="500px" mx={4} display={{ base: "none", md: "block" }}>
        <InputLeftElement pointerEvents="none">
          <FaSearch color="gray.300" />
        </InputLeftElement>
        <Input placeholder="Buscar productos, marcas y más..." borderRadius="full" />
      </InputGroup>

      <HStack spacing={3}>
        <IconButton
          aria-label={colorMode === "light" ? "Modo oscuro" : "Modo claro"}
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
          variant="ghost"
        />

        <Box position="relative" display={{ base: "none", sm: "block" }}>
          <IconButton aria-label="Notificaciones" icon={<FaBell />} variant="ghost" />
          <Badge position="absolute" top="-1" right="-1" colorScheme="red" borderRadius="full" fontSize="xs">
            3
          </Badge>
        </Box>

        <Box position="relative" display={{ base: "none", sm: "block" }}>
          <IconButton aria-label="Carrito" icon={<FaShoppingCart />} variant="ghost" />
          <Badge position="absolute" top="-1" right="-1" colorScheme="green" borderRadius="full" fontSize="xs">
            2
          </Badge>
        </Box>

        <Menu>
          <MenuButton>
            <HStack spacing={2}>
              <Avatar size="sm" name={auth?.fullName} />
              <Box display={{ base: "none", md: "block" }}>
                <Text fontWeight="medium" fontSize="sm">{auth?.fullName}</Text>
                <HStack spacing={1}>
                  {auth?.roles?.map(role => (
                    <Badge
                      key={role}
                      colorScheme={roleBadgeColors[role.toLowerCase()]}
                      fontSize="xs"
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </Badge>
                  ))}
                </HStack>
              </Box>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem
              as={RouterLink}
              to="/dashboard/profile"
              icon={<FaUser />}
            >
              Mi Perfil
            </MenuItem>
            <MenuItem
              as={RouterLink}
              to="/dashboard/settings"
              icon={<FaCog />}
            >
              Configuración
            </MenuItem>
            <MenuItem
              onClick={logout}
              icon={<FaSignOutAlt />}
              color="red.500"
            >
              Cerrar Sesión
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  )
}

export default Header
