import axios, { AxiosHeaders } from "axios"

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

if (typeof window !== "undefined") {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token")
      const userId = localStorage.getItem("userId")
      const orgId = localStorage.getItem("orgId")

      if (token) {
        const headers = AxiosHeaders.from(config.headers || {})
        headers.set("Authorization", `Bearer ${token}`)

        if (userId) {
          headers.set("X-USER-ID", userId)
        }

        if (orgId) {
          headers.set("X-ORG-ID", orgId)
        }

        config.headers = headers
      }

      return config
    },
    (error) => Promise.reject(error),
  )

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status

      if (status === 401 || status === 403) {
        localStorage.clear()
      }

      return Promise.reject(error)
    },
  )
}

export default axiosInstance
