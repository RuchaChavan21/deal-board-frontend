export const isAdmin = (role) => role?.toUpperCase() === "ADMIN"

export const canManageDeals = (role) => {
  const normalized = role?.toUpperCase()
  return normalized === "ADMIN" || normalized === "MANAGER"
}

export const canCreateTasks = (role) => {
  const normalized = role?.toUpperCase()
  return normalized === "ADMIN" || normalized === "MANAGER"
}


