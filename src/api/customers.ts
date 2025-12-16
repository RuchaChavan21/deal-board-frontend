import axiosInstance from "./axios"

export const getCustomers = async (): Promise<any[]> => {
  const response = await axiosInstance.get("/customers")
  return response.data
}
