import axiosInstance from "./axios"
import type { Task } from "../types"

export type TaskCreateInput = {
  title: string
  description?: string
  status?: "TODO" | "IN_PROGRESS" | "COMPLETED"
  dueDate: string
  assignedToUserId: number | string
  dealId?: number | string
  customerId?: number | string
}

export const getTasks = async (): Promise<Task[]> => {
  const response = await axiosInstance.get<Task[]>("/tasks")
  return response.data
}

export const createTask = async (payload: TaskCreateInput): Promise<Task> => {
  const response = await axiosInstance.post<Task>("/tasks", payload)
  return response.data
}

export const completeTask = async (taskId: number | string): Promise<Task> => {
  const response = await axiosInstance.patch<Task>(`/tasks/${taskId}/complete`)
  return response.data
}
