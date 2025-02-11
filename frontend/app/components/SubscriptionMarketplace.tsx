"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2 } from "lucide-react"

interface SharedSubscription {
  id: string
  name: string
  owner: string
  totalCost: number
  availableSlots: number
  costPerSlot: number
}

export default function SubscriptionMarketplace() {
  const [subscriptions, setSubscriptions] = useState<SharedSubscription[]>([
    { id: "1", name: "Netflix Family", owner: "Alice", totalCost: 17.99, availableSlots: 2, costPerSlot: 4.5 },
    { id: "2", name: "Spotify Family", owner: "Bob", totalCost: 14.99, availableSlots: 3, costPerSlot: 3.0 },
  ])
  const [newSubscription, setNewSubscription] = useState({ name: "", totalCost: "", availableSlots: "" })

  const addSubscription = () => {
    if (newSubscription.name && newSubscription.totalCost && newSubscription.availableSlots) {
      const totalCost = Number.parseFloat(newSubscription.totalCost)
      const availableSlots = Number.parseInt(newSubscription.availableSlots)
      setSubscriptions([
        ...subscriptions,
        {
          id: Date.now().toString(),
          name: newSubscription.name,
          owner: "You",
          totalCost,
          availableSlots,
          costPerSlot: totalCost / availableSlots,
        },
      ])
      setNewSubscription({ name: "", totalCost: "", availableSlots: "" })
    }
  }

  const removeSubscription = (id: string) => {
    setSubscriptions(subscriptions.filter((sub) => sub.id !== id))
  }

  const joinSubscription = (id: string) => {
    setSubscriptions(
      subscriptions.map((sub) => (sub.id === id ? { ...sub, availableSlots: sub.availableSlots - 1 } : sub)),
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Sharing Marketplace</CardTitle>
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
              placeholder="Total cost"
              value={newSubscription.totalCost}
              onChange={(e) => setNewSubscription({ ...newSubscription, totalCost: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Available slots"
              value={newSubscription.availableSlots}
              onChange={(e) => setNewSubscription({ ...newSubscription, availableSlots: e.target.value })}
            />
            <Button onClick={addSubscription}>
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead>Available Slots</TableHead>
                <TableHead>Cost Per Slot</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell>{sub.name}</TableCell>
                  <TableCell>{sub.owner}</TableCell>
                  <TableCell>${sub.totalCost.toFixed(2)}</TableCell>
                  <TableCell>{sub.availableSlots}</TableCell>
                  <TableCell>${sub.costPerSlot.toFixed(2)}</TableCell>
                  <TableCell>
                    {sub.owner === "You" ? (
                      <Button variant="destructive" size="sm" onClick={() => removeSubscription(sub.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => joinSubscription(sub.id)} disabled={sub.availableSlots === 0}>
                        Join
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

