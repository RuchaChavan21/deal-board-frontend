import axiosInstance from "./axios"

export const getDeals = async (): Promise<any[]> => {
  const response = await axiosInstance.get("/deals")
  return response.data
}

export const createDeal = async (payload: any): Promise<any> => {
  const response = await axiosInstance.post("/deals", payload)
  return response.data
}

export const updateDeal = async (id: string, payload: any): Promise<any> => {
  const response = await axiosInstance.put(`/deals/${id}`, payload)
  return response.data
}
