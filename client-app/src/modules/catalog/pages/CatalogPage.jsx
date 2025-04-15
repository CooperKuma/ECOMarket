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
import { useParams, Link as RouterLink } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import Pagination from "../components/Pagination"
import FilterSidebar from "../components/FilterSidebar"
import { mockProducts, categories } from "../utils/mockData"

const CatalogPage = () => {
  const { category } = useParams()
  const [products, setProducts] = useState(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [currentPage, setCurrentPage] = useState(1)
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [selectedSubcategories, setSelectedSubcategories] = useState([])
  const [sortBy, setSortBy] = useState("relevance")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const productsPerPage = 12
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const bgColor = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const textColor = useColorModeValue("gray.800", "white")
  const accentColor = useColorModeValue("brand.primary.500", "brand.primary.300")

  const categoryInfo = category ? categories[category] : null
  const categoryName = categoryInfo ? categoryInfo.name : "Todos los productos"
  const subcategories = categoryInfo ? categoryInfo.subcategories : []

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter products based on selected filters
  useEffect(() => {
    let result = [...mockProducts]

    // Filter by category
    if (category && category !== "all") {
      result = result.filter((product) => product.category.toLowerCase() === categoryName.toLowerCase())
    }

    // Filter by subcategories
    if (selectedSubcategories.length > 0) {
      // In a real app, you would filter by subcategories here
      // For this mock, we'll just filter randomly
      result = result.filter(() => Math.random() > 0.3)
    }

    // Filter by price range
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Sort products
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
        // In a real app, you would sort by date
        result.sort(() => Math.random() - 0.5)
        break
      default:
        // relevance - in a real app this would be more complex
        break
    }

    setFilteredProducts(result)
    setCurrentPage(1)
  }, [category, selectedSubcategories, priceRange, sortBy, searchTerm, categoryName])

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Handle subcategory selection
  const handleSubcategoryChange = (subcategory) => {
    if (selectedSubcategories.includes(subcategory)) {
      setSelectedSubcategories(selectedSubcategories.filter((item) => item !== subcategory))
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategory])
    }
  }

  // Reset filters
  const resetFilters = () => {
    setPriceRange([0, 50000])
    setSelectedSubcategories([])
    setSortBy("relevance")
    setSearchTerm("")
  }

  return (
    <Container maxW="1400px" px={{ base: 4, md: 6 }} py={6}>
      {/* Breadcrumbs */}
      <Breadcrumb separator={<FiChevronRight color="gray.500" />} mb={4} fontSize="sm" color={textColor}>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/">
            Inicio
          </BreadcrumbLink>
        </BreadcrumbItem>
        {category && category !== "all" && (
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{categoryName}</BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>

      {/* Category Title */}
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

        {/* Mobile Filter Button */}
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

        {/* Sort Dropdown - Desktop */}
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

      {/* Mobile Search */}
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

      {/* Sort Dropdown - Mobile */}
      <Box mb={6} display={{ base: "block", md: "none" }}>
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} bg={bgColor} borderColor={borderColor}>
          <option value="relevance">Más relevantes</option>
          <option value="price_asc">Menor precio</option>
          <option value="price_desc">Mayor precio</option>
          <option value="rating">Mejor calificados</option>
          <option value="newest">Más recientes</option>
        </Select>
      </Box>

      {/* Main Content */}
      <Grid templateColumns={{ base: "1fr", md: "250px 1fr" }} gap={6}>
        {/* Filters - Desktop */}
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

        {/* Products Grid */}
        <GridItem>
          {/* Desktop Search */}
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

          {/* Selected Filters */}
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

          {/* Products Grid */}
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

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <Box mt={8}>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={paginate} />
            </Box>
          )}
        </GridItem>
      </Grid>

      {/* Mobile Filter Drawer */}
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

export default CatalogPage
