"use client"

import { useState, useEffect } from "react"
import {
  Box, Container, Grid, GridItem, Heading, Text, Flex, Button, Select, Input,
  InputGroup, InputLeftElement, Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  useColorModeValue, Skeleton, useDisclosure, Drawer, DrawerBody, DrawerHeader,
  DrawerOverlay, DrawerContent, DrawerCloseButton
} from "@chakra-ui/react"
import { FiSearch, FiFilter, FiChevronRight } from "react-icons/fi"
import { useParams, Link as RouterLink } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import Pagination from "../components/Pagination"
import FilterSidebar from "../components/FilterSidebar"
import catalogService from "../services/catalogService"
import { toSpanishCategory } from "../../../utils/categoryTranslator"

const normalize = (str) =>
  str?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim()

const CatalogPage = () => {
  const { category } = useParams()
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
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const bgColor = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const textColor = useColorModeValue("gray.800", "white")

  const categoryDisplayName = toSpanishCategory(category || "Todos los productos")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const data = await catalogService.getProducts()
        setProducts(data)
      } catch (err) {
        console.error("Error al cargar productos del backend", err)
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let result = Array.isArray(products) ? [...products] : []

    if (category && category !== "all") {
      const spanishCategory = toSpanishCategory(category)
      result = result.filter(
        (product) =>
          product.category &&
          normalize(product.category) === normalize(spanishCategory)
      )
    }
    

    if (selectedSubcategories.length > 0) {
      result = result.filter(() => Math.random() > 0.3) // lógica temporal
    }

    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price_desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => (parseFloat(b.rating || 0) - parseFloat(a.rating || 0)))
        break
      case "newest":
        result.sort(() => Math.random() - 0.5)
        break
      default:
        break
    }

    setFilteredProducts(result)
    setCurrentPage(1)
  }, [category, selectedSubcategories, priceRange, sortBy, searchTerm, products])

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handleSubcategoryChange = (subcategory) => {
    if (selectedSubcategories.includes(subcategory)) {
      setSelectedSubcategories(selectedSubcategories.filter((item) => item !== subcategory))
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategory])
    }
  }

  const resetFilters = () => {
    setPriceRange([0, 50000])
    setSelectedSubcategories([])
    setSortBy("relevance")
    setSearchTerm("")
  }

  return (
    <Container maxW="1400px" px={{ base: 4, md: 6 }} py={6}>
      <Breadcrumb separator={<FiChevronRight />} mb={4} fontSize="sm" color={textColor}>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/">Inicio</BreadcrumbLink>
        </BreadcrumbItem>
        {category && category !== "all" && (
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{categoryDisplayName}</BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>

      <Flex justify="space-between" align="center" mb={6} direction={{ base: "column", md: "row" }} gap={{ base: 4, md: 0 }}>
        <Box>
          <Heading size="lg">{categoryDisplayName}</Heading>
          <Text color="gray.500" mt={1}>{filteredProducts.length} productos encontrados</Text>
        </Box>

        <Button leftIcon={<FiFilter />} onClick={onOpen} display={{ base: "flex", md: "none" }} colorScheme="blue" variant="outline" width="full">
          Filtros
        </Button>

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

      <Box mb={6}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            bg={bgColor}
            borderColor={borderColor}
          />
        </InputGroup>
      </Box>

      <Grid templateColumns={{ base: "1fr", md: "250px 1fr" }} gap={6}>
        <GridItem display={{ base: "none", md: "block" }}>
          <Box p={4} bg={bgColor} borderRadius="md" borderWidth="1px" borderColor={borderColor} position="sticky" top="100px">
            <FilterSidebar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedSubcategories={selectedSubcategories}
              handleSubcategoryChange={handleSubcategoryChange}
              subcategories={[]} // Implementar subcategorías reales si se necesitan
              resetFilters={resetFilters}
            />
          </Box>
        </GridItem>

        <GridItem>
          {isLoading ? (
            <Grid templateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap={6}>
              {Array(6).fill(null).map((_, index) => (
                <Skeleton key={index} height="350px" borderRadius="md" />
              ))}
            </Grid>
          ) : filteredProducts.length === 0 ? (
            <Box p={8} textAlign="center" bg={bgColor} borderRadius="md" borderWidth="1px" borderColor={borderColor}>
              <Heading size="md" mb={4}>No se encontraron productos</Heading>
              <Text mb={6}>Intenta con otros filtros o términos de búsqueda</Text>
              <Button colorScheme="blue" onClick={resetFilters}>Limpiar filtros</Button>
            </Box>
          ) : (
            <Grid templateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap={6}>
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Grid>
          )}

          {filteredProducts.length > 0 && (
            <Box mt={8}>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={paginate} />
            </Box>
          )}
        </GridItem>
      </Grid>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent bg={bgColor}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" borderColor={borderColor}>Filtros</DrawerHeader>
          <DrawerBody py={4}>
            <FilterSidebar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedSubcategories={selectedSubcategories}
              handleSubcategoryChange={handleSubcategoryChange}
              subcategories={[]}
              resetFilters={resetFilters}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  )
}

export default CatalogPage
