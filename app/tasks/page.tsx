"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { getTasks, createTask, completeTask } from "../../src/api/tasks"
import type { Task } from "../../src/types"
import { Button } from "../../src/components/Button"
import { Modal } from "../../src/components/Modal"
import { Input } from "../../src/components/Input"
import { Select } from "../../src/components/Select"
import { Table } from "../../src/components/Table"
import { canCreateTasks } from "../../src/utils/roles"

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [role, setRole] = useState<string>("")
  const [currentUserId, setCurrentUserId] = useState<string>("")

  // Form data for creating a task
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dealId: "",
    customerId: "",
    assignedToUserId: "",
    status: "TODO",
    dueDate: "",
  })

  const fetchTasks = async () => {
    setIsLoading(true)
    try {
      const data = await getTasks()
      const list = Array.isArray(data) ? data : []
      setTasks(list)
    } catch (error) {
      console.error("Failed to fetch tasks:", error)
      setTasks([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const storedRole = typeof window !== "undefined" ? localStorage.getItem("currentOrgRole") || "" : ""
    const storedUserId =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("auth_user") || "{}")?.id?.toString() ||
          localStorage.getItem("userId") ||
          ""
        : ""
    setRole(storedRole)
    setCurrentUserId(storedUserId)
    fetchTasks()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createTask({
        title: formData.title,
        description: formData.description || undefined,
        dealId: formData.dealId ? Number(formData.dealId) : undefined,
        customerId: formData.customerId ? Number(formData.customerId) : undefined,
        assignedToUserId: Number(formData.assignedToUserId),
        dueDate: formData.dueDate,
        status: formData.status as Task["status"],
      })
      setIsModalOpen(false)
      // Reset form
      setFormData({
        title: "",
        description: "",
        dealId: "",
        customerId: "",
        assignedToUserId: "",
        status: "TODO",
        dueDate: "",
      })
      fetchTasks()
    } catch (error) {
      console.error("Failed to create task:", error)
    }
  }

  const handleMarkCompleted = async (taskId: number | string) => {
    try {
      await completeTask(taskId)
      await fetchTasks()
    } catch (error) {
      console.error("Failed to complete task:", error)
    }
  }

  // --- UPDATED COLUMNS DEFINITION ---
  const columns = [
    {
      key: "title",
      header: "Title",
      render: (_: any, row: any) => (
        <div className="flex flex-col">
           <span className={(row.status === "completed" || row.status === "COMPLETED") ? "line-through text-gray-500 font-medium" : "font-medium text-gray-900"}>
             {row.title}
           </span>
        </div>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (value: string) => <span className="text-sm text-gray-600 truncate max-w-[200px] block" title={value}>{value || "-"}</span>,
    },
    {
      key: "dealId",
      header: "Deal ID",
      render: (value: any) => (value ? <span className="font-mono text-xs">{value}</span> : "-"),
    },
    {
      key: "assignedToUserId",
      header: "Assigned To",
      render: (value: any) => (value ? <span className="font-mono text-xs">User {value}</span> : "-"),
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => {
        // Handle variations like "TODO", "todo", "pending"
        const normalized = value ? value.toUpperCase() : "UNKNOWN"
        let colorClass = "bg-gray-100 text-gray-800"
        
        if (normalized === "COMPLETED") colorClass = "bg-green-100 text-green-800"
        if (normalized === "TODO") colorClass = "bg-blue-100 text-blue-800"
        if (normalized === "IN_PROGRESS") colorClass = "bg-yellow-100 text-yellow-800"

        return (
          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${colorClass}`}>
            {value}
          </span>
        )
      },
    },
    {
      key: "dueDate",
      header: "Due Date",
      render: (value: string) => value ? new Date(value).toLocaleDateString() : "-",
    },
    {
      key: "actions",
      header: "Actions",
      render: (_: any, row: any) => {
        const isOwnTask = String(row.assignedToUserId) === String(currentUserId)
        const isPending = row.status !== "COMPLETED"
        
        if (!isPending) return null
        if (role === "USER" && !isOwnTask) return null
        
        return (
          <Button variant="secondary" onClick={() => handleMarkCompleted(row.id)} className="text-xs py-1 px-2">
            Done
          </Button>
        )
      },
    },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-600">Loading tasks...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
        {canCreateTasks(role) && <Button onClick={() => setIsModalOpen(true)}>Create Task</Button>}
      </div>

      <div className="bg-white rounded border border-gray-200 overflow-hidden">
        {/* Pass columns to Table */}
        <Table columns={columns} data={tasks} />
      </div>

      {canCreateTasks(role) && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Task">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <Input
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Deal ID"
                value={formData.dealId}
                onChange={(e) => setFormData({ ...formData, dealId: e.target.value })}
              />
              <Input
                label="Customer ID"
                value={formData.customerId}
                onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
              />
            </div>
            <Input
              label="Assigned User ID"
              value={formData.assignedToUserId}
              onChange={(e) => setFormData({ ...formData, assignedToUserId: e.target.value })}
              required
            />
            <Input
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              required
            />
            <Select
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={[
                { value: "TODO", label: "To Do" },
                { value: "IN_PROGRESS", label: "In Progress" },
                { value: "COMPLETED", label: "Completed" },
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
      )}
    </div>
  )
}