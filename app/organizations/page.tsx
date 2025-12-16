"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { getOrganizations, createOrganization } from "../../src/api/organizations"
import { Button } from "../../src/components/Button"
import { Modal } from "../../src/components/Modal"
import { Input } from "../../src/components/Input"
import { useToast } from "../../hooks/use-toast"

// Universal type that matches whatever comes back
type UniversalOrg = {
  id: string
  name: string
  description?: string
  role?: string
  // Allow for nested structures
  organization?: any
  org?: any
  [key: string]: any
}

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<UniversalOrg[]>([])
  const [rawDebugData, setRawDebugData] = useState<any>(null) // To see raw JSON
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
      const data = await getOrganizations()
      console.log("Backend Response:", data) 

      const list = Array.isArray(data) ? data.map((item: any) => {
        // STRATEGY: Try to find the info wherever it is hiding
        const orgObj = item.organization || item.org || item;

        return {
          // Use the nested ID if available, otherwise top-level ID
          id: orgObj.id || item.id,
          // Use nested Name, otherwise top-level Name
          name: orgObj.name || item.name || "Unknown Name",
          description: orgObj.description || item.description,
          // Role usually stays on the top member object
          role: item.role || item.memberRole || orgObj.role, 
        }
      }) : []

      setOrganizations(list)

      const storedOrgId = localStorage.getItem("currentOrgId")
      if (storedOrgId) setActiveOrgId(storedOrgId)

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
      toast({ title: "Organization created" })
    } catch (error) {
      console.error("Failed to create organization:", error)
      toast({ title: "Error creating organization" })
    }
  }

  const handleSetActive = async (orgId: string) => {
    setActiveOrgId(orgId)
    localStorage.setItem("currentOrgId", orgId)
    document.cookie = `currentOrgId=${orgId}; path=/; SameSite=Lax`
    window.location.reload()
  }

  if (isLoading) return <div className="p-10">Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Organizations</h1>
          <p className="text-sm text-gray-500 mt-1">
            Switch between organizations you belong to.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Create Organization</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {organizations.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12">No organizations found</div>
        ) : (
          organizations.map((org, index) => (
            <div key={`${org.id}-${index}`} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
              <div className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-gray-900">{org.name}</h3>
                  {activeOrgId === String(org.id) && (
                    <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Active</span>
                  )}
                </div>
                
                <div className="mt-2 text-xs text-gray-500">
                    ID: <span className="font-mono bg-gray-100 p-1">{org.id}</span>
                </div>
                
                <p className="text-sm text-gray-600 mt-2">
                  {org.description || "No description"}
                </p>
                
                {org.role && (
                  <p className="text-xs text-gray-500 mt-2 border-t pt-2 uppercase font-semibold">
                    Role: {org.role}
                  </p>
                )}
              </div>

              {activeOrgId !== String(org.id) && (
                <Button variant="secondary" onClick={() => handleSetActive(String(org.id))} className="w-full">
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
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border p-2 rounded"
            placeholder="Description"
          />
          <div className="flex gap-3 pt-4">
             <Button type="submit" className="w-full">Create</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}