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
  Divider,
  SimpleGrid,
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
  FaHome,
  FaQuestionCircle,
  FaHeadset,
  FaLaptop,
  FaMobile,
  FaTshirt,
  FaGamepad,
  FaBook,
  FaBabyCarriage,
  FaCar,
  FaInfoCircle,
} from "react-icons/fa"
import { useAuth } from "../context/AuthContext" // Asumiendo que tienes un AuthContext

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, isAuthenticated, logout } = useAuth() // Usando el AuthContext

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
  const textColor = useColorModeValue("text.primary", "text.primary")
  const borderColor = useColorModeValue("border.default", "border.default")
  const searchBgColor = useColorModeValue("bg.surface", "bg.surface")

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
        {/* Top Navigation Bar */}
        <Flex py={{ base: 2, md: 3 }} px={{ base: 4, md: 0 }} align="center">
          {/* Logo */}
          <Flex flex={{ base: 1 }} justify={{ base: "start", md: "start" }}>
            <Text
              as={RouterLink}
              to="/"
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily="heading"
              fontWeight="bold"
              fontSize="xl"
              color="accent.primary"
            >
              EcoMarket
            </Text>

            {/* Desktop Navigation */}
            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>

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
              <Badge position="absolute" top="-1" right="-1" colorScheme="blue" borderRadius="full" fontSize="xs">
                2
              </Badge>
            </Box>

            {/* User Menu */}
            {isAuthenticated ? (
              <Menu>
                <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
                  <Avatar size="sm" src="https://bit.ly/broken-link" name={user?.name} />
                </MenuButton>
                <MenuList zIndex={1001}>
                  <MenuItem as={RouterLink} to="/dashboard" icon={<FaUser />}>
                    Mi cuenta
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/dashboard/orders" icon={<FaShoppingCart />}>
                    Mis compras
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                as={RouterLink}
                to="/login"
                display={{ base: "none", md: "inline-flex" }}
                fontSize="sm"
                fontWeight={600}
                colorScheme="blue"
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

        {/* Divider between top and bottom navbar */}
        <Divider display={{ base: "none", md: "block" }} borderColor={borderColor} />

        {/* Bottom Navigation Bar - Search */}
        <Flex
          py={3}
          px={{ base: 4, md: 0 }}
          display={{ base: "none", md: "flex" }}
          justify="space-between"
          align="center"
        >
          {/* Categories Menu */}
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Button rightIcon={<FaChevronDown />} colorScheme="blue" variant="ghost" fontWeight={500}>
                Categorías
              </Button>
            </PopoverTrigger>
            <PopoverContent
              border={0}
              boxShadow="xl"
              bg={useColorModeValue("bg.card", "bg.card")}
              p={4}
              rounded="xl"
              minW="sm"
            >
              <SimpleGrid columns={2} spacing={2}>
                <CategoryItem icon={FaLaptop} label="Electrónica" href="/catalog/electronics" />
                <CategoryItem icon={FaMobile} label="Celulares" href="/catalog/mobile" />
                <CategoryItem icon={FaTshirt} label="Moda" href="/catalog/fashion" />
                <CategoryItem icon={FaHome} label="Hogar" href="/catalog/home" />
                <CategoryItem icon={FaGamepad} label="Videojuegos" href="/catalog/gaming" />
                <CategoryItem icon={FaBook} label="Libros" href="/catalog/books" />
                <CategoryItem icon={FaBabyCarriage} label="Bebés" href="/catalog/kids" />
                <CategoryItem icon={FaCar} label="Vehículos" href="/catalog/vehicles" />
              </SimpleGrid>
            </PopoverContent>
          </Popover>

          {/* Search Bar */}
          <InputGroup size="md" maxW="600px" mx={4} flex={1}>
            <InputLeftElement pointerEvents="none">
              <FaSearch color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Buscar productos, marcas y más..."
              borderRadius="full"
              bg={searchBgColor}
              _focus={{
                borderColor: "brand.primary.400",
                boxShadow: "0 0 0 1px var(--chakra-colors-brand-primary-400)",
              }}
            />
          </InputGroup>

          {/* Quick Links */}
          <Popover trigger="hover" placement="bottom-end">
            <PopoverTrigger>
              <Button rightIcon={<FaChevronDown />} colorScheme="blue" variant="ghost" fontWeight={500}>
                <HStack>
                  <Icon as={FaQuestionCircle} />
                  <Text>Ayuda</Text>
                </HStack>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              border={0}
              boxShadow="xl"
              bg={useColorModeValue("bg.card", "bg.card")}
              p={4}
              rounded="xl"
              minW="sm"
            >
              <Stack spacing={3}>
                <Link as={RouterLink} to="/support" _hover={{ textDecoration: "none" }}>
                  <HStack
                    spacing={3}
                    p={2}
                    rounded="md"
                    _hover={{ bg: useColorModeValue("brand.primary.50", "gray.700") }}
                  >
                    <Icon as={FaHeadset} color="accent.primary" boxSize={5} />
                    <Box>
                      <Text fontWeight={600}>Centro de Ayuda</Text>
                      <Text fontSize="sm" color="text.secondary">
                        Encuentra soluciones a problemas comunes
                      </Text>
                    </Box>
                  </HStack>
                </Link>
                <Link as={RouterLink} to="/support/faq" _hover={{ textDecoration: "none" }}>
                  <HStack
                    spacing={3}
                    p={2}
                    rounded="md"
                    _hover={{ bg: useColorModeValue("brand.primary.50", "gray.700") }}
                  >
                    <Icon as={FaQuestionCircle} color="accent.primary" boxSize={5} />
                    <Box>
                      <Text fontWeight={600}>Preguntas Frecuentes</Text>
                      <Text fontSize="sm" color="text.secondary">
                        Respuestas a las dudas más comunes
                      </Text>
                    </Box>
                  </HStack>
                </Link>
                <Link as={RouterLink} to="/contact" _hover={{ textDecoration: "none" }}>
                  <HStack
                    spacing={3}
                    p={2}
                    rounded="md"
                    _hover={{ bg: useColorModeValue("brand.primary.50", "gray.700") }}
                  >
                    <Icon as={FaHeadset} color="accent.primary" boxSize={5} />
                    <Box>
                      <Text fontWeight={600}>Contacto</Text>
                      <Text fontSize="sm" color="text.secondary">
                        Comunícate con nuestro equipo
                      </Text>
                    </Box>
                  </HStack>
                </Link>
              </Stack>
            </PopoverContent>
          </Popover>
        </Flex>

        {/* Mobile Search Bar */}
        <Box pb={2} display={{ base: "block", md: "none" }} px={4}>
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
  const linkColor = useColorModeValue("text.primary", "text.primary")
  const linkHoverColor = useColorModeValue("accent.primary", "brand.primary.300")
  const location = useLocation()

  return (
    <Stack direction="row" spacing={4}>
      <Link
        as={RouterLink}
        p={2}
        to="/"
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
        isActive={location.pathname === "/"}
      >
        <HStack spacing={1}>
          <Icon as={FaHome} />
          <Text>Inicio</Text>
        </HStack>
      </Link>
      <Link
        as={RouterLink}
        p={2}
        to="/about"
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
        isActive={location.pathname === "/about"}
      >
        <HStack spacing={1}>
          <Icon as={FaInfoCircle} />
          <Text>Nosotros</Text>
        </HStack>
      </Link>
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
      _hover={{ bg: useColorModeValue("brand.primary.50", "gray.900") }}
    >
      <Stack direction="row" align="center">
        <Box>
          <HStack>
            {icon && <Icon as={icon} color="accent.primary" />}
            <Text transition="all .3s ease" _groupHover={{ color: "accent.primary" }} fontWeight={500}>
              {label}
            </Text>
          </HStack>
          <Text fontSize="sm" color="text.secondary">
            {subLabel}
          </Text>
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
          <Icon color="accent.primary" w={5} h={5} as={FaChevronRight} />
        </Flex>
      </Stack>
    </Link>
  )
}

const CategoryItem = ({ icon, label, href }) => {
  return (
    <Link
      as={RouterLink}
      to={href}
      role="group"
      display="block"
      p={2}
      rounded="md"
      _hover={{ bg: useColorModeValue("brand.primary.50", "gray.900") }}
    >
      <HStack>
        <Icon as={icon} color="accent.primary" />
        <Text>{label}</Text>
      </HStack>
    </Link>
  )
}

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue("bg.card", "bg.card")} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <MobileNavItem
        label="Ayuda"
        icon={FaQuestionCircle}
        children={[
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
        ]}
      />
      <Box pt={4}>
        <Button as={RouterLink} to="/login" w="full" colorScheme="blue" leftIcon={<FaSignInAlt />}>
          Ingresar
        </Button>
      </Box>
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href, icon }) => {
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
        <HStack>
          {icon && <Icon as={icon} color="accent.primary" />}
          <Text fontWeight={600} color={useColorModeValue("text.primary", "text.primary")}>
            {label}
          </Text>
        </HStack>
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
          borderColor={useColorModeValue("border.default", "border.default")}
          align="start"
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} as={RouterLink} to={child.href} fontWeight={500}>
                <HStack>
                  {child.icon && <Icon as={child.icon} color="accent.primary" />}
                  <Text>{child.label}</Text>
                </HStack>
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
    icon: FaHome,
  },
  {
    label: "Nosotros",
    href: "/about",
    icon: FaInfoCircle,
  },
]

export default Navbar
