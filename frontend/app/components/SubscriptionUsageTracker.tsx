"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface UsageData {
  name: string
  usage: number
}

export default function SubscriptionUsageTracker() {
  const [subscriptions, setSubscriptions] = useState<UsageData[]>([
    { name: "Netflix", usage: 20 },
    { name: "Spotify", usage: 15 },
    { name: "Disney+", usage: 8 },
    { name: "Amazon Prime", usage: 5 },
  ])
  const [newSubscription, setNewSubscription] = useState({ name: "", usage: "" })

  const addSubscription = () => {
    if (newSubscription.name && newSubscription.usage) {
      setSubscriptions([
        ...subscriptions,
        { name: newSubscription.name, usage: Number.parseInt(newSubscription.usage) },
      ])
      setNewSubscription({ name: "", usage: "" })
    }
  }

  const updateUsage = (index: number, newUsage: number) => {
    const updatedSubscriptions = [...subscriptions]
    updatedSubscriptions[index].usage = newUsage
    setSubscriptions(updatedSubscriptions)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Usage Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Subscription name"
              value={newSubscription.name}
              onChange={(e) => setNewSubscription({ ...newSubscription, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Usage (hours)"
              value={newSubscription.usage}
              onChange={(e) => setNewSubscription({ ...newSubscription, usage: e.target.value })}
            />
            <Button onClick={addSubscription}>Add</Button>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subscriptions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="usage" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {subscriptions.map((sub, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="w-1/3">{sub.name}</span>
                <Input
                  type="number"
                  value={sub.usage}
                  onChange={(e) => updateUsage(index, Number.parseInt(e.target.value))}
                  className="w-1/3"
                />
                <span>hours</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

