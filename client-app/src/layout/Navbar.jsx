"use client"

import { useState, useEffect } from "react"
import { Link as RouterLink, useLocation } from "react-router-dom"
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Badge,
  Container,
  HStack,
} from "@chakra-ui/react"
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronRight,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaSignInAlt,
  FaMoon,
  FaSun,
  FaBell,
  FaHeart,
  FaQuestionCircle,
  FaHeadset,
  FaLaptop,
  FaMobile,
  FaTshirt,
  FaHome,
  FaGamepad,
  FaBook,
  FaBabyCarriage,
  FaCar,
} from "react-icons/fa"

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Simulación de estado de login

  // Detectar scroll para cambiar estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Colores según el tema
  const bgColor = useColorModeValue(
    isScrolled ? "white" : "rgba(255, 255, 255, 0.8)",
    isScrolled ? "gray.800" : "rgba(26, 32, 44, 0.8)",
  )
  const textColor = useColorModeValue("gray.600", "gray.200")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const hoverBgColor = useColorModeValue("gray.50", "gray.700")

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="1000"
      bg={bgColor}
      color={textColor}
      borderBottom={isScrolled ? "1px" : "0"}
      borderColor={borderColor}
      backdropFilter="blur(10px)"
      transition="all 0.3s ease"
      boxShadow={isScrolled ? "sm" : "none"}
    >
      <Container maxW="1400px">
        <Flex py={{ base: 2, md: 4 }} px={{ base: 4, md: 0 }} align="center">
          {/* Logo */}
          <Flex flex={{ base: 1 }} justify={{ base: "start", md: "start" }}>
            <Text
              as={RouterLink}
              to="/"
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily="heading"
              fontWeight="bold"
              fontSize="xl"
              color={useColorModeValue("orange.500", "orange.300")}
            >
              MiMarketplace
            </Text>

            {/* Desktop Navigation */}
            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>

          {/* Search Bar - Desktop */}
          <InputGroup maxW="400px" mx={4} display={{ base: "none", lg: "block" }}>
            <InputLeftElement pointerEvents="none">
              <FaSearch color="gray.300" />
            </InputLeftElement>
            <Input placeholder="Buscar productos, marcas y más..." borderRadius="full" />
          </InputGroup>

          {/* Right Side Icons */}
          <Stack
            flex={{ base: 1, md: "auto" }}
            justify="flex-end"
            align="center"
            direction="row"
            spacing={{ base: 2, md: 4 }}
          >
            {/* Theme Toggle */}
            <IconButton
              aria-label={colorMode === "light" ? "Modo oscuro" : "Modo claro"}
              icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
              variant="ghost"
              onClick={toggleColorMode}
            />

            {/* Cart */}
            <Box position="relative" display={{ base: "none", sm: "block" }}>
              <IconButton as={RouterLink} to="/cart" aria-label="Carrito" icon={<FaShoppingCart />} variant="ghost" />
              <Badge position="absolute" top="-1" right="-1" colorScheme="green" borderRadius="full" fontSize="xs">
                2
              </Badge>
            </Box>

          {/* User Menu */}
            {isLoggedIn ? (
              <Menu>
                <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
                  <Avatar size="sm" src="https://bit.ly/broken-link" />
                </MenuButton>
                <MenuList zIndex={1001}>
                  <MenuItem as={RouterLink} to="/dashboard" icon={<FaUser />}>
                    Mi cuenta
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/dashboard/orders" icon={<FaShoppingCart />}>
                    Mis compras
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={() => setIsLoggedIn(false)}>Cerrar sesión</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                as={RouterLink}
                to="/login"
                display={{ base: "none", md: "inline-flex" }}
                fontSize="sm"
                fontWeight={600}
                colorScheme="orange"
                leftIcon={<FaSignInAlt />}
              >
                Ingresar
              </Button>
            )}

            {/* Mobile menu button */}
            <IconButton
              display={{ base: "flex", md: "none" }}
              onClick={onToggle}
              icon={isOpen ? <FaTimes /> : <FaBars />}
              variant="ghost"
              aria-label="Toggle Navigation"
            />
          </Stack>
        </Flex>

        {/* Search Bar - Mobile */}
        <Box pb={2} display={{ base: "block", lg: "none" }} px={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaSearch color="gray.300" />
            </InputLeftElement>
            <Input placeholder="Buscar..." borderRadius="full" size="sm" />
          </InputGroup>
        </Box>

        {/* Mobile Navigation */}
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Container>
    </Box>
  )
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200")
  const linkHoverColor = useColorModeValue("orange.500", "orange.300")
  const popoverContentBgColor = useColorModeValue("white", "gray.800")
  const location = useLocation()

  return (
    <Stack direction="row" spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Link
                as={RouterLink}
                p={2}
                to={navItem.href ?? "#"}
                fontSize="sm"
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
                _activeLink={{
                  color: linkHoverColor,
                  fontWeight: 600,
                }}
                isActive={location.pathname === navItem.href}
              >
                {navItem.label}
                {navItem.children && <Icon as={FaChevronDown} h={3} w={3} ml={1} transition="all .25s ease-in-out" />}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent border={0} boxShadow="xl" bg={popoverContentBgColor} p={4} rounded="xl" minW="sm">
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel, icon }) => {
  return (
    <Link
      as={RouterLink}
      to={href}
      role="group"
      display="block"
      p={2}
      rounded="md"
      _hover={{ bg: useColorModeValue("orange.50", "gray.900") }}
    >
      <Stack direction="row" align="center">
        <Box>
          <HStack>
            {icon && <Icon as={icon} color="orange.400" />}
            <Text transition="all .3s ease" _groupHover={{ color: "orange.400" }} fontWeight={500}>
              {label}
            </Text>
          </HStack>
          <Text fontSize="sm">{subLabel}</Text>
        </Box>
        <Flex
          transition="all .3s ease"
          transform="translateX(-10px)"
          opacity={0}
          _groupHover={{ opacity: 1, transform: "translateX(0)" }}
          justify="flex-end"
          align="center"
          flex={1}
        >
          <Icon color="orange.400" w={5} h={5} as={FaChevronRight} />
        </Flex>
      </Stack>
    </Link>
  )
}

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue("white", "gray.800")} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <Box pt={4}>
        <Button as={RouterLink} to="/login" w="full" colorScheme="orange" leftIcon={<FaSignInAlt />}>
          Ingresar
        </Button>
      </Box>
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={RouterLink}
        to={href ?? "#"}
        justify="space-between"
        align="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text fontWeight={600} color={useColorModeValue("gray.600", "gray.200")}>
          {label}
        </Text>
        {children && (
          <Icon
            as={FaChevronDown}
            transition="all .25s ease-in-out"
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle="solid"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align="start"
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} as={RouterLink} to={child.href} fontWeight={500}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

// Datos de navegación
const NAV_ITEMS = [
  {
    label: "Inicio",
    href: "/",
  },
  
    {
    label: "Categorías",
    children: [
      {
        label: "Electrónica",
        subLabel: "Smartphones, laptops, accesorios",
        href: "/catalog/electronics",
        icon: FaLaptop,
      },
      {
        label: "Celulares",
        subLabel: "Smartphones, accesorios, smartwatches",
        href: "/catalog/mobile",
        icon: FaMobile,
      },
      {
        label: "Moda",
        subLabel: "Ropa, calzado, accesorios",
        href: "/catalog/fashion",
        icon: FaTshirt,
      },
      {
        label: "Hogar y Jardín",
        subLabel: "Muebles, decoración, herramientas",
        href: "/catalog/home",
        icon: FaHome,
      },
      {
        label: "Videojuegos",
        subLabel: "Consolas, juegos, accesorios",
        href: "/catalog/gaming",
        icon: FaGamepad,
      },
      {
        label: "Libros y Música",
        subLabel: "Libros, eBooks, instrumentos",
        href: "/catalog/books",
        icon: FaBook,
      },
      {
        label: "Bebés y Niños",
        subLabel: "Juguetes, ropa, accesorios",
        href: "/catalog/kids",
        icon: FaBabyCarriage,
      },
      {
        label: "Vehículos",
        subLabel: "Autos, motos, repuestos",
        href: "/catalog/vehicles",
        icon: FaCar,
      },
      {
        label: "Ver todas",
        href: "/catalog/all",
        icon: FaSearch,
      },
    ],
  },
  {
    label: "Ayuda",
    children: [
      {
        label: "Centro de Ayuda",
        href: "/support",
        icon: FaHeadset,
      },
      {
        label: "Preguntas Frecuentes",
        href: "/support/faq",
        icon: FaQuestionCircle,
      },
      {
        label: "Contacto",
        href: "/contact",
        icon: FaHeadset,
      },
    ],
  },
  {
    label: "Sobre nosotros",
    href: "/about",
  }

]

export default Navbar
