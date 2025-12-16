import axiosInstance from "./axios"
import type { Task } from "../types"

export const tasksApi = {
  getAll: async (): Promise<Task[]> => {
    try {
      const response = await axiosInstance.get<Task[]>("/tasks")
      return Array.isArray(response.data) ? response.data : []
    } catch (error) {
      console.error("Failed to fetch tasks:", error)
      return []
    }
  },

  getById: async (id: string): Promise<Task | null> => {
    try {
      const response = await axiosInstance.get<Task>(`/tasks/${id}`)
      return response.data
    } catch (error) {
      console.error(`Failed to fetch task ${id}:`, error)
      return null
    }
  },

  create: async (task: Omit<Task, "id">): Promise<Task | null> => {
    try {
      const response = await axiosInstance.post<Task>("/tasks", task)
      return response.data
    } catch (error) {
      console.error("Failed to create task:", error)
      return null
    }
  },

  update: async (id: string, task: Partial<Task>): Promise<Task | null> => {
    try {
      const response = await axiosInstance.put<Task>(`/tasks/${id}`, task)
      return response.data
    } catch (error) {
      console.error(`Failed to update task ${id}:`, error)
      return null
    }
  },

  markCompleted: async (id: string): Promise<Task | null> => {
    try {
      const response = await axiosInstance.patch<Task>(`/tasks/${id}/complete`)
      return response.data
    } catch (error) {
      console.error(`Failed to mark task ${id} as completed:`, error)
      return null
    }
  },

  delete: async (id: string): Promise<boolean> => {
    try {
      await axiosInstance.delete(`/tasks/${id}`)
      return true
    } catch (error) {
      console.error(`Failed to delete task ${id}:`, error)
      return false
    }
  },
}
