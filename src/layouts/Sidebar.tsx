"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  CheckSquare,
  Building2,
  Settings,
  BarChart3,
} from "lucide-react"
import { isAdmin } from "../utils/roles"

interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
}

export const Sidebar = () => {
  const pathname = usePathname()
  const [role, setRole] = useState("")

  // 1. Safe Role Hydration: 
  // We fetch the role once on mount. We DO NOT block rendering while waiting.
  // This ensures the sidebar is visible and clickable instantly.
  useEffect(() => {
    const storedRole = localStorage.getItem("role") || ""
    setRole(storedRole)
  }, [])

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-6 h-6" />,
    },
    {
      label: "Deals",
      path: "/deals",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      label: "Tasks",
      path: "/tasks",
      icon: <CheckSquare className="w-6 h-6" />,
    },
    {
      label: "Customers",
      path: "/customers",
      icon: <Users className="w-6 h-6" />,
    },
    {
      label: "Organizations",
      path: "/organizations",
      icon: <Building2 className="w-6 h-6" />,
    },
  ]

  // Only add Settings if role is confirmed
  if (isAdmin(role)) {
    navItems.push({
      label: "Settings",
      path: "/settings",
      icon: <Settings className="w-6 h-6" />,
    })
  }

  const isActive = (path: string) => {
    if (!pathname) return false
    if (path === "/dashboard") {
      return pathname === "/" || pathname === "/dashboard"
    }
    return pathname.startsWith(path)
  }

  return (
    <aside className="w-20 bg-[#164e63] h-screen flex flex-col items-center py-6 shadow-xl shrink-0 z-50">
      
      {/* Logo Area */}
      <div className="mb-10 w-full flex justify-center">
        <Link 
            href="/dashboard" 
            className="flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
        >
          <div className="text-white opacity-90 hover:opacity-100 transition-opacity">
            <BarChart3 className="w-8 h-8" strokeWidth={3} />
          </div>
        </Link>
      </div>

      {/* Navigation Area */}
      <nav className="flex-1 w-full flex flex-col gap-4">
        {navItems.map((item) => {
          const active = isActive(item.path)

          return (
            <Link
              key={item.path}
              href={item.path}
              title={item.label}
              className="relative flex items-center justify-center h-12 w-full group cursor-pointer"
            >
              {/* Active/Hover State Container */}
              <div
                className={`
                  flex items-center justify-center w-full h-full pl-2 transition-all duration-200
                  ${
                    active
                      ? "bg-[#f0f2f5] text-[#164e63] rounded-l-3xl ml-3 shadow-sm"
                      : "text-blue-100/60 hover:text-white hover:bg-white/5 rounded-l-3xl ml-3"
                  }
                `}
              >
                {item.icon}
              </div>

              {/* Tooltip */}
              <span className="absolute left-16 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-[60] shadow-md">
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* Profile Icon */}
      <div className="mt-auto mb-4">
        <Link
          href="/profile"
          title="My Profile"
          className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-blue-200/30 text-xs text-white font-medium bg-[#1e5f7a] hover:bg-[#257394] transition-colors shadow-lg cursor-pointer"
        >
          AJ
        </Link>
      </div>
    </aside>
  )
}