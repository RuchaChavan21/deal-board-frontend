import { ProtectedRoute } from "../../src/components/ProtectedRoute"

export default function SettingsPage() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <div className="bg-white border border-gray-200 rounded p-6">
          <p className="text-gray-600">Settings page content will be implemented here.</p>
        </div>
      </div>
    </ProtectedRoute>
  )
}
