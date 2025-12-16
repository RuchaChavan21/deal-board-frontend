import axiosInstance from "./axios"
import type { Deal, DealStage } from "../types"

export const getDeals = async (): Promise<Deal[]> => {
  const response = await axiosInstance.get<Deal[]>("/deals")
  return response.data
}

export type DealCreateInput = {
  title: string
  value: number
  customerId: number
  expectedCloseDate: string
} & Record<string, unknown>

export type DealStageUpdateInput = {
  stage: DealStage
}

export const createDeal = async (payload: DealCreateInput): Promise<Deal> => {
  const response = await axiosInstance.post<Deal>("/deals", payload)
  return response.data
}

export const updateDeal = async (id: number, payload: DealStageUpdateInput): Promise<Deal> => {
  const response = await axiosInstance.patch<Deal>(`/deals/${id}/stage`, payload)
  return response.data
}
