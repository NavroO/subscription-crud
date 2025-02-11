"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

interface SubscriptionToCancel {
  id: number
  name: string
  price: number
  savingsPerYear: number
}

// Mock API function
const fetchSubscriptionsToCancel = async (): Promise<SubscriptionToCancel[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return [
    { id: 2, name: "Spotify", price: 9.99, savingsPerYear: 119.88 },
    { id: 4, name: "Disney+", price: 7.99, savingsPerYear: 95.88 },
  ]
}

export default function SubscriptionsToCancel() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionToCancel[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchSubscriptionsToCancel()
      .then((data) => {
        setSubscriptions(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching subscriptions to cancel:", error)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <div>Loading recommendations...</div>
  }

  if (subscriptions.length === 0) {
    return null
  }

  const totalSavings = subscriptions.reduce((sum, sub) => sum + sub.savingsPerYear, 0)

  return (
    <Card className="bg-yellow-50 border-yellow-200">
      <CardHeader>
        <CardTitle className="flex items-center text-yellow-800">
          <AlertCircle className="mr-2" />
          Recommended Cancellations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">You could save ${totalSavings.toFixed(2)} per year by canceling these subscriptions:</p>
        <ul className="space-y-2">
          {subscriptions.map((sub) => (
            <li key={sub.id} className="flex justify-between items-center">
              <span>
                {sub.name} (${sub.price.toFixed(2)}/month)
              </span>
              <Link href={`/subscriptions/${sub.id}`}>
                <Button variant="default" size="sm">
                  View Details
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

