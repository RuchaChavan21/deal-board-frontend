"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { getTasks, createTask } from "../../src/api/tasks"
import type { Task } from "../../src/types"
import { Button } from "../../src/components/Button"
import { Modal } from "../../src/components/Modal"
import { Input } from "../../src/components/Input"
import { Select } from "../../src/components/Select"
import { Table } from "../../src/components/Table"

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    dealId: "",
    assignedUserId: "",
    assignedUserName: "",
    status: "pending" as const,
    dueDate: "",
  })

  const fetchTasks = async () => {
    setIsLoading(true)
    try {
      const data = await getTasks()
      setTasks(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Failed to fetch tasks:", error)
      setTasks([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createTask(formData)
      setIsModalOpen(false)
      setFormData({
        title: "",
        dealId: "",
        assignedUserId: "",
        assignedUserName: "",
        status: "pending",
        dueDate: "",
      })
      fetchTasks()
    } catch (error) {
      console.error("Failed to create task:", error)
    }
  }

  const handleMarkCompleted = async (taskId: string) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status: "completed" as const } : task)))
  }

  const columns = [
    {
      key: "title",
      header: "Title",
      render: (_: any, row: Task) => (
        <span className={row.status === "completed" ? "line-through text-gray-500" : ""}>{row.title}</span>
      ),
    },
    {
      key: "dealTitle",
      header: "Related Deal",
      render: (value: string) => value || "-",
    },
    {
      key: "assignedUserName",
      header: "Assigned To",
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
            value === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "dueDate",
      header: "Due Date",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: "actions",
      header: "Actions",
      render: (_: any, row: Task) =>
        row.status === "pending" ? (
          <Button variant="secondary" onClick={() => handleMarkCompleted(row.id)} className="text-xs py-1 px-2">
            Mark Complete
          </Button>
        ) : null,
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
        <Button onClick={() => setIsModalOpen(true)}>Create Task</Button>
      </div>

      <div className="bg-white rounded border border-gray-200">
        <Table columns={columns} data={tasks} />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Task">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <Input
            label="Deal ID (optional)"
            value={formData.dealId}
            onChange={(e) => setFormData({ ...formData, dealId: e.target.value })}
            placeholder="Leave empty if not related to a deal"
          />
          <Input
            label="Assigned User ID"
            value={formData.assignedUserId}
            onChange={(e) => setFormData({ ...formData, assignedUserId: e.target.value })}
            required
          />
          <Input
            label="Assigned User Name"
            value={formData.assignedUserName}
            onChange={(e) => setFormData({ ...formData, assignedUserName: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, status: e.target.value as "pending" | "completed" })}
            options={[
              { value: "pending", label: "Pending" },
              { value: "completed", label: "Completed" },
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
