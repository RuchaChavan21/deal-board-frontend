"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import axiosInstance from "../../src/api/axios"
import { Button } from "../../src/components/Button"
import { Input } from "../../src/components/Input"
import { Select } from "../../src/components/Select"

const roleOptions = [
  { value: "USER", label: "User" },
  { value: "ADMIN", label: "Admin" },
]

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("USER")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)
    try {
      await axiosInstance.post("/auth/register", { email, password, role })
      router.push("/login")
    } catch {
      setError("Registration failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center p-8 bg-white order-2 lg:order-1">
        <div className="w-full max-w-md space-y-6 shadow-lg border border-gray-100 rounded-xl p-8">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold text-gray-900">Create your account</h1>
            <p className="text-sm text-gray-500">Join DealBoard to manage your pipeline</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Select
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              options={roleOptions}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <button className="text-blue-600 font-medium" onClick={() => router.push("/login")}>
              Login
            </button>
          </p>
        </div>
      </div>
      <div className="hidden lg:block relative order-1 lg:order-2">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-90" />
        <Image src="/placeholder.jpg" alt="Register" fill className="object-cover mix-blend-overlay" priority />
      </div>
    </div>
  )
}

