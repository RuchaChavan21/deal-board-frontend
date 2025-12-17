"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getDeals, createDeal } from "../../src/api/deals"
import type { Deal, DealStage } from "../../src/types"
import { DEAL_STAGES } from "../../src/utils/constants"
import { Button } from "../../src/components/Button"
import { Modal } from "../../src/components/Modal"
import { Input } from "../../src/components/Input"
import { Select } from "../../src/components/Select"
import { useToast } from "../../hooks/use-toast"
import { canManageDeals } from "../../src/utils/roles"
import { Eye } from "lucide-react"

export default function DealsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [deals, setDeals] = useState<Deal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentOrgRole, setCurrentOrgRole] = useState<string>("")
  const [formData, setFormData] = useState({
    title: "",
    value: "",
    customerId: "",
    expectedCloseDate: "",
    stage: "Lead" as DealStage,
  })

  const fetchDeals = async () => {
    setIsLoading(true)
    try {
      const data = await getDeals()
      setDeals(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Failed to fetch deals:", error)
      setDeals([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDeals()
    const role = typeof window !== "undefined" ? localStorage.getItem("currentOrgRole") || "" : ""
    setCurrentOrgRole(role)
  }, [])

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createDeal({
        title: formData.title,
        value: Number(formData.value),
        customerId: Number(formData.customerId),
        expectedCloseDate: formData.expectedCloseDate,
        stage: formData.stage,
      })
      setIsModalOpen(false)
      setFormData({
        title: "",
        value: "",
        customerId: "",
        expectedCloseDate: "",
        stage: "Lead",
      })
      await fetchDeals()
      toast({
        title: "Deal created",
        description: "The deal has been added to your pipeline.",
      })
    } catch (error) {
      console.error("Failed to create deal:", error)
      toast({
        title: "Unable to create deal",
        description: "Please check the fields and try again.",
      })
    }
  }

  const getStageBadgeColor = (stage: DealStage) => {
    switch (stage) {
      case "Lead":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "Contacted":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "Proposal":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "Negotiation":
        return "bg-orange-100 text-orange-800 border-orange-300"
      case "Won":
        return "bg-green-100 text-green-800 border-green-300"
      case "Lost":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-600">Loading deals...</div>
      </div>
    )
  }

  const canCreate = canManageDeals(currentOrgRole)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Deals</h1>
        {canCreate && <Button onClick={() => setIsModalOpen(true)}>Create Deal</Button>}
      </div>

      {deals.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <p className="text-gray-500 text-lg">No deals found</p>
          <p className="text-gray-400 text-sm mt-2">Create your first deal to get started</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Stage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Customer ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Expected Close Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {deals.map((deal) => (
                  <tr
                    key={deal.id}
                    onClick={() => router.push(`/deals/${deal.id}`)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{deal.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        ${deal.value.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStageBadgeColor(deal.stage)}`}
                      >
                        {deal.stage}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{deal.customerId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(deal.expectedCloseDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/deals/${deal.id}`)
                        }}
                        className="inline-flex items-center gap-1 text-primary hover:text-primary-hover transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {canCreate && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Deal">
          <form onSubmit={handleCreateSubmit} className="space-y-5">
            <Input
              label="Deal Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter deal title"
              required
            />
            <Input
              label="Deal Value"
              type="number"
              min="0"
              step="0.01"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              placeholder="Enter deal value"
              required
            />
            <Input
              label="Customer ID"
              type="number"
              value={formData.customerId}
              onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
              placeholder="Enter customer ID"
              required
            />
            <Input
              label="Expected Close Date"
              type="date"
              value={formData.expectedCloseDate}
              onChange={(e) => setFormData({ ...formData, expectedCloseDate: e.target.value })}
              required
            />
            <Select
              label="Stage"
              value={formData.stage}
              onChange={(e) => setFormData({ ...formData, stage: e.target.value as DealStage })}
              options={DEAL_STAGES.map((stage) => ({ value: stage, label: stage }))}
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
                Create Deal
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
