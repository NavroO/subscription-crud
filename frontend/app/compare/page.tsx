"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const subscriptionPlans = {
  Netflix: [
    { name: "Basic", price: 8.99, quality: "Good", resolution: "480p" },
    { name: "Standard", price: 13.99, quality: "Better", resolution: "1080p" },
    { name: "Premium", price: 17.99, quality: "Best", resolution: "4K+HDR" },
  ],
  Spotify: [
    { name: "Free", price: 0, features: "Ad-supported" },
    { name: "Individual", price: 9.99, features: "Ad-free, offline mode" },
    { name: "Duo", price: 12.99, features: "2 accounts" },
    { name: "Family", price: 15.99, features: "Up to 6 accounts" },
  ],
}

export default function ComparePage() {
  const [selectedService, setSelectedService] = useState("Netflix")

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Compare Subscription Plans</h1>
      <Card>
        <CardHeader>
          <CardTitle>Select a Service</CardTitle>
        </CardHeader>
        <CardContent>
          <Select onValueChange={setSelectedService} defaultValue={selectedService}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(subscriptionPlans).map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{selectedService} Plans Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan</TableHead>
                <TableHead>Price</TableHead>
                {selectedService === "Netflix" && (
                  <>
                    <TableHead>Quality</TableHead>
                    <TableHead>Resolution</TableHead>
                  </>
                )}
                {selectedService === "Spotify" && <TableHead>Features</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptionPlans[selectedService as keyof typeof subscriptionPlans].map((plan) => (
                <TableRow key={plan.name}>
                  <TableCell>{plan.name}</TableCell>
                  <TableCell>${plan.price.toFixed(2)}</TableCell>
                  {selectedService === "Netflix" && (
                    <>
                      <TableCell>{plan.quality}</TableCell>
                      <TableCell>{plan.resolution}</TableCell>
                    </>
                  )}
                  {selectedService === "Spotify" && <TableCell>{plan.features}</TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

