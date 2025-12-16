import axiosInstance from "./axios"

export const getDashboardSummary = async (): Promise<any> => {
  const response = await axiosInstance.get("/dashboard")
  return response.data
}
