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
  id: string
  title: string
  value: number
  stage: DealStage
  customerId: string
  customerName: string
  expectedCloseDate: string
  ownerId: string
  ownerName: string
}

export type DealStage = "Lead" | "Contacted" | "Proposal" | "Negotiation" | "Won" | "Lost"

export interface Task {
  id: string
  title: string
  dealId?: string
  dealTitle?: string
  assignedUserId: string
  assignedUserName: string
  status: "pending" | "completed"
  dueDate: string
}

export interface DashboardStats {
  totalCustomers: number
  activeDeals: number
  dealsWon: number
  pendingTasks: number
}
