export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api"

export const DEAL_STAGES = ["Lead", "Contacted", "Proposal", "Negotiation", "Won", "Lost"] as const

export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  CUSTOMERS: "/customers",
  DEALS: "/deals",
  DEAL_DETAIL: "/deals/:id",
  TASKS: "/tasks",
  ORGANIZATIONS: "/organizations",
  SETTINGS: "/settings",
} as const
