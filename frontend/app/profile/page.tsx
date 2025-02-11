"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export default function ProfilePage() {
  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("john@example.com")
  const [monthlyBudget, setMonthlyBudget] = useState("200")
  const [notifyOnRenewal, setNotifyOnRenewal] = useState(true)
  const [notifyOnBudgetExceed, setNotifyOnBudgetExceed] = useState(true)

  const handlePersonalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Personal info updated:", { name, email })
  }

  const handlePreferencesSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Preferences updated:", { monthlyBudget, notifyOnRenewal, notifyOnBudgetExceed })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      <Tabs defaultValue="personal-info">
        <TabsList>
          <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        <TabsContent value="personal-info">
          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePersonalInfoSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <Button type="submit">Update Personal Info</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Your Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePreferencesSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="monthly-budget">Monthly Budget ($)</Label>
                  <Input
                    id="monthly-budget"
                    type="number"
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="notify-renewal" checked={notifyOnRenewal} onCheckedChange={setNotifyOnRenewal} />
                  <Label htmlFor="notify-renewal">Notify me before subscription renewals</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="notify-budget" checked={notifyOnBudgetExceed} onCheckedChange={setNotifyOnBudgetExceed} />
                  <Label htmlFor="notify-budget">Notify me when I exceed my budget</Label>
                </div>
                <Button type="submit">Update Preferences</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

