"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, TrendingUp, CheckSquare, Building2, Settings } from "lucide-react"
import { isAdmin } from "../utils/roles"

interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
}

export const Sidebar = () => {
  const pathname = usePathname()
  const role = typeof window !== "undefined" ? localStorage.getItem("role") || "" : ""

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: "Customers",
      path: "/customers",
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: "Deals",
      path: "/deals",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      label: "Tasks",
      path: "/tasks",
      icon: <CheckSquare className="w-5 h-5" />,
    },
    {
      label: "Organizations",
      path: "/organizations",
      icon: <Building2 className="w-5 h-5" />,
    },
    ...(isAdmin(role)
      ? [
          {
            label: "Settings",
            path: "/settings",
            icon: <Settings className="w-5 h-5" />,
          } satisfies NavItem,
        ]
      : []),
  ]

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/" || pathname === "/dashboard"
    }
    return pathname?.startsWith(path)
  }

  return (
    <aside className="w-64 bg-card border-r border-border h-screen flex flex-col">
      <div className="px-6 py-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">D</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Deal Board</span>
        </Link>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
              isActive(item.path)
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
