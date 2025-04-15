"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Grid,
  GridItem,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
} from "@chakra-ui/react"
import { FiChevronRight } from "react-icons/fi"
import { useParams, Link as RouterLink } from "react-router-dom"
import ImageGallery from "../components/ImageGallery"
import ProductInfo from "../components/ProductInfo"
import ProductTabs from "../components/ProductTabs"
import SimilarProducts from "../components/SimilarProducts"
import { mockProduct } from "../utils/mockData"

const ProductDetailPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(mockProduct)
  const textColor = useColorModeValue("gray.800", "white")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const bgColor = useColorModeValue("white", "gray.800")

  return (
    <Container maxW="1400px" px={{ base: 4, md: 6 }} py={6}>
      {/* Breadcrumbs */}
      <Breadcrumb separator={<FiChevronRight color="gray.500" />} mb={6} fontSize="sm" color={textColor}>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/">
            Inicio
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to={`/catalog/${product.category.toLowerCase()}`}>
            {product.category}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            as={RouterLink}
            to={`/catalog/${product.category.toLowerCase()}/${product.subcategory.toLowerCase()}`}
          >
            {product.subcategory}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{product.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Product Detail */}
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8} mb={12}>
        {/* Product Images */}
        <GridItem>
          <ImageGallery images={product.images} productName={product.name} />
        </GridItem>

        {/* Product Info */}
        <GridItem>
          <ProductInfo product={product} />
        </GridItem>
      </Grid>

      {/* Product Details Tabs */}
      <Box mb={12} borderWidth="1px" borderRadius="lg" borderColor={borderColor} bg={bgColor} overflow="hidden">
        <ProductTabs product={product} />
      </Box>

      {/* Similar Products */}
      <SimilarProducts />
    </Container>
  )
}

export default ProductDetailPage
