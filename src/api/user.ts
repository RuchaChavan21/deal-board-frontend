import axiosInstance from "./axios";

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  location?: string;
  timeZone?: string;
  language?: string;
  avatarUrl?: string; // We will send Base64 string or URL here
  // Read-only stats usually come from backend logic, 
  // adding them here as optional for display
  lastLogin?: string;
  createdAt?: string;
  dealsHandled?: number;
  tasksCompleted?: number;
}

export const getMyProfile = async (): Promise<UserProfile> => {
  const response = await axiosInstance.get("/users/me");
  return response.data;
};

export const updateProfile = async (data: UserProfile): Promise<UserProfile> => {
  const response = await axiosInstance.put("/users/me", data);
  return response.data;
};