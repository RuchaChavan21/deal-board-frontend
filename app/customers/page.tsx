"use client"

import type React from "react"
import { useState, useEffect } from "react"
// CHANGED: Imported createCustomer
import { getCustomers, createCustomer } from "../../src/api/customers"
import type { Customer } from "../../src/types"
import { Button } from "../../src/components/Button"
import { Modal } from "../../src/components/Modal"
import { Input } from "../../src/components/Input"
import { Select } from "../../src/components/Select"
import { Table } from "../../src/components/Table"

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    owner: "",
    status: "active",
  })

  const fetchCustomers = async (page = 1) => {
    setIsLoading(true)
    try {
      const response = await getCustomers()
      const list = Array.isArray(response) ? response : []
      setCustomers(list)
      setTotalPages(1) 
    } catch (error) {
      console.error("Failed to fetch customers:", error)
      setCustomers([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomers(currentPage)
  }, [currentPage])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // FIX: Use createCustomer API call
      await createCustomer({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        // Note: Backend currently hardcodes 'LEAD', but we send these just in case
        status: formData.status, 
        owner: formData.owner 
      })

      setIsModalOpen(false)
      // Reset form
      setFormData({ name: "", email: "", phone: "", owner: "", status: "active" })
      // Refresh list
      fetchCustomers(currentPage)
    } catch (error) {
      console.error("Failed to create customer:", error)
    }
  }

  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone" },
    { 
      key: "owner", 
      header: "Owner",
      // Backend returns userId, fallback to text if missing
      render: (value: any, row: any) => value || `User ${row.userId}` || "-" 
    },
    {
      key: "status", // Or "type" depending on your Entity JSON response
      header: "Status",
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
            (value || "").toLowerCase() === "active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
          }`}
        >
          {value || "LEAD"}
        </span>
      ),
    },
  ]

  if (isLoading && customers.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-600">Loading customers...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
        <Button onClick={() => setIsModalOpen(true)}>Create Customer</Button>
      </div>

      <div className="bg-white rounded border border-gray-200">
        <Table columns={columns} data={customers} />
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="secondary"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="secondary"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Customer">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Customer Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter customer name"
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter email address"
            required
          />
          <Input
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Enter phone number"
            required
          />
          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            options={[
              { value: "active", label: "Active" },
              { value: "lead", label: "Lead" },
              { value: "inactive", label: "Inactive" },
            ]}
          />
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-md shadow-primary/20"
            >
              Create Customer
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}