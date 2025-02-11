"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface BudgetItem {
  name: string
  amount: number
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function SmartBudgetAllocation() {
  const [totalBudget, setTotalBudget] = useState(1000)
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    { name: "Entertainment", amount: 300 },
    { name: "Productivity", amount: 200 },
    { name: "Education", amount: 150 },
    { name: "Fitness", amount: 100 },
  ])
  const [newItem, setNewItem] = useState({ name: "", amount: "" })

  const adjustBudget = useCallback(() => {
    // This function is now empty as the adjustment is handled by the useEffect hook
  }, [])

  useEffect(() => {
    adjustBudget()
  }, [adjustBudget])

  useEffect(() => {
    const currentTotal = budgetItems.reduce((sum, item) => sum + item.amount, 0)
    if (currentTotal !== totalBudget && currentTotal !== 0) {
      const factor = totalBudget / currentTotal
      setBudgetItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          amount: Math.round(item.amount * factor),
        })),
      )
    }
  }, [budgetItems, totalBudget])

  const addItem = () => {
    if (newItem.name && newItem.amount) {
      setBudgetItems((prevItems) => {
        const newItemAmount = Number(newItem.amount)
        const updatedItems = [...prevItems, { name: newItem.name, amount: newItemAmount }]
        const newTotal = updatedItems.reduce((sum, item) => sum + item.amount, 0)
        const factor = totalBudget / newTotal
        return updatedItems.map((item) => ({
          ...item,
          amount: Math.round(item.amount * factor),
        }))
      })
      setNewItem({ name: "", amount: "" })
    }
  }

  const updateItemAmount = useCallback((index: number, newAmount: number) => {
    setBudgetItems((prevItems) => {
      const updatedItems = [...prevItems]
      updatedItems[index] = { ...updatedItems[index], amount: newAmount }
      return updatedItems
    })
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Smart Budget Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span>Total Budget: $</span>
            <Input
              type="number"
              value={totalBudget}
              onChange={(e) => setTotalBudget(Number(e.target.value))}
              className="w-32"
            />
          </div>
          <div className="flex space-x-2">
            <Input
              placeholder="Category name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Amount"
              value={newItem.amount}
              onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
            />
            <Button onClick={addItem}>Add</Button>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={budgetItems}
                  dataKey="amount"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {budgetItems.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {budgetItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="w-1/3">{item.name}</span>
                <Slider
                  value={[item.amount]}
                  max={totalBudget}
                  step={1}
                  onValueChange={(value) => updateItemAmount(index, value[0])}
                  className="w-1/3"
                />
                <Input
                  type="number"
                  value={item.amount}
                  onChange={(e) => updateItemAmount(index, Number(e.target.value))}
                  className="w-24"
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

