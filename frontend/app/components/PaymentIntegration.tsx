"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2 } from "lucide-react"

interface Payment {
  id: string
  subscriptionName: string
  amount: number
  date: string
  status: "pending" | "completed" | "failed"
}

const mockProcessPayment = async (amount: number): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API delay
  return Math.random() > 0.2
    ? { success: true, message: "Payment processed successfully" }
    : { success: false, message: "Payment failed. Please try again." }
}

export default function PaymentIntegration() {
  const [payments, setPayments] = useState<Payment[]>([
    { id: "1", subscriptionName: "Netflix", amount: 12.99, date: "2023-07-01", status: "completed" },
    { id: "2", subscriptionName: "Spotify", amount: 9.99, date: "2023-07-05", status: "pending" },
  ])
  const [newPayment, setNewPayment] = useState({ subscriptionName: "", amount: "" })
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState("")

  const addPayment = async () => {
    if (newPayment.subscriptionName && newPayment.amount) {
      setIsProcessing(true)
      try {
        const result = await mockProcessPayment(Number.parseFloat(newPayment.amount))
        if (result.success) {
          const payment: Payment = {
            id: Date.now().toString(),
            subscriptionName: newPayment.subscriptionName,
            amount: Number.parseFloat(newPayment.amount),
            date: new Date().toISOString().split("T")[0],
            status: "completed",
          }
          setPayments([...payments, payment])
          setNewPayment({ subscriptionName: "", amount: "" })
          setMessage(result.message)
        } else {
          setMessage(result.message)
        }
      } catch (error) {
        setMessage("An error occurred while processing the payment.")
      } finally {
        setIsProcessing(false)
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Integration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Subscription name"
              value={newPayment.subscriptionName}
              onChange={(e) => setNewPayment({ ...newPayment, subscriptionName: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Amount"
              value={newPayment.amount}
              onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
            />
            <Button onClick={addPayment} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Process Payment"
              )}
            </Button>
          </div>
          {message && <p className={message.includes("success") ? "text-green-500" : "text-red-500"}>{message}</p>}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subscription</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.subscriptionName}</TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

