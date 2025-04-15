"use client"

import {
  Flex,
  IconButton,
  Text,
  useColorModeValue,
  Avatar,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Badge,
} from "@chakra-ui/react"
import { FaBars, FaSignOutAlt, FaUser, FaCog } from "react-icons/fa"
import { useDashboardContext } from "../../context/DashboardContext"
import { useAuth } from "../../../../context/AuthContext"

const Header = () => {
  const { toggleSidebar, userRole, isAdmin, activeView } = useDashboardContext()
  const { user, logout } = useAuth()

  const bgColor = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const textColor = useColorModeValue("gray.700", "gray.200")

  // Colores para los badges de rol
  const roleBadgeColors = {
    admin: "purple",
    buyer: "green",
    seller: "blue",
  }

  // Texto para mostrar en el encabezado según el rol
  const getRoleDisplayText = () => {
    if (isAdmin) {
      return `Panel de Administrador ${activeView ? `(Vista: ${activeView === "buyer" ? "Comprador" : "Vendedor"})` : ""}`
    } else if (userRole === "buyer") {
      return "Panel de Comprador"
    } else if (userRole === "seller") {
      return "Panel de Vendedor"
    }
    return "Dashboard"
  }

  return (
    <Flex
      as="header"
      position="fixed"
      top="0"
      width="100%"
      height="60px"
      zIndex="1000"
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      align="center"
      px={4}
    >
      <IconButton aria-label="Abrir menú" icon={<FaBars />} variant="ghost" onClick={toggleSidebar} mr={4} />

      <Text fontSize="lg" fontWeight="bold" color={textColor}>
        {getRoleDisplayText()}
      </Text>

      <Box ml="auto" display="flex" alignItems="center">
        {user && (
          <>
            <Badge colorScheme={roleBadgeColors[userRole]} mr={4}>
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </Badge>

            <Menu>
              <MenuButton>
                <Flex align="center">
                  <Text mr={2} display={{ base: "none", md: "block" }}>
                    {user.name}
                  </Text>
                  <Avatar size="sm" name={user.name} />
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem icon={<FaUser />}>Perfil</MenuItem>
                <MenuItem icon={<FaCog />}>Configuración</MenuItem>
                <MenuDivider />
                <MenuItem icon={<FaSignOutAlt />} onClick={logout}>
                  Cerrar sesión
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
      </Box>
    </Flex>
  )
}

export default Header
