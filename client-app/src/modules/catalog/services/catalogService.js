import axios from "axios"

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL })

// Configurar interceptor para incluir el token en las peticiones
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getProducts = (params) =>
  API.get("/products", { params }).then((res) => res.data)

export const getProductById = (id) =>
  API.get(`/products/${id}`).then((res) => res.data)

export const getCategories = () =>
  API.get("/categories").then((res) => res.data)

export const getSubcategories = (categoryId) =>
  API.get(`/categories/${categoryId}/subcategories`).then((res) => res.data)

const catalogService = {
  getProducts,
  getProductById,
  getCategories,
  getSubcategories,
}

export default catalogService