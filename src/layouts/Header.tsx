"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Building2, User } from "lucide-react"
import { organizationsApi } from "../api/organizations"
import type { Organization } from "../types"

export const Header = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [activeOrg, setActiveOrg] = useState<string>("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const orgs = await organizationsApi.getAll()
        const orgArray = Array.isArray(orgs) ? orgs : []
        setOrganizations(orgArray)
        if (orgArray.length > 0) {
          const storedOrgId = localStorage.getItem("activeOrganizationId")
          setActiveOrg(storedOrgId || orgArray[0].id)
        }
      } catch (error) {
        console.error("Failed to fetch organizations:", error)
        setOrganizations([])
      }
    }

    fetchOrganizations()
  }, [])

  const handleOrgChange = async (orgId: string) => {
    try {
      await organizationsApi.setActive(orgId)
      setActiveOrg(orgId)
      localStorage.setItem("activeOrganizationId", orgId)
      setIsDropdownOpen(false)
    } catch (error) {
      console.error("Failed to set active organization:", error)
    }
  }

  const activeOrgName = Array.isArray(organizations)
    ? organizations.find((org) => org.id === activeOrg)?.name || "Select Organization"
    : "Select Organization"

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-background border border-border rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <Building2 className="w-4 h-4 text-muted-foreground" />
          <span>{activeOrgName}</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
        {isDropdownOpen && organizations.length > 0 && (
          <div className="absolute left-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-10 overflow-hidden">
            {organizations.map((org) => (
              <button
                key={org.id}
                onClick={() => handleOrgChange(org.id)}
                className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  org.id === activeOrg ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-muted"
                }`}
              >
                {org.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-medium">User</span>
        </div>
      </div>
    </header>
  )
}
