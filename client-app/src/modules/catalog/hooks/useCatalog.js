import { useState, useEffect, useCallback } from "react"
import * as catalogService from "../services/catalogService"

export const useCatalog = (initialParams = {}) => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState(initialParams)

  const fetchProducts = useCallback(async (params = {}) => {
    try {
      setLoading(true)
      setError(null)
      const data = await catalogService.getProducts(params)
      setProducts(data)
    } catch (err) {
      setError(err.response?.data?.message || "Error al cargar los productos")
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchCategories = useCallback(async () => {
    try {
      const data = await catalogService.getCategories()
      setCategories(data)
    } catch (err) {
      setError(err.response?.data?.message || "Error al cargar las categorías")
    }
  }, [])

  const getSubcategories = useCallback(async (categoryId) => {
    try {
      return await catalogService.getSubcategories(categoryId)
    } catch (err) {
      setError(err.response?.data?.message || "Error al cargar las subcategorías")
      return []
    }
  }, [])

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }, [])

  useEffect(() => {
    fetchProducts(filters)
  }, [filters, fetchProducts])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return {
    products,
    categories,
    loading,
    error,
    filters,
    updateFilters,
    getSubcategories,
    refetch: () => fetchProducts(filters)
  }
}

export default useCatalog