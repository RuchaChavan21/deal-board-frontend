"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Building2, User, Settings, LogOut } from "lucide-react"
import { getMyOrganizations } from "../api/organizations"

type OrgMember = {
  id?: number | string
  role?: string
  organization?: {
    id?: number | string
    name?: string
    description?: string
  } | null
  [key: string]: any
}

type OrgWithRole = {
  id: string
  name: string
  role: string | undefined
}

export const Header = () => {
  const [organizations, setOrganizations] = useState<OrgWithRole[]>([])
  const [activeOrg, setActiveOrg] = useState<string>("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [userName, setUserName] = useState("User")

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const data = await getMyOrganizations()
        const members: OrgMember[] = Array.isArray(data) ? data : []

        const orgList: OrgWithRole[] = members
          .map((member) => {
            const org = member.organization
            if (!org || org.id == null) return null

            return {
              id: String(org.id),
              name: org.name || "Unknown Department",
              role: member.role,
            }
          })
          .filter((org): org is OrgWithRole => org !== null)

        setOrganizations(orgList)

        if (orgList.length > 0) {
          const storedOrgId =
            localStorage.getItem("currentOrgId") ||
            localStorage.getItem("orgId") ||
            localStorage.getItem("activeOrganizationId")

          const activeOrgToCheck = orgList.find(o => o.id === storedOrgId) || orgList[0]

          setActiveOrg(activeOrgToCheck.id)
          // Ensure role is kept in sync on initial load
          if (activeOrgToCheck.role) {
            localStorage.setItem("currentOrgRole", activeOrgToCheck.role)
            // Also update cookie for middleware if needed
            document.cookie = `currentOrgId=${activeOrgToCheck.id}; path=/; SameSite=Lax`
          }
        }
      } catch (error) {
        console.error("Failed to fetch organizations:", error)
        setOrganizations([])
      }
    }

    fetchOrganizations()
  }, [])

  useEffect(() => {
    const name = typeof window !== "undefined"
      ? localStorage.getItem("userName") || localStorage.getItem("name") || "User"
      : "User"
    setUserName(name)
  }, [])

  const handleOrgChange = (org: OrgWithRole) => {
    const orgId = org.id
    const orgRole = org.role

    setActiveOrg(orgId)
    localStorage.setItem("currentOrgId", orgId)
    localStorage.setItem("orgId", orgId)
    if (orgRole) {
      localStorage.setItem("currentOrgRole", orgRole)
    }
    document.cookie = `currentOrgId=${orgId}; path=/; SameSite=Lax`
    setIsDropdownOpen(false)
    window.location.reload()
  }

  const activeOrgData = organizations.find((org) => org.id === activeOrg)
  const activeOrgName = activeOrgData?.name || "Select Department"

  return (
    <header className="h-16 bg-base border-b border-border flex items-center justify-between px-6 shadow-sm">
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-card text-text-base border border-border rounded-lg hover:bg-section transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <Building2 className="w-4 h-4 text-muted-foreground" />
          <span>{activeOrgName}</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
        {isDropdownOpen && organizations.length > 0 && (
          <div className="absolute left-0 mt-2 w-72 bg-card border border-border rounded-lg shadow-lg z-10 overflow-hidden">
            {organizations.map((org) => (
              <button
                key={org.id}
                onClick={() => handleOrgChange(org)}
                className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${org.id === activeOrg ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-muted"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span>{org.name}</span>
                  {org.role && (
                    <span className="ml-2 text-xs rounded-full px-2 py-0.5 bg-muted text-muted-foreground uppercase">
                      {org.role}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 text-muted-foreground hover:text-text-base hover:bg-section rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-section transition-colors"
          >
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shadow-xs">
              <User className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-text-base">{userName}</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border py-1 z-20">
              <Link
                href="/profile"
                className="flex items-center gap-2 px-4 py-2 text-sm text-text-base hover:bg-section"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-2 px-4 py-2 text-sm text-text-base hover:bg-section"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
              <div className="border-t border-border my-1" />
              <button
                onClick={() => {
                  localStorage.clear()
                  window.location.href = "/login"
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 w-full text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
