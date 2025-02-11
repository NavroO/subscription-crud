"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2, Save } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Person {
  id: string
  name: string
  share: number
}

interface BillSplit {
  id: string
  name: string
  totalBill: string
  tipPercentage: string
  currency: string
  people: Person[]
}

const currencies = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "JPY", symbol: "¥" },
]

export default function BillSplitter() {
  const [billSplits, setBillSplits] = useState<BillSplit[]>([])
  const [currentSplit, setCurrentSplit] = useState<BillSplit>({
    id: "1",
    name: "New Split",
    totalBill: "",
    tipPercentage: "15",
    currency: "USD",
    people: [
      { id: "1", name: "You", share: 1 },
      { id: "2", name: "Partner", share: 1 },
    ],
  })
  const [newPersonName, setNewPersonName] = useState("")

  useEffect(() => {
    const savedSplits = localStorage.getItem("billSplits")
    if (savedSplits) {
      setBillSplits(JSON.parse(savedSplits))
    }
  }, [])

  const saveSplits = () => {
    const updatedSplits = [...billSplits, currentSplit]
    localStorage.setItem("billSplits", JSON.stringify(updatedSplits))
    setBillSplits(updatedSplits)
    alert("Bill split saved successfully!")
  }

  const loadSplit = (split: BillSplit) => {
    setCurrentSplit(split)
  }

  const addPerson = () => {
    if (newPersonName) {
      setCurrentSplit({
        ...currentSplit,
        people: [...currentSplit.people, { id: Date.now().toString(), name: newPersonName, share: 1 }],
      })
      setNewPersonName("")
    }
  }

  const removePerson = (id: string) => {
    setCurrentSplit({
      ...currentSplit,
      people: currentSplit.people.filter((person) => person.id !== id),
    })
  }

  const updateShare = (id: string, newShare: number) => {
    setCurrentSplit({
      ...currentSplit,
      people: currentSplit.people.map((person) => (person.id === id ? { ...person, share: newShare } : person)),
    })
  }

  const updateSplitField = (field: keyof BillSplit, value: string) => {
    setCurrentSplit({ ...currentSplit, [field]: value })
  }

  const totalShares = currentSplit.people.reduce((sum, person) => sum + person.share, 0)
  const subtotal = Number.parseFloat(currentSplit.totalBill) || 0
  const tipAmount = subtotal * (Number.parseFloat(currentSplit.tipPercentage) / 100)
  const total = subtotal + tipAmount
  const amountPerShare = totalShares > 0 ? total / totalShares : 0

  const currencySymbol = currencies.find((c) => c.code === currentSplit.currency)?.symbol || "$"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enhanced Bill Splitter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Split name"
              value={currentSplit.name}
              onChange={(e) => updateSplitField("name", e.target.value)}
            />
            <Input
              type="number"
              placeholder="Total bill amount"
              value={currentSplit.totalBill}
              onChange={(e) => updateSplitField("totalBill", e.target.value)}
            />
            <Input
              type="number"
              placeholder="Tip %"
              value={currentSplit.tipPercentage}
              onChange={(e) => updateSplitField("tipPercentage", e.target.value)}
            />
            <Select value={currentSplit.currency} onValueChange={(value) => updateSplitField("currency", value)}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} ({currency.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-2">
            <Input
              placeholder="New person's name"
              value={newPersonName}
              onChange={(e) => setNewPersonName(e.target.value)}
            />
            <Button onClick={addPerson}>
              <Plus className="mr-2 h-4 w-4" /> Add Person
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Share</TableHead>
                <TableHead>Amount to Pay</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentSplit.people.map((person) => (
                <TableRow key={person.id}>
                  <TableCell>{person.name}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={person.share}
                      onChange={(e) => updateShare(person.id, Number.parseFloat(e.target.value) || 0)}
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>
                    {currencySymbol}
                    {(person.share * amountPerShare).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => removePerson(person.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="space-y-2">
            <p>
              Subtotal: {currencySymbol}
              {subtotal.toFixed(2)}
            </p>
            <p>
              Tip ({currentSplit.tipPercentage}%): {currencySymbol}
              {tipAmount.toFixed(2)}
            </p>
            <p className="font-bold">
              Total: {currencySymbol}
              {total.toFixed(2)}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={saveSplits}>
              <Save className="mr-2 h-4 w-4" /> Save Split
            </Button>
            <Select onValueChange={(value) => loadSplit(JSON.parse(value))}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Load saved split" />
              </SelectTrigger>
              <SelectContent>
                {billSplits.map((split) => (
                  <SelectItem key={split.id} value={JSON.stringify(split)}>
                    {split.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

