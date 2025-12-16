import axiosInstance from "./axios"
import type { DashboardStats, Deal, Task } from "../types"

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    try {
      const response = await axiosInstance.get<DashboardStats>("/dashboard/stats")
      return response.data || { totalCustomers: 0, totalDeals: 0, totalRevenue: 0, activeTasks: 0 }
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error)
      return { totalCustomers: 0, totalDeals: 0, totalRevenue: 0, activeTasks: 0 }
    }
  },

  getRecentDeals: async (): Promise<Deal[]> => {
    try {
      const response = await axiosInstance.get<Deal[]>("/dashboard/recent-deals")
      return Array.isArray(response.data) ? response.data : []
    } catch (error) {
      console.error("Failed to fetch recent deals:", error)
      return []
    }
  },

  getUpcomingTasks: async (): Promise<Task[]> => {
    try {
      const response = await axiosInstance.get<Task[]>("/dashboard/upcoming-tasks")
      return Array.isArray(response.data) ? response.data : []
    } catch (error) {
      console.error("Failed to fetch upcoming tasks:", error)
      return []
    }
  },
}
