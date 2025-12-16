import axios from "axios"

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
      const role = localStorage.getItem("currentOrgRole") || localStorage.getItem("role")
      const orgId = localStorage.getItem("currentOrgId")

      let userId: string | undefined
      const authUserRaw = localStorage.getItem("auth_user")
      if (authUserRaw) {
        try {
          const parsed = JSON.parse(authUserRaw) as { id?: number | string } | null
          if (parsed && parsed.id != null) {
            userId = String(parsed.id)
          }
        } catch {
          // ignore parse errors and fall back to legacy key
        }
      }
      if (!userId) {
        const legacy = localStorage.getItem("userId")
        if (legacy) {
          userId = legacy
        }
      }

      const headers: Record<string, string> =
        (config.headers as Record<string, string> | undefined) ? { ...(config.headers as Record<string, string>) } : {}

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      if (role) {
        headers["X-ROLE"] = role.toUpperCase()
      }
      

      if (userId) {
        headers["X-USER-ID"] = userId
      }

      if (orgId && !(config.url || "").includes("/orgs/my")) {
        headers["X-ORG-ID"] = orgId
      }

      config.headers = headers as any
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
