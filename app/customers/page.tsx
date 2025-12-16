"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { customersApi } from "../../src/api/customers"
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
      const response = await customersApi.getAll(page, 20)
      setCustomers(response.customers)
      setTotalPages(Math.ceil(response.total / 20) || 1)
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
      const result = await customersApi.create(formData)
      if (result) {
        setIsModalOpen(false)
        setFormData({ name: "", email: "", phone: "", owner: "", status: "active" })
        fetchCustomers(currentPage)
      }
    } catch (error) {
      console.error("Failed to create customer:", error)
    }
  }

  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone" },
    { key: "owner", header: "Owner" },
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
            value === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
          }`}
        >
          {value}
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
          <Input
            label="Owner"
            value={formData.owner}
            onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
            required
          />
          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
          />
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
