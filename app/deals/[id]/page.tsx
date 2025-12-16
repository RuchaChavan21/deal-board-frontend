"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { dealsApi } from "../../../src/api/deals"
import { tasksApi } from "../../../src/api/tasks"
import type { Deal, Task, DealStage } from "../../../src/types"
import { Button } from "../../../src/components/Button"
import { Select } from "../../../src/components/Select"
import { DEAL_STAGES } from "../../../src/utils/constants"

export default function DealDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [deal, setDeal] = useState<Deal | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDealDetails = async () => {
      if (!id) return

      try {
        const dealData = await dealsApi.getById(id)
        setDeal(dealData)

        const allTasks = await tasksApi.getAll()
        const dealTasks = allTasks.filter((task) => task.dealId === id)
        setTasks(dealTasks)
      } catch (error) {
        console.error("Failed to fetch deal details:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDealDetails()
  }, [id])

  const handleStageChange = async (newStage: string) => {
    if (!deal || !id) return

    try {
      const updatedDeal = await dealsApi.updateStage(id, newStage as DealStage)
      if (updatedDeal) {
        setDeal(updatedDeal)
      }
    } catch (error) {
      console.error("Failed to update deal stage:", error)
    }
  }

  const handleMarkTaskCompleted = async (taskId: string) => {
    try {
      const result = await tasksApi.markCompleted(taskId)
      if (result) {
        setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: "completed" as const } : task)))
      }
    } catch (error) {
      console.error("Failed to mark task as completed:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-600">Loading deal details...</div>
      </div>
    )
  }

  if (!deal) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-600">Deal not found</div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Button variant="secondary" onClick={() => router.push("/deals")}>
          Back to Deals
        </Button>
        <h1 className="text-2xl font-semibold text-gray-900">{deal.title}</h1>
      </div>

      <div className="bg-white border border-gray-200 rounded p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Deal Information</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deal Value</label>
            <div className="text-lg font-semibold text-gray-900">${deal.value.toLocaleString()}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Close Date</label>
            <div className="text-lg text-gray-900">{new Date(deal.expectedCloseDate).toLocaleDateString()}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
            <div className="text-lg text-gray-900">{deal.customerName}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
            <div className="text-lg text-gray-900">{deal.ownerName}</div>
          </div>
          <div className="col-span-2">
            <Select
              label="Deal Stage"
              value={deal.stage}
              onChange={(e) => handleStageChange(e.target.value)}
              options={DEAL_STAGES.map((stage) => ({ value: stage, label: stage }))}
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Tasks</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No tasks for this deal</p>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-4 border border-gray-200 rounded">
                <input
                  type="checkbox"
                  checked={task.status === "completed"}
                  onChange={() => handleMarkTaskCompleted(task.id)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div
                    className={`text-sm font-medium ${task.status === "completed" ? "line-through text-gray-500" : "text-gray-900"}`}
                  >
                    {task.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Due: {new Date(task.dueDate).toLocaleDateString()} • {task.assignedUserName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
