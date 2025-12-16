"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import axiosInstance from "../../src/api/axios"
import { Button } from "../../src/components/Button"
import { Input } from "../../src/components/Input"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)
    try {
      const response = await axiosInstance.post("/auth/login", { email, password })
      const token = response?.data?.token
      if (token) {
        localStorage.setItem("token", token)
        document.cookie = `token=${token}; path=/; SameSite=Lax`
        router.push("/app/dashboard")
      } else {
        setError("Login failed")
      }
    } catch {
      setError("Invalid credentials")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6 shadow-lg border border-gray-100 rounded-xl p-8">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
            <p className="text-sm text-gray-500">Login to continue to DealBoard</p>
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
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
          <p className="text-sm text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <button className="text-blue-600 font-medium" onClick={() => router.push("/register")}>
              Sign up
            </button>
          </p>
        </div>
      </div>
      <div className="hidden lg:block relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 opacity-90" />
        <Image src="/placeholder.jpg" alt="Auth" fill className="object-cover mix-blend-overlay" priority />
      </div>
    </div>
  )
}

