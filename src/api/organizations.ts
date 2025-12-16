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

// src/api/organizations.ts

// ... existing imports and functions ...

export const addMemberToOrganization = async (orgId: string, userId: string, role: string) => {
  // Matches @PostMapping("/{orgId}/members") in your Java Controller
  const response = await axiosInstance.post(`/orgs/${orgId}/members`, {
    userId, // Backend expects Map<String, String> with "userId"
    role    // and "role"
  })
  return response.data
}