"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell } from "lucide-react"

interface Reminder {
  id: string
  subscriptionName: string
  renewalDate: string
  price: number
}

const reminders: Reminder[] = [
  { id: "1", subscriptionName: "Netflix", renewalDate: "2023-07-15", price: 12.99 },
  { id: "2", subscriptionName: "Spotify", renewalDate: "2023-07-22", price: 9.99 },
  { id: "3", subscriptionName: "Adobe Creative Cloud", renewalDate: "2023-08-01", price: 52.99 },
]

export default function RenewalReminders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2" />
          Upcoming Renewals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {reminders.map((reminder) => (
            <li key={reminder.id} className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{reminder.subscriptionName}</p>
                <p className="text-sm text-muted-foreground">Renews on {reminder.renewalDate}</p>
              </div>
              <p className="font-bold">${reminder.price.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

