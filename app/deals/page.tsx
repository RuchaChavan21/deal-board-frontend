"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getDeals } from "../../src/api/deals"
import type { Deal, DealStage } from "../../src/types"
import { DEAL_STAGES } from "../../src/utils/constants"

export default function DealsPage() {
  const router = useRouter()
  const [deals, setDeals] = useState<Deal[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDeals = async () => {
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

    fetchDeals()
  }, [])

  const getDealsByStage = (stage: DealStage) => {
    return deals.filter((deal) => deal.stage === stage)
  }

  const getStageColor = (stage: DealStage) => {
    switch (stage) {
      case "Lead":
        return "bg-gray-50 border-gray-300"
      case "Contacted":
        return "bg-blue-50 border-blue-300"
      case "Proposal":
        return "bg-yellow-50 border-yellow-300"
      case "Negotiation":
        return "bg-orange-50 border-orange-300"
      case "Won":
        return "bg-green-50 border-green-300"
      case "Lost":
        return "bg-red-50 border-red-300"
      default:
        return "bg-gray-50 border-gray-300"
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-600">Loading deals...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Deals Pipeline</h1>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {DEAL_STAGES.map((stage) => {
          const stageDeals = getDealsByStage(stage)
          const totalValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0)

          return (
            <div key={stage} className="flex-shrink-0 w-80">
              <div className="bg-white border border-gray-200 rounded">
                <div className="px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">{stage}</h3>
                    <span className="text-xs font-medium text-gray-500">{stageDeals.length}</span>
                  </div>
                  {totalValue > 0 && <div className="text-xs text-gray-500 mt-1">${totalValue.toLocaleString()}</div>}
                </div>
                <div className="p-3 space-y-3 min-h-[400px] max-h-[600px] overflow-y-auto">
                  {stageDeals.length === 0 ? (
                    <div className="text-center text-gray-400 text-sm py-8">No deals</div>
                  ) : (
                    stageDeals.map((deal) => (
                      <div
                        key={deal.id}
                        onClick={() => router.push(`/deals/${deal.id}`)}
                        className={`p-4 border rounded cursor-pointer hover:shadow-md transition-shadow ${getStageColor(stage)}`}
                      >
                        <div className="text-sm font-medium text-gray-900 mb-2">{deal.title}</div>
                        <div className="text-sm font-semibold text-gray-900 mb-2">${deal.value.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">{deal.customerName}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
