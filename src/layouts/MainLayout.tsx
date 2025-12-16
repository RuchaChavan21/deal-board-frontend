"use client"

import type React from "react"
import { usePathname } from "next/navigation"

import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import type { ReactNode } from "react"

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const pathname = usePathname()

  const isPublic = pathname === "/" || pathname === "/login" || pathname === "/register"
  const isDashboard = pathname === "/dashboard"

  // Dashboard has its own layout integrated, so don't wrap it
  if (isPublic || isDashboard) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-muted/30">{children}</main>
      </div>
    </div>
  )
}
