export interface User {
  id: string
  email: string
  name: string
  role: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface Organization {
  id: string
  name: string
  description?: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  owner: string
  status: string
}

export interface Deal {
  id: number
  title: string
  value: number
  stage: DealStage
  customerId: number
  customerName: string
  expectedCloseDate: string
  ownerId: number
  ownerName: string
}

export type DealStage = "Lead" | "Contacted" | "Proposal" | "Negotiation" | "Won" | "Lost"

export interface Task {
  id: number | string
  title: string
  description?: string
  status: "TODO" | "IN_PROGRESS" | "COMPLETED"
  dueDate: string
  assignedToUserId: number | string
  dealId?: number | string
  customerId?: number | string
  organizationId?: number | string
}

export interface DashboardStats {
  totalCustomers: number
  activeDeals: number
  dealsWon: number
  pendingTasks: number
}
