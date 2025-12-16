import axiosInstance from "./axios"
import type { Organization } from "../types"

export const organizationsApi = {
  getAll: async (): Promise<Organization[]> => {
    try {
      const response = await axiosInstance.get<Organization[]>("/organizations")
      return Array.isArray(response.data) ? response.data : []
    } catch (error) {
      console.error("Failed to fetch organizations:", error)
      return []
    }
  },

  getById: async (id: string): Promise<Organization | null> => {
    try {
      const response = await axiosInstance.get<Organization>(`/organizations/${id}`)
      return response.data
    } catch (error) {
      console.error(`Failed to fetch organization ${id}:`, error)
      return null
    }
  },

  create: async (organization: Omit<Organization, "id">): Promise<Organization | null> => {
    try {
      const response = await axiosInstance.post<Organization>("/organizations", organization)
      return response.data
    } catch (error) {
      console.error("Failed to create organization:", error)
      return null
    }
  },

  setActive: async (id: string): Promise<boolean> => {
    try {
      await axiosInstance.post(`/organizations/${id}/set-active`)
      return true
    } catch (error) {
      console.error(`Failed to set active organization ${id}:`, error)
      return false
    }
  },
}
