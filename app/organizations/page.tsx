"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { getMyOrganizations, createOrganization } from "../../src/api/organizations"
import { Button } from "../../src/components/Button"
import { Modal } from "../../src/components/Modal"
import { Input } from "../../src/components/Input"
import { useToast } from "../../hooks/use-toast"

type OrgWithRole = {
  id: string
  name: string
  description?: string
  role?: string
  [key: string]: any
}

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<OrgWithRole[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeOrgId, setActiveOrgId] = useState("")
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })

  const fetchOrganizations = async () => {
    setIsLoading(true)
    try {
      const data = await getMyOrganizations()
      const list: OrgWithRole[] = Array.isArray(data) ? data : []
      setOrganizations(list)
      const storedOrgId =
        localStorage.getItem("currentOrgId") ||
        localStorage.getItem("orgId") ||
        localStorage.getItem("activeOrganizationId")
      if (storedOrgId) {
        setActiveOrgId(storedOrgId)
      }
    } catch (error) {
      console.error("Failed to fetch organizations:", error)
      setOrganizations([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOrganizations()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createOrganization({
        name: formData.name,
        description: formData.description || undefined,
      })
      await fetchOrganizations()
      setIsModalOpen(false)
      setFormData({ name: "", description: "" })
      toast({
        title: "Organization created",
        description: "You can now switch to it from the list.",
      })
    } catch (error) {
      console.error("Failed to create organization:", error)
      toast({
        title: "Unable to create organization",
        description: "Please try again or check your connection.",
      })
    }
  }

  const handleSetActive = async (orgId: string) => {
    const org = organizations.find((o) => o.id === orgId)
    const orgRole = org?.role || org?.memberRole || org?.userRole

    setActiveOrgId(orgId)
    localStorage.setItem("currentOrgId", orgId)
    localStorage.setItem("orgId", orgId)
    if (orgRole) {
      localStorage.setItem("currentOrgRole", orgRole)
    }
    document.cookie = `currentOrgId=${orgId}; path=/; SameSite=Lax`
    window.location.reload()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-600">Loading organizations...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Organizations</h1>
          <p className="text-sm text-gray-500 mt-1">
            Switch between organizations you belong to or create a new one.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Create Organization</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {organizations.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12">No organizations found</div>
        ) : (
          organizations.map((org) => (
          <div key={org.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{org.name}</h3>
                  {org.description && <p className="text-sm text-gray-600 mt-2">{org.description}</p>}
                  {(org.role || org.memberRole || org.userRole) && (
                    <p className="text-xs text-gray-500 mt-1 uppercase">
                      Role: {org.role || org.memberRole || org.userRole}
                    </p>
                  )}
                </div>
                {activeOrgId === org.id && (
                  <span className="ml-2 inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                    Active
                  </span>
                )}
              </div>
              {activeOrgId !== org.id && (
                <Button variant="secondary" onClick={() => handleSetActive(org.id)} className="w-full">
                  Switch to This Organization
                </Button>
              )}
            </div>
          ))
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Organization">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Organization Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Enter organization description"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
