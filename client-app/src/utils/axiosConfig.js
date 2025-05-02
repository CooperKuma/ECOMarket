import axios from "axios"

// Configuración global de axios
const setupAxios = () => {
  // Configuración base
  axios.defaults.baseURL = import.meta.env.API_URL

  // Interceptores para solicitudes
  axios.interceptors.request.use(
    (config) => {
      // Puedes añadir tokens de autenticación aquí
      const token = localStorage.getItem("authToken")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  // Interceptores para respuestas
  axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // Manejo global de errores
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.error("Error de respuesta:", error.response.data)

        // Manejo de errores de autenticación
        if (error.response.status === 401) {
          // Redirigir a login o refrescar token
          console.log("Sesión expirada, redirigiendo...")
          // window.location.href = '/login';
        }
      } else if (error.request) {
        // La solicitud se realizó pero no se recibió respuesta
        console.error("Error de solicitud:", error.request)
      } else {
        // Algo ocurrió al configurar la solicitud
        console.error("Error:", error.message)
      }

      return Promise.reject(error)
    },
  )
}

export default setupAxios
