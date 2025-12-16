"use client"

import type { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface ProtectedRouteProps {
  allowedRoles: string[]
  children: ReactNode
}

export const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const router = useRouter()
  const [isAllowed, setIsAllowed] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const role = typeof window !== "undefined" ? localStorage.getItem("role") || "" : ""

    if (!role || (allowedRoles.length > 0 && !allowedRoles.includes(role))) {
      router.replace("/unauthorized")
      setChecked(true)
      return
    }

    setIsAllowed(true)
    setChecked(true)
  }, [allowedRoles, router])

  if (!checked || !isAllowed) {
    return null
  }

  return <>{children}</>
}


