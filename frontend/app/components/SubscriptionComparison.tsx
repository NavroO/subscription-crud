"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Plan {
  name: string
  price: number
  features: string[]
}

interface SubscriptionOption {
  name: string
  plans: Plan[]
}

const subscriptionOptions: SubscriptionOption[] = [
  {
    name: "Netflix",
    plans: [
      { name: "Basic", price: 8.99, features: ["1 screen", "SD quality"] },
      { name: "Standard", price: 13.99, features: ["2 screens", "HD quality"] },
      { name: "Premium", price: 17.99, features: ["4 screens", "Ultra HD quality"] },
    ],
  },
  {
    name: "Disney+",
    plans: [
      { name: "Monthly", price: 7.99, features: ["All content", "4K UHD", "4 screens"] },
      { name: "Annual", price: 79.99, features: ["All content", "4K UHD", "4 screens", "2 months free"] },
    ],
  },
]

export default function SubscriptionComparison() {
  const [selectedSubscription, setSelectedSubscription] = useState(subscriptionOptions[0].name)

  const currentSubscription = subscriptionOptions.find((sub) => sub.name === selectedSubscription)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compare Subscription Plans</CardTitle>
      </CardHeader>
      <CardContent>
        <Select onValueChange={setSelectedSubscription} defaultValue={selectedSubscription}>
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Select a subscription" />
          </SelectTrigger>
          <SelectContent>
            {subscriptionOptions.map((sub) => (
              <SelectItem key={sub.name} value={sub.name}>
                {sub.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {currentSubscription && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Features</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentSubscription.plans.map((plan) => (
                <TableRow key={plan.name}>
                  <TableCell>{plan.name}</TableCell>
                  <TableCell>${plan.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <ul className="list-disc list-inside">
                      {plan.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

