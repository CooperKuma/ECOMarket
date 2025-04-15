"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  Flex,
  Button,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
  Skeleton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react"
import { FiSearch, FiFilter, FiChevronRight, FiX } from "react-icons/fi"
import { Link as RouterLink } from "react-router-dom"
import ProductCard from "../../components/ProductCard"
import Pagination from "../../components/Pagination"
import FilterSidebar from "../../components/FilterSidebar"
import { mockProducts } from "../../utils/mockData"

const SubCatalogMobilePage = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [selectedSubcategories, setSelectedSubcategories] = useState([])
  const [sortBy, setSortBy] = useState("relevance")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const productsPerPage = 12
  const categoryName = "Celulares"

  // Subcategorías específicas para Celulares
  const subcategories = [
    "Smartphones",
    "Fundas y protectores",
    "Cargadores",
    "Baterías",
    "Auriculares",
    "Smartwatches",
    "Cables",
    "Soportes",
    "Accesorios",
  ]

  // Simular carga de productos
  useEffect(() => {
    setIsLoading(true)

    // Filtrar productos de celulares del mock
    const mobileProducts = mockProducts.filter(
      (product) => product.category.toLowerCase() === categoryName.toLowerCase(),
    )

    setProducts(mobileProducts)
    setFilteredProducts(mobileProducts)

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filtrar productos
  useEffect(() => {
    let result = [...products]

    // Filtrar por subcategorías
    if (selectedSubcategories.length > 0) {
      result = result.filter((product) => selectedSubcategories.includes(product.subcategory))
    }

    // Filtrar por rango de precio
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Filtrar por término de búsqueda
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Ordenar productos
    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price_desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => Number.parseFloat(b.rating) - Number.parseFloat(a.rating))
        break
      case "newest":
        // En una app real, ordenarías por fecha
        result.sort(() => Math.random() - 0.5)
        break
      default:
        // relevancia - en una app real sería más complejo
        break
    }

    setFilteredProducts(result)
    setCurrentPage(1)
  }, [selectedSubcategories, priceRange, sortBy, searchTerm, products])

  // Obtener productos actuales para paginación
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  // Cambiar página
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Manejar selección de subcategoría
  const handleSubcategoryChange = (subcategory) => {
    if (selectedSubcategories.includes(subcategory)) {
      setSelectedSubcategories(selectedSubcategories.filter((item) => item !== subcategory))
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategory])
    }
  }

  // Resetear filtros
  const resetFilters = () => {
    setPriceRange([0, 50000])
    setSelectedSubcategories([])
    setSortBy("relevance")
    setSearchTerm("")
  }

  // Colores según el tema
  const bgColor = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const textColor = useColorModeValue("gray.800", "white")

  return (
    <Container maxW="1400px" px={{ base: 4, md: 6 }} py={6}>
      {/* Breadcrumbs */}
      <Breadcrumb separator={<FiChevronRight color="gray.500" />} mb={4} fontSize="sm" color={textColor}>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/">
            Inicio
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/catalog/all">
            Categorías
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{categoryName}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Título de categoría */}
      <Flex
        justify="space-between"
        align="center"
        mb={6}
        direction={{ base: "column", md: "row" }}
        gap={{ base: 4, md: 0 }}
      >
        <Box>
          <Heading size="lg">{categoryName}</Heading>
          <Text color="gray.500" mt={1}>
            {filteredProducts.length} productos encontrados
          </Text>
        </Box>

        {/* Botón de filtro móvil */}
        <Button
          leftIcon={<FiFilter />}
          onClick={onOpen}
          display={{ base: "flex", md: "none" }}
          colorScheme="blue"
          variant="outline"
          width="full"
        >
          Filtros
        </Button>

        {/* Selector de ordenamiento - Desktop */}
        <Box display={{ base: "none", md: "block" }} minW="200px">
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} bg={bgColor} borderColor={borderColor}>
            <option value="relevance">Más relevantes</option>
            <option value="price_asc">Menor precio</option>
            <option value="price_desc">Mayor precio</option>
            <option value="rating">Mejor calificados</option>
            <option value="newest">Más recientes</option>
          </Select>
        </Box>
      </Flex>

      {/* Búsqueda móvil */}
      <Box mb={6} display={{ base: "block", md: "none" }}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Buscar en esta categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            bg={bgColor}
            borderColor={borderColor}
          />
        </InputGroup>
      </Box>

      {/* Selector de ordenamiento - Móvil */}
      <Box mb={6} display={{ base: "block", md: "none" }}>
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} bg={bgColor} borderColor={borderColor}>
          <option value="relevance">Más relevantes</option>
          <option value="price_asc">Menor precio</option>
          <option value="price_desc">Mayor precio</option>
          <option value="rating">Mejor calificados</option>
          <option value="newest">Más recientes</option>
        </Select>
      </Box>

      {/* Contenido principal */}
      <Grid templateColumns={{ base: "1fr", md: "250px 1fr" }} gap={6}>
        {/* Filtros - Desktop */}
        <GridItem display={{ base: "none", md: "block" }}>
          <Box
            p={4}
            bg={bgColor}
            borderRadius="md"
            borderWidth="1px"
            borderColor={borderColor}
            position="sticky"
            top="100px"
          >
            <FilterSidebar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedSubcategories={selectedSubcategories}
              handleSubcategoryChange={handleSubcategoryChange}
              subcategories={subcategories}
              resetFilters={resetFilters}
            />
          </Box>
        </GridItem>

        {/* Grid de productos */}
        <GridItem>
          {/* Búsqueda - Desktop */}
          <Box mb={6} display={{ base: "none", md: "block" }}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiSearch color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Buscar en esta categoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                bg={bgColor}
                borderColor={borderColor}
              />
            </InputGroup>
          </Box>

          {/* Filtros seleccionados */}
          {(selectedSubcategories.length > 0 || searchTerm) && (
            <Flex wrap="wrap" gap={2} mb={4}>
              {selectedSubcategories.map((subcat) => (
                <Badge
                  key={subcat}
                  py={1}
                  px={2}
                  borderRadius="full"
                  colorScheme="blue"
                  display="flex"
                  alignItems="center"
                >
                  {subcat}
                  <Box as="span" ml={1} cursor="pointer" onClick={() => handleSubcategoryChange(subcat)}>
                    <FiX />
                  </Box>
                </Badge>
              ))}

              {searchTerm && (
                <Badge py={1} px={2} borderRadius="full" colorScheme="blue" display="flex" alignItems="center">
                  Búsqueda: {searchTerm}
                  <Box as="span" ml={1} cursor="pointer" onClick={() => setSearchTerm("")}>
                    <FiX />
                  </Box>
                </Badge>
              )}
            </Flex>
          )}

          {/* Grid de productos */}
          {isLoading ? (
            <Grid templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
              {Array(6)
                .fill(null)
                .map((_, index) => (
                  <Skeleton key={index} height="350px" borderRadius="md" />
                ))}
            </Grid>
          ) : filteredProducts.length === 0 ? (
            <Box p={8} textAlign="center" bg={bgColor} borderRadius="md" borderWidth="1px" borderColor={borderColor}>
              <Heading size="md" mb={4}>
                No se encontraron productos
              </Heading>
              <Text mb={6}>Intenta con otros filtros o términos de búsqueda</Text>
              <Button colorScheme="blue" onClick={resetFilters}>
                Limpiar filtros
              </Button>
            </Box>
          ) : (
            <Grid templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Grid>
          )}

          {/* Paginación */}
          {filteredProducts.length > 0 && (
            <Box mt={8}>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={paginate} />
            </Box>
          )}
        </GridItem>
      </Grid>

      {/* Drawer de filtros móvil */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent bg={bgColor}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" borderColor={borderColor}>
            Filtros
          </DrawerHeader>
          <DrawerBody py={4}>
            <FilterSidebar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedSubcategories={selectedSubcategories}
              handleSubcategoryChange={handleSubcategoryChange}
              subcategories={subcategories}
              resetFilters={resetFilters}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  )
}

export default SubCatalogMobilePage
