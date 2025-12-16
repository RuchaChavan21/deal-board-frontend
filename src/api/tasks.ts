import axiosInstance from "./axios"

export const getTasks = async (): Promise<any[]> => {
  const response = await axiosInstance.get("/tasks")
  return response.data
}

export const createTask = async (payload: any): Promise<any> => {
  const response = await axiosInstance.post("/tasks", payload)
  return response.data
}
