"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", totalSpend: 50 },
  { month: "Feb", totalSpend: 55 },
  { month: "Mar", totalSpend: 60 },
  { month: "Apr", totalSpend: 58 },
  { month: "May", totalSpend: 65 },
  { month: "Jun", totalSpend: 70 },
]

export default function AnalyticsDashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Spending Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalSpend" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

