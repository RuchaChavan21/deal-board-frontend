import axiosInstance from "./axios"
import type { Deal, DealStage } from "../types"

export const dealsApi = {
  getAll: async (): Promise<Deal[]> => {
    try {
      const response = await axiosInstance.get<Deal[]>("/deals")
      return Array.isArray(response.data) ? response.data : []
    } catch (error) {
      console.error("Failed to fetch deals:", error)
      return []
    }
  },

  getById: async (id: string): Promise<Deal | null> => {
    try {
      const response = await axiosInstance.get<Deal>(`/deals/${id}`)
      return response.data
    } catch (error) {
      console.error(`Failed to fetch deal ${id}:`, error)
      return null
    }
  },

  create: async (deal: Omit<Deal, "id">): Promise<Deal | null> => {
    try {
      const response = await axiosInstance.post<Deal>("/deals", deal)
      return response.data
    } catch (error) {
      console.error("Failed to create deal:", error)
      return null
    }
  },

  update: async (id: string, deal: Partial<Deal>): Promise<Deal | null> => {
    try {
      const response = await axiosInstance.put<Deal>(`/deals/${id}`, deal)
      return response.data
    } catch (error) {
      console.error(`Failed to update deal ${id}:`, error)
      return null
    }
  },

  updateStage: async (id: string, stage: DealStage): Promise<Deal | null> => {
    try {
      const response = await axiosInstance.patch<Deal>(`/deals/${id}/stage`, { stage })
      return response.data
    } catch (error) {
      console.error(`Failed to update deal stage for ${id}:`, error)
      return null
    }
  },

  delete: async (id: string): Promise<boolean> => {
    try {
      await axiosInstance.delete(`/deals/${id}`)
      return true
    } catch (error) {
      console.error(`Failed to delete deal ${id}:`, error)
      return false
    }
  },
}
