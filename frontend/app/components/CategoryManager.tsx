"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface Category {
  id: string
  name: string
}

export default function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Streaming" },
    { id: "2", name: "Music" },
    { id: "3", name: "Productivity" },
  ])
  const [newCategory, setNewCategory] = useState("")

  const addCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories([...categories, { id: Date.now().toString(), name: newCategory.trim() }])
      setNewCategory("")
    }
  }

  const removeCategory = (id: string) => {
    setCategories(categories.filter((category) => category.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="New category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button onClick={addCategory}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge key={category.id} variant="secondary" className="text-sm py-1 px-2">
              {category.name}
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 h-4 w-4 p-0"
                onClick={() => removeCategory(category.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

