import axiosInstance from "./axios"

export const getOrganizations = async (): Promise<any[]> => {
  const response = await axiosInstance.get("/orgs")
  return response.data
}

export const getMyOrganizations = async (): Promise<any[]> => {
  const response = await axiosInstance.get("/orgs/my")
  return response.data
}

export const createOrganization = async (payload: { name: string; description?: string }): Promise<any> => {
  const response = await axiosInstance.post("/orgs", payload)
  return response.data
}
