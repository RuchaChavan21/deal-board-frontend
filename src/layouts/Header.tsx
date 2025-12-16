"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Building2, User } from "lucide-react"
import { getMyOrganizations } from "../api/organizations"

type OrgWithRole = {
  id: string
  name: string
  role?: string
  [key: string]: any
}

export const Header = () => {
  const [organizations, setOrganizations] = useState<OrgWithRole[]>([])
  const [activeOrg, setActiveOrg] = useState<string>("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    const fetchOrganizations = async () => {
      const orgs = await getMyOrganizations()
      const orgArray: OrgWithRole[] = Array.isArray(orgs) ? orgs : []
      setOrganizations(orgArray)
      if (orgArray.length > 0) {
        const storedOrgId =
          localStorage.getItem("currentOrgId") ||
          localStorage.getItem("orgId") ||
          localStorage.getItem("activeOrganizationId")
        setActiveOrg(storedOrgId || orgArray[0].id)
      }
    }

    fetchOrganizations()
  }, [])

  const handleOrgChange = (org: OrgWithRole) => {
    const orgId = org.id
    const orgRole = org.role || org.memberRole || org.userRole

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

  const activeOrgData = Array.isArray(organizations)
    ? organizations.find((org) => org.id === activeOrg)
    : undefined

  const activeOrgName = activeOrgData?.name || "Select Organization"

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
            {organizations.map((org) => {
              const orgRole = org.role || org.memberRole || org.userRole
              return (
                <button
                  key={org.id}
                  onClick={() => handleOrgChange(org)}
                  className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    org.id === activeOrg ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{org.name}</span>
                    {orgRole && (
                      <span className="ml-2 text-xs rounded-full px-2 py-0.5 bg-muted text-muted-foreground uppercase">
                        {orgRole}
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shadow-xs">
            <User className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-medium text-text-base">User</span>
        </div>
      </div>
    </header>
  )
}
