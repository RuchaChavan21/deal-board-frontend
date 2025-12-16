"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getDashboardSummary } from "../../src/api/dashboard"
import type { DashboardStats, Deal, Task } from "../../src/types"

export default function DashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentDeals, setRecentDeals] = useState<Deal[]>([])
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      const summary = await getDashboardSummary().catch(() => null)

      const summaryStats =
        summary?.stats ??
        ({
          totalCustomers: summary?.totalCustomers ?? 0,
          activeDeals: summary?.activeDeals ?? summary?.totalDeals ?? 0,
          dealsWon: summary?.dealsWon ?? 0,
          pendingTasks: summary?.pendingTasks ?? summary?.activeTasks ?? 0,
        } satisfies DashboardStats)

      setStats(summaryStats)
      setRecentDeals(Array.isArray(summary?.recentDeals) ? summary.recentDeals : [])
      setUpcomingTasks(Array.isArray(summary?.upcomingTasks) ? summary.upcomingTasks : [])
      setIsLoading(false)
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded p-6">
          <div className="text-sm font-medium text-gray-500 mb-2">Total Customers</div>
          <div className="text-3xl font-semibold text-gray-900">{stats?.totalCustomers || 0}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded p-6">
          <div className="text-sm font-medium text-gray-500 mb-2">Active Deals</div>
          <div className="text-3xl font-semibold text-gray-900">{stats?.activeDeals || 0}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded p-6">
          <div className="text-sm font-medium text-gray-500 mb-2">Deals Won</div>
          <div className="text-3xl font-semibold text-gray-900">{stats?.dealsWon || 0}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded p-6">
          <div className="text-sm font-medium text-gray-500 mb-2">Pending Tasks</div>
          <div className="text-3xl font-semibold text-gray-900">{stats?.pendingTasks || 0}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Deals</h2>
          </div>
          <div className="p-6">
            {recentDeals.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No recent deals</p>
            ) : (
              <div className="space-y-4">
                {recentDeals.map((deal) => (
                  <div
                    key={deal.id}
                    onClick={() => router.push(`/deals/${deal.id}`)}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{deal.title}</div>
                      <div className="text-xs text-gray-500 mt-1">{deal.customerName}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">${deal.value.toLocaleString()}</div>
                      <div className="text-xs text-gray-500 mt-1">{deal.stage}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h2>
          </div>
          <div className="p-6">
            {upcomingTasks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No upcoming tasks</p>
            ) : (
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{task.title}</div>
                      {task.dealTitle && <div className="text-xs text-gray-500 mt-1">{task.dealTitle}</div>}
                      <div className="text-xs text-gray-500 mt-1">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">{task.assignedUserName}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
