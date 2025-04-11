import {
  Box,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const DashboardMenu = ({ userType }) => {
  const navigate = useNavigate();

  return (
    <Box bg="bg.surface" px={4} py={2} boxShadow="sm">
      <Flex justify="space-between" align="center">
        <Text fontSize="lg" fontWeight="bold" color="text.primary">
          EcoMarket Dashboard
        </Text>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<HamburgerIcon />}
            variant="outline"
            aria-label="Menú"
          />
          <MenuList>
            <MenuItem onClick={() => navigate("/")}>Inicio</MenuItem>
            {userType === "cliente" && (
              <MenuItem onClick={() => navigate("/mis-compras")}>
                Mis Compras
              </MenuItem>
            )}
            {userType === "vendedor" && (
              <>
                <MenuItem onClick={() => navigate("/mis-ventas")}>
                  Mis Ventas
                </MenuItem>
                <MenuItem onClick={() => navigate("/publicar-producto")}>
                  Publicar Producto
                </MenuItem>
              </>
            )}
            <MenuItem onClick={() => navigate("/favoritos")}>Favoritos</MenuItem>
            <MenuItem onClick={() => navigate("/perfil")}>Perfil</MenuItem>
            <MenuItem onClick={() => navigate("/notificaciones")}>
              Notificaciones
            </MenuItem>
            <MenuItem onClick={() => navigate("/ayuda")}>Ayuda</MenuItem>
            <MenuItem onClick={() => navigate("/logout")}>Cerrar Sesión</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default DashboardMenu;