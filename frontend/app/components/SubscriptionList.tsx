"use client"

import { useState } from "react"
import SubscriptionItem from "./SubscriptionItem"

interface Subscription {
  id: number
  name: string
  price: number
  renewalDate: string
  savingsPerYear: number
}

const initialSubscriptions: Subscription[] = [
  { id: 1, name: "Netflix", price: 12.99, renewalDate: "2023-06-15", savingsPerYear: 0 },
  { id: 2, name: "Spotify", price: 9.99, renewalDate: "2023-06-22", savingsPerYear: 119.88 },
  { id: 3, name: "Amazon Prime", price: 14.99, renewalDate: "2023-07-01", savingsPerYear: 0 },
  { id: 4, name: "Disney+", price: 7.99, renewalDate: "2023-06-30", savingsPerYear: 95.88 },
]

export default function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions)

  const handleCancelSubscription = (id: number) => {
    setSubscriptions(subscriptions.filter((sub) => sub.id !== id))
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Active Subscriptions</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {subscriptions.map((subscription) => (
          <SubscriptionItem
            key={subscription.id}
            subscription={subscription}
            onCancel={() => handleCancelSubscription(subscription.id)}
          />
        ))}
      </div>
    </div>
  )
}

