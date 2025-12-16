export const isAdmin = (role) => role === "ADMIN"

export const canManageDeals = (role) => role === "ADMIN" || role === "MANAGER"

export const canCreateTasks = (role) => role === "ADMIN" || role === "MANAGER"


