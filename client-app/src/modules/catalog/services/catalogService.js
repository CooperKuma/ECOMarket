import axios from "axios"

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL })

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getProducts = async (params = {}) => {
  const res = await API.get("/products", { params })
  return res.data
}

export const getProductById = async (id) => {
  const res = await API.get(`/products/${id}`)
  return res.data
}

const catalogService = {
  getProducts,
  getProductById,
}

export default catalogService