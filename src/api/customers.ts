import axiosInstance from "./axios"

// Get all customers for the current organization
export const getCustomers = async (): Promise<any[]> => {
  const response = await axiosInstance.get("/customers")
  return response.data
}

// Create a new customer
export const createCustomer = async (data: {
  name: string
  email: string
  phone: string
  status?: string
  owner?: string
}): Promise<any> => {
  const response = await axiosInstance.post("/customers", data)
  return response.data
}