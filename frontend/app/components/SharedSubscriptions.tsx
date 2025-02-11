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
  totalCost: number
  members: string[]
}

export default function SharedSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<SharedSubscription[]>([
    { id: "1", name: "Netflix Family", totalCost: 17.99, members: ["You", "Partner", "Roommate"] },
    { id: "2", name: "Spotify Family", totalCost: 14.99, members: ["You", "Sibling", "Friend"] },
  ])
  const [newSubscription, setNewSubscription] = useState({ name: "", totalCost: "", member: "" })

  const addSubscription = () => {
    if (newSubscription.name && newSubscription.totalCost && newSubscription.member) {
      setSubscriptions([
        ...subscriptions,
        {
          id: Date.now().toString(),
          name: newSubscription.name,
          totalCost: Number.parseFloat(newSubscription.totalCost),
          members: [newSubscription.member],
        },
      ])
      setNewSubscription({ name: "", totalCost: "", member: "" })
    }
  }

  const addMember = (subscriptionId: string, newMember: string) => {
    setSubscriptions(
      subscriptions.map((sub) => (sub.id === subscriptionId ? { ...sub, members: [...sub.members, newMember] } : sub)),
    )
  }

  const removeMember = (subscriptionId: string, memberToRemove: string) => {
    setSubscriptions(
      subscriptions.map((sub) =>
        sub.id === subscriptionId ? { ...sub, members: sub.members.filter((m) => m !== memberToRemove) } : sub,
      ),
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shared Subscriptions</CardTitle>
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
              placeholder="First member"
              value={newSubscription.member}
              onChange={(e) => setNewSubscription({ ...newSubscription, member: e.target.value })}
            />
            <Button onClick={addSubscription}>
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead>Cost Per Person</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell>{sub.name}</TableCell>
                  <TableCell>${sub.totalCost.toFixed(2)}</TableCell>
                  <TableCell>${(sub.totalCost / sub.members.length).toFixed(2)}</TableCell>
                  <TableCell>
                    {sub.members.map((member, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                      >
                        {member}
                        <button onClick={() => removeMember(sub.id, member)} className="ml-2 text-red-500">
                          ×
                        </button>
                      </span>
                    ))}
                    <Input
                      placeholder="Add member"
                      className="w-32 inline-block"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addMember(sub.id, (e.target as HTMLInputElement).value)
                          ;(e.target as HTMLInputElement).value = ""
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setSubscriptions(subscriptions.filter((s) => s.id !== sub.id))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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

