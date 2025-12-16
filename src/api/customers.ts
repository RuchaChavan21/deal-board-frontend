import axiosInstance from "./axios"
import type { Customer } from "../types"

export const customersApi = {
  getAll: async (page = 1, limit = 20): Promise<{ customers: Customer[]; total: number }> => {
    try {
      const response = await axiosInstance.get(`/customers?page=${page}&limit=${limit}`)
      return {
        customers: Array.isArray(response.data?.customers) ? response.data.customers : [],
        total: response.data?.total || 0,
      }
    } catch (error) {
      console.error("Failed to fetch customers:", error)
      return { customers: [], total: 0 }
    }
  },

  getById: async (id: string): Promise<Customer | null> => {
    try {
      const response = await axiosInstance.get<Customer>(`/customers/${id}`)
      return response.data
    } catch (error) {
      console.error(`Failed to fetch customer ${id}:`, error)
      return null
    }
  },

  create: async (customer: Omit<Customer, "id">): Promise<Customer | null> => {
    try {
      const response = await axiosInstance.post<Customer>("/customers", customer)
      return response.data
    } catch (error) {
      console.error("Failed to create customer:", error)
      return null
    }
  },

  update: async (id: string, customer: Partial<Customer>): Promise<Customer | null> => {
    try {
      const response = await axiosInstance.put<Customer>(`/customers/${id}`, customer)
      return response.data
    } catch (error) {
      console.error(`Failed to update customer ${id}:`, error)
      return null
    }
  },

  delete: async (id: string): Promise<boolean> => {
    try {
      await axiosInstance.delete(`/customers/${id}`)
      return true
    } catch (error) {
      console.error(`Failed to delete customer ${id}:`, error)
      return false
    }
  },
}
