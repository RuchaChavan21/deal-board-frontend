import axios from "axios"
import { API_BASE_URL } from "../utils/constants"

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log errors for debugging
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data)
    } else if (error.request) {
      console.error("Network Error: No response received from server")
    } else {
      console.error("Error:", error.message)
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
