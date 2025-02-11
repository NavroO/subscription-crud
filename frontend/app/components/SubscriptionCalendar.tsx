"use client"

import React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Payment {
  id: string
  date: Date
  amount: number
  subscriptionName: string
}

interface SubscriptionCalendarProps {
  payments: Payment[]
}

export default function SubscriptionCalendar({ payments }: SubscriptionCalendarProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const paymentDates = payments.map((payment) => payment.date)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          components={{
            DayContent: (props) => {
              const paymentForDay = payments.find(
                (payment) => payment.date.toDateString() === props.date.toDateString(),
              )

              return (
                <div className="relative h-full w-full p-2">
                  <div className="absolute top-0 right-0 h-2 w-2">
                    {paymentForDay && <div className="h-full w-full rounded-full bg-red-500" />}
                  </div>
                  <div>{props.date.getDate()}</div>
                </div>
              )
            },
          }}
        />
        {date && (
          <div className="mt-4">
            <h3 className="font-semibold">Payments on {date.toDateString()}:</h3>
            <ul>
              {payments
                .filter((payment) => payment.date.toDateString() === date.toDateString())
                .map((payment) => (
                  <li key={payment.id}>
                    {payment.subscriptionName}: ${payment.amount.toFixed(2)}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

