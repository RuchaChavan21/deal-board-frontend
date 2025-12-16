import axiosInstance from "./axios"

export const getOrganizations = async (): Promise<any[]> => {
  const response = await axiosInstance.get("/orgs")
  return response.data
}
