"use client"

import { useRouter } from "next/navigation"
import { Button } from "../../src/components/Button"

export default function UnauthorizedPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-xl p-8 text-center space-y-4 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Access denied</h1>
        <p className="text-sm text-gray-600">You don&apos;t have permission to view this page.</p>
        <div className="flex justify-center gap-3 pt-2">
          <Button variant="secondary" onClick={() => router.back()}>
            Go Back
          </Button>
          <Button onClick={() => router.push("/")}>Go to Home</Button>
        </div>
      </div>
    </div>
  )
}


