"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Check, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface PasswordRequirement {
  text: string
  satisfied: boolean
}

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const passwordRequirements: PasswordRequirement[] = [
    {
      text: "At least 8 characters long",
      satisfied: formData.password.length >= 8,
    },
    {
      text: "Contains at least one uppercase letter",
      satisfied: /[A-Z]/.test(formData.password),
    },
    {
      text: "Contains at least one lowercase letter",
      satisfied: /[a-z]/.test(formData.password),
    },
    {
      text: "Contains at least one number",
      satisfied: /\d/.test(formData.password),
    },
    {
      text: "Passwords match",
      satisfied: formData.password === formData.confirmPassword && formData.password !== "",
    },
  ]

  const isPasswordValid = passwordRequirements.every((req) => req.satisfied)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!isPasswordValid) {
      setError("Please meet all password requirements")
      return
    }

    setIsLoading(true)

    try {
      // In a real app, you would make an API call here
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (formData.email && formData.password && formData.name) {
        router.push("/login")
      } else {
        setError("Please fill in all fields")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account to get started.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Password Requirements</Label>
              <ul className="space-y-2 text-sm">
                {passwordRequirements.map((requirement, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    {requirement.satisfied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                    <span className={requirement.satisfied ? "text-green-500" : "text-red-500"}>
                      {requirement.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading || !isPasswordValid}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
