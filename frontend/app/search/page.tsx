"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const allItems = [
  { id: 1, type: "subscription", name: "Netflix", amount: 12.99 },
  { id: 2, type: "subscription", name: "Spotify", amount: 9.99 },
  { id: 3, type: "expense", name: "Groceries", amount: 150.0 },
  { id: 4, type: "expense", name: "Gas", amount: 40.0 },
  // Add more items as needed
]

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState(allItems)

  const handleSearch = () => {
    const filtered = allItems.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setResults(filtered)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Search</h1>
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Search subscriptions and expenses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>${item.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

